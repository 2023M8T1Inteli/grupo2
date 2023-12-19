export default function ColorsModal(props: { onClose: () => any }) {

  console.log("TESTEs")

  return (
    <div className='modal'>
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title">Adicionar bloco</h4>
        </div>
        <div className="modal-body">
          
        </div>
        <div className="modal-footer">
          <button onClick={() => {props.onClose()}}>Fechar</button>
        </div>
      </div>
    </div>
  )

}