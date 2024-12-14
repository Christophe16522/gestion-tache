import React, { useState } from "react";

function App() {
  const [task, setTask] = useState(""); //Etat pour la tache actuelle
  const [tasks, setTasks] = useState([]); //Liste des taches

  const addTask = () => {
    if (task.trim() !== "") {
      setTasks([...tasks, { text: task, completed: false }]);
      setTask(""); //reinitialiser le champs
    }
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const toogleComplete = (index) => {
    setTasks(
      tasks.map((t, i) => (i === index ? { ...t, completed: !t.completed } : t))
    );
  };

  return (
    <div className="Container">
      <h1>Gestionnaire de Tâches</h1>
      <div>
        <input
          className="form-control"
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Ajouter une tache"
        />
        <button onClick={addTask}>Ajouter</button>
      </div>
      <ul>
        {tasks.map((t, index) => (
          <li
            key={index}
            onClick={() => toogleComplete(index)}
            style={{ cursor: "pointer" }}
          >
            <span
              style={{ textDecoration: t.completed ? "line-through" : "none" }}
            >
              {t.text}
            </span>

            <button
              onClick={(e) => {
                e.stopPropagation();
                removeTask(index);
              }}
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
