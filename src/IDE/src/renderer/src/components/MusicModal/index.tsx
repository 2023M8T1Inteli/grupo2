// MusicModal.js
import React, { useState } from 'react'
import AudioRecorder from '../AudioRecord'
import AudioUploader from '../AudioUpload'

interface MusicModalProps {
  show: boolean
  onClose: () => void
  activeSoundResourceId: string
}

const MusicModal = (props: MusicModalProps) => {
  const [mode, setMode] = useState(null)

  if (!props.show) return null

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title">Editar Cena</h4>
        </div>
        <div className="modal-body">
          {!mode && (
            <div>
              <button onClick={() => setMode('record')}>Record Audio</button>
              <button onClick={() => setMode('upload')}>Upload Audio</button>
            </div>
          )}
          {mode === 'record' && (
            <AudioRecorder activeSoundResourceId={props.activeSoundResourceId} />
          )}
          {mode === 'upload' && (
            <AudioUploader activeSoundResourceId={props.activeSoundResourceId} />
          )}
        </div>
        <div className="modal-footer">
          <button className="button" onClick={props.onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default MusicModal
