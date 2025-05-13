import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faCheck } from "@fortawesome/free-solid-svg-icons";

import { db } from "../firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

function GestionPersonel() {
  const [nomPersonel, setNomPersonel] = useState("");
  const [postePersonel, setPostePersonel] = useState("");
  const [dateEmbauchePersonel, setDateEmbauchePersonel] = useState("");
  const [finEmbauchePersonel, setfinEmbauchePersonel] = useState("");
  const [contactPersonel, setContactPersonel] = useState("");
  const [salairePersonel, setSalairePersonel] = useState("");
  const [isActifPersonel, setisActifPersonel] = useState(""); //salarier en activite
  const [personel, setPersonel] = useState([]); //Liste des personels

  const personelCollection = collection(db, "personel");

  const now = new Date();

  //charger les personels depuis firestore
  useEffect(() => {
    const fetchPersonel = async () => {
      const data = await getDocs(personelCollection);
      setPersonel(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    fetchPersonel();
  }, [personelCollection]);

  const addPersonel = async () => {
    setisActifPersonel(true);
    if (
      nomPersonel.trim() !== "" &&
      postePersonel.trim() !== "" &&
      dateEmbauchePersonel.trim() !== "" &&
      contactPersonel.trim() !== ""
    ) {
      const newPersonel = {
        nom: nomPersonel,
        poste: postePersonel,
        dateEmbauche: dateEmbauchePersonel.toString(),
        contact: contactPersonel,
        salaire: salairePersonel,
        isActif: true,
      };
      try {
        await addDoc(personelCollection, newPersonel);
        setPersonel([...personel, newPersonel]);
        setNomPersonel(""); //reinitialiser le champs
        setPostePersonel(""); //reinitialiser le champs
        setDateEmbauchePersonel(""); //reinitialiser le champs
        setContactPersonel(""); //reinitialiser le champs
        setSalairePersonel(""); //reinitialiser le champs
        setisActifPersonel(""); //reinitialiser le champs
      } catch (error) {
        alert("Erreur lors de l'ajout du personel:", error);
      }
    }
  };

  return (
    <div className="container">
      <br></br>
      <h1>Gestionnaire de personnel</h1>
      <br></br>
      <div className="row">
        <div className="col-4">
          <h4>Ajout personnel</h4>
          <div class="mb-3 mt-3">
            <label for="nom-prenom" class="form-label">
              Nom et prenom :
            </label>
            <input
              type="text"
              class="form-control"
              value={nomPersonel}
              onChange={(e) => setNomPersonel(e.target.value)}
            />
          </div>
          <div class="mb-3 mt-3">
            <label for="poste" class="form-label">
              Poste :
            </label>
            <input
              type="text"
              class="form-control"
              value={postePersonel}
              onChange={(e) => setPostePersonel(e.target.value)}
            />
          </div>
          <div class="mb-3 mt-3">
            <label for="date-embauche" class="form-label">
              Date d'embauche :
            </label>
            <input
              type="date"
              class="form-control"
              value={dateEmbauchePersonel}
              onChange={(e) => setDateEmbauchePersonel(e.target.value)}
            />
          </div>
          <div class="mb-3 mt-3">
            <label for="tel" class="form-label">
              Contact :
            </label>
            <input
              type="tel"
              class="form-control"
              value={contactPersonel}
              onChange={(e) => setContactPersonel(e.target.value)}
            />
          </div>
          <div class="mb-3 mt-3">
            <label for="tel" class="form-label">
              Salaire :
            </label>
            <input
              type="number"
              class="form-control"
              value={salairePersonel}
              onChange={(e) => setSalairePersonel(e.target.value)}
            />
          </div>
          <div class="mb-3 mt-3">
            <label for="tel" class="form-label">
              Photo :
            </label>
            <input type="file" class="form-control" id="tel" name="tel" />
          </div>
          <button type="submit" class="btn btn-primary" onClick={addPersonel}>
            Valider
          </button>
        </div>
        <div className="col-3">
          <div class="card">
            <img
              class="card-img-top"
              src="/profiltest.jpg"
              alt="Card image"
            ></img>
            <div class="card-body">
              <h4 class="card-title">John Doe</h4>
              <p class="card-text">Poste : Chef de chantier</p>
              <p class="card-text">Date d'embauche : 23/09/2024</p>
              <p class="card-text">Fin d'embauche : 23/09/2024</p>
              <p class="card-text">Contact : +261 34 89 654 78</p>
              <p class="card-text">
                Contrat en cours : <FontAwesomeIcon icon={faCheck} />
              </p>
            </div>
          </div>
        </div>
        <div className="col-5">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nom prénom</th>
                <th scope="col">Poste</th>
                <th scope="col">Contact</th>
              </tr>
            </thead>
            <tbody>
              {personel.map((p, index) => (
                <React.Fragment key={index}>
                  <tr>
                    <th scope="row">{index}</th>
                    <td>{p.nom}</td>
                    <td>{p.poste}</td>
                    <td>{p.contact}</td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default GestionPersonel;
