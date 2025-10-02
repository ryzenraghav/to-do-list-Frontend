const { useState, useEffect } = React;

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  // Load from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(saved);
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add / Update Task
  const addTask = () => {
    if (!input.trim()) return;
    if (editIndex !== null) {
      const updated = [...tasks];
      updated[editIndex].text = input;
      setTasks(updated);
      setEditIndex(null);
    } else {
      setTasks([...tasks, { text: input, completed: false }]);
    }
    setInput("");
  };

  // Delete
  const deleteTask = (i) => {
    setTasks(tasks.filter((_, idx) => idx !== i));
  };

  // Edit
  const editTask = (i) => {
    setInput(tasks[i].text);
    setEditIndex(i);
  };

  // Toggle complete
  const toggleComplete = (i) => {
    const updated = [...tasks];
    updated[i].completed = !updated[i].completed;
    setTasks(updated);
  };

  return (
    <div className="container">
      <h1> To-Do List</h1>
      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a task"
        />
        <button className="add" onClick={addTask}>
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </div>
      <ul>
        {tasks.length === 0 && <p>No tasks yet 🎉</p>}
        {tasks.map((task, i) => (
          <li key={i}>
            <span
              onClick={() => toggleComplete(i)}
              className={task.completed ? "completed" : ""}
            >
              {task.text}
            </span>
            <div>
              <button className="edit" onClick={() => editTask(i)}>Edit</button>
              <button className="delete" onClick={() => deleteTask(i)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
