// MusicModal.js is a React component designed for handling music-related functionalities within a modal interface. 
// It provides two main features: recording audio and uploading audio files, leveraging the use of two custom components, AudioRecorder and AudioUploader.
// The modal's visibility and the choice between recording or uploading are managed by the component's state.
// The component:
// - Uses a 'mode' state to toggle between recording and uploading functionalities.
// - Renders nothing if 'show' prop is false, providing conditional rendering based on the modal's visibility.
// - Contains two buttons to set the mode to either 'record' or 'upload', which then conditionally renders the respective component (AudioRecorder or AudioUploader).
// - Includes a close button in the footer to exit the modal, using the provided 'onClose' callback function.

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
