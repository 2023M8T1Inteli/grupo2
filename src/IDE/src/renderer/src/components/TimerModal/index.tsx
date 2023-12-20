import Slider from '@mui/material/Slider'

const TimerModal = ({ show, onClose }) => {

  if (!show) return null

  const handleChange = (event, newValue) => {
    console.log(newValue)
  }
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title">Editar Cena</h4>
        </div>
        <div className="modal-body">
          <Slider defaultValue={30} onChange={handleChange} />
        </div>
        <div className="modal-footer">
          <button className="button" onClick={onClose}>
            Voltar
          </button>
        </div>
      </div>
    </div>
  )
}

export default TimerModal
