from dataclasses import dataclass, field
from itertools import combinations

@dataclass
class ColoredGraph:
    length: int = 0
    edges: list = field(default_factory=list)  
    colors: list = field(default_factory=list) 
    labels: list = field(default_factory=list) 

class ColorTable:
    def __init__(self):
        self._ids = {}
        self._keys = []

    def intern(self, key):
        if key not in self._ids:
            self._ids[key] = len(self._keys)
            self._keys.append(key)
        return self._ids[key]

    def key_of(self, color_id):
        return self._keys[color_id]

    @staticmethod
    def describe(key):
        """Human-readable form of a color key for mismatch messages."""
        kind = key[0]
        if kind == 'FIELD':
            _, datatype, primary_key, not_null, unique, auto_increment = key
            traits = [t for t, on in (
                ('PRIMARY KEY', primary_key), ('NOT NULL', not_null), ('UNIQUE', unique), ('AUTO_INCREMENT', auto_increment),
            ) if on]
            return datatype + (f' [{", ".join(traits)}]' if traits else '')
        if kind in ('FK_SOURCE', 'FK_DESTINATION'):
            return f'{kind} ({key[1]})'
        return str(key)

def field_color_key(field):
    if field.primary_key:
        return ('FIELD', field.type, True, True, False, field.increment)
    return ('FIELD', field.type, False, field.not_null, field.unique, field.increment)

def build_graph(diagram, color_table):
    graph = ColoredGraph()
    vertex_id_map = {} 

    def add_vertex(color_key, label):
        vertex_id = graph.length
        graph.length += 1
        graph.colors.append(color_table.intern(color_key))
        graph.labels.append(label)
        return vertex_id

    for table in diagram.tables:
        for field in table.fields:
            vertex_id_map[field.id] = add_vertex(field_color_key(field), f'{table.name}.{field.name}')
        for a, b in combinations(table.fields, 2):
            graph.edges.append((vertex_id_map[a.id], vertex_id_map[b.id]))

    for relationship in diagram.relationships:
        # one_to_one has no direction ('1' on both ends) — give both markers the
        # same color so A->B and B->A produce isomorphic encodings. one_to_many
        # was already normalized into many_to_one by the parser.
        if relationship.cardinality == 'one_to_one':
            color_1 = color_2 = ('FK', 'one_to_one')
        else:
            color_1, color_2 = ('FK_SOURCE', relationship.cardinality), ('FK_DESTINATION', relationship.cardinality)
        
        marker_1 = add_vertex(color_1, f'fk{relationship.id}:source')
        marker_2 = add_vertex(color_2, f'fk{relationship.id}:destination')
        
        graph.edges.append((vid[relationship.start_field], marker_1))
        graph.edges.append((marker_1, marker_2))
        graph.edges.append((marker_2, vid[relationship.end_field]))

    return graph
            
