import TaskPage from "./pages/TaskPage";

export default function App() {
  return (
    <main className="app-container">
      <section className="app-card">
        <h1 className="app-title">Task Manager</h1>
        <TaskPage />
      </section>
    </main>
  );
}