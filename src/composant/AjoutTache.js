import React, { useState } from "react";
function AjoutTache() {
  const [task, setTask] = useState(""); //Etat pour la tache actuelle
  const [tasks, setTasks] = useState([]); //Liste des taches

  const now = new Date();

  const addTask = () => {
    if (task.trim() !== "") {
      setTasks([
        ...tasks,
        { text: task, completed: false, dateCreate: now.toLocaleString() },
      ]);
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
    <div className="container">
      <h1>Gestionnaire de Tâches</h1>
      <div className="mb-3">
        <input
          className="form-control mb-3"
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Ajouter une tache"
        />
        <button className="btn btn-primary mb-3" onClick={addTask}>
          Ajouter
        </button>
      </div>
      <ol class="list-group list-group-numbered">
        {tasks.map((t, index) => (
          <React.Fragment key={index}>
            <li
              key={index}
              onClick={() => toogleComplete(index)}
              style={{ cursor: "pointer" }}
            >
              <span
                //  className="list-group-item list-group-item-action {{ t.completed ? 'active' : ''}}" //ato no asina an le active
                className="list-group-item list-group-item-action"
                style={{
                  textDecoration: t.completed ? "line-through" : "none",
                }}
                aria-current="true"
              >
                <div class="d-flex w-100 justify-content-between">
                  <h5 class="mb-1"> {t.text}</h5>
                  <small>{t.dateCreate}</small>
                </div>
                <p class="mb-1">Some placeholder content in a paragraph.</p>
                <button
                  className="btn btn-danger mb-3"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeTask(index);
                  }}
                >
                  Supprimer
                </button>
              </span>
              {/* <span
              style={{ textDecoration: t.completed ? "line-through" : "none" }}
            >
              {t.text}
            </span> */}
            </li>
            <br />
          </React.Fragment>
        ))}
      </ol>
    </div>
  );
}
export default AjoutTache;
