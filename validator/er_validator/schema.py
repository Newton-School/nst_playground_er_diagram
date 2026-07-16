from dataclasses import dataclass, field

@dataclass
class Field:
    id: int
    name: str
    type: str
    pk: bool
    not_null: bool
    unique: bool
    increment: bool
    default: str

@dataclass
class Table:
    id: int
    name: str
    fields: list


@dataclass
class Relationship:
    id: int
    cardinality: str
    start_table: int
    start_field: int
    end_table: int
    end_field: int


@dataclass
class Diagram:
    title: str
    tables: list = field(default_factory=list)
    relationships: list = field(default_factory=list)
