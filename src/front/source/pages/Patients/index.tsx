import Button from "../../components/Button";
import { infoToast } from "../../components/Toast";
import "./styles.css";
import child_smile from "/child-smile.png";
import plus from "/plus.svg";

export default function Patients() {
  return (
    <div className="patients-container">
      <div className="options">
        <Button
          variant="back"
          onClick={() => {
            console.log("A");
          }}
        />
        <h1>Pacientes</h1>
        <Button variant="settings" />
      </div>
      <div className="patients-list">
        <a
          className="patient add"
          onClick={() => {
            infoToast("Trabalho em progresso! 🚀");
          }}
        >
          <img src={plus} />
        </a>
        <a className="patient" href="/editor">
          <img src={child_smile} />
          <div>
            <p>Luquinhas</p>
            <p>7 anos</p>
          </div>
        </a>
        <a className="patient" href="/editor">
          <img src={child_smile} />
          <div>
            <p>Luquinhas</p>
            <p>7 anos</p>
          </div>
        </a>
        <a className="patient" href="/editor">
          <img src={child_smile} />
          <div>
            <p>Luquinhas</p>
            <p>7 anos</p>
          </div>
        </a>
      </div>
    </div>
  );
}
