import React, { useState, useEffect } from "react";

function App() {
  // State variables
  const [taskName, setTaskName] = useState("");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  // API Gateway URL
  const API_URL = "https://zo6qf7vpl5.execute-api.us-east-1.amazonaws.com/dev/tasks";

  // Fetch tasks on load
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(API_URL);
        const result = await response.json();

        const tasksData = JSON.parse(result.body);
        setTasks(tasksData);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  // Add task
  const handleAddTask = async () => {
    if (!taskName) return alert("Please enter a task name");
    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: taskName }),
      });

      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        console.error("Failed to parse POST response:", e, text);
        alert("Server returned invalid response");
        setLoading(false);
        return;
      }

      if (response.ok && data && data.name && data.taskid) {
        setTasks([...tasks, data]);
        setTaskName(""); // clear input
      } else {
        alert(`Error adding task: ${data.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Fetch failed:", error);
      alert(`Fetch failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>My To-Do App</h1>

      <input
        type="text"
        placeholder="Enter task name"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        style={{ padding: "8px", width: "250px" }}
      />
      <button
        onClick={handleAddTask}
        disabled={loading}
        style={{ marginLeft: "10px", padding: "8px 12px" }}
      >
        {loading ? "Adding..." : "Add Task"}
      </button>

      <h2>Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.taskid}>
            {task.name} - {task.completed ? "✅" : "❌"} (ID: {task.taskid})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;