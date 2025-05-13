import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import LoginGoogle from "./LoginGoogle";

function AjoutTache() {
  const [titre, setTitre] = useState(""); //Etat pour la tache actuelle
  const [task, setTask] = useState(""); //Etat pour la tache actuelle
  const [tasks, setTasks] = useState([]); //Liste des taches

  const now = new Date();

  const tasksCollection = collection(db, "tasks");

  useEffect(() => {
    //Charger les taches depuis firestrore
    const fetchTasks = async () => {
      const data = await getDocs(tasksCollection);
      setTasks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    fetchTasks();
  }, [tasksCollection]);

  const addTask = async () => {
    if (task.trim() !== "") {
      const newTask = {
        titre: titre,
        text: task,
        completed: false,
        dateCreate: now.toDateString(),
      };
      try {
        await addDoc(tasksCollection, newTask);
        setTasks([...tasks, newTask]);
        setTask(""); //reinitialiser le champs
        setTitre(""); //reinitialiser le champs
        //
      } catch (error) {
        alert("Erreur lors de l'ajout de la tâche:", error);
      }
    }
  };

  const removeTask = async (id) => {
    await deleteDoc(doc(db, "tasks", id));
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const toogleComplete = async (id) => {
    try {
      const taskToUpdate = tasks.find((t) => t.id === id);
      const taskDoc = doc(db, "tasks", id);
      await updateDoc(taskDoc, { completed: !taskToUpdate.completed });
      setTasks(
        tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
      );
    } catch (error) {
      alert("Erreur lors de la mise a jour de la tâche:", error);
    }
  };

  const [user, setUser] = useState(null);

  return (
    <div className="container">
      <h1>Connexion avec google</h1>
      {!user ? (
        <LoginGoogle onLogin={setUser} />
      ) : (
        <div>
          <h2>Bienvenue {user.name}</h2>
          <img src={user.picture} alt="{user.name} + User" />
          <p>Email: {user.email}</p>
          <button onClick={() => setUser(null)}>Deconnexion</button>
        </div>
      )}

      <h1>Gestionnaire de Tâches</h1>
      <div className="mb-3">
        <input
          className="form-control mb-3"
          type="text"
          value={titre}
          onChange={(e) => setTitre(e.target.value)}
          placeholder="Ajouter un titre"
        />
        <input
          className="form-control mb-3"
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Ajouter une tache"
        />
        <button
          className="btn btn-primary mb-3"
          data-toggle="tooltip"
          title="Ajouter la tache"
          onClick={addTask}
        >
          <FontAwesomeIcon icon={faPen} />
        </button>
      </div>

      <ol className="list-group list-group-numbered">
        {tasks.map((t, index) => (
          <React.Fragment key={index}>
            <li
              key={index}
              onClick={() => toogleComplete(t.id)}
              style={{ cursor: "pointer" }}
            >
              <div className="row">
                <div className="col-8">
                  <span
                    className="list-group-item list-group-item-action"
                    style={{
                      textDecoration: t.completed ? "line-through" : "none",
                    }}
                    aria-current="true"
                  >
                    <div className="d-flex w-100 justify-content-between">
                      <h5 className="mb-1"> {t.titre}</h5>
                      <small>{t.dateCreate}</small>
                    </div>
                    <p className="mb-1">{t.text}</p>
                    <button
                      className="btn btn-danger mb-3"
                      data-toggle="tooltip"
                      title="Supprimer la tache"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeTask(t.id);
                      }}
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </button>
                  </span>
                </div>
                <div className="col-4">
                  <p>Rapporteur : </p>
                  <p>Responsable : </p>
                </div>
              </div>
            </li>
            <br />
          </React.Fragment>
        ))}
      </ol>
    </div>
  );
}
export default AjoutTache;
