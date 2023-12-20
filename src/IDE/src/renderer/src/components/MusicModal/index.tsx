// MusicModal.js
import React, { useState } from 'react';
import AudioRecorder from '../AudioRecord';
import AudioUploader from '../AudioUpload';

const MusicModal = ({ show, onClose }) => {
  const [mode, setMode] = useState(null);

  if (!show) return null;

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
          {mode === 'record' && <AudioRecorder />}
          {mode === 'upload' && <AudioUploader />}
        </div>
        <div className="modal-footer">
          <button className="button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default MusicModal;
