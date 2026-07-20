import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import RightSidebar from './components/RightSidebar';
import Playground from './components/Playground';
import ValidationResult from './components/ValidationResult';
import useAppLogic from './hooks/useAppLogic';
import '@xyflow/react/dist/style.css';

export default function App() {
  const {
    nodes, edges, tables,
    submitting, submitError, validationResult,
    onNodesChange, onEdgesChange, onConnect,
    setEdges, setValidationResult,
    handleAddTable, handleUpdateTable, handleDeleteTable,
    handleQuestionLoaded, handleSubmit, handleReset
  } = useAppLogic();

  return (
    <div className="flex flex-col w-full h-screen overflow-hidden bg-neutral-0">
      <Navbar
        onSubmit={handleSubmit}
        onReset={handleReset}
        submitting={submitting}
        submitError={submitError}
      />

      <main className="main-workspace">
        <Sidebar onQuestionLoaded={handleQuestionLoaded} />
        <Playground
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
        />

        <RightSidebar
          tables={tables}
          edges={edges}
          setEdges={setEdges}
          onAddTable={handleAddTable}
          onUpdateTable={handleUpdateTable}
          onDeleteTable={handleDeleteTable}
        />
      </main>

      <ValidationResult
        result={validationResult}
        onClose={() => setValidationResult(null)}
      />
    </div>
  );
}
