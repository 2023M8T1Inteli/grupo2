// This code is designed for recording audio and visualizing the voice input. The component uses custom hooks and  components from the react-voice-visualizer library to handle the audio recording and visualization process.


import React, { useRef, useState } from 'react';
import { useVoiceVisualizer, VoiceVisualizer } from 'react-voice-visualizer';
import SaveAsWav from '../SaveAudio';

const AudioRecorder = () => {
  const recorderControls = useVoiceVisualizer()
  const { recordedBlob, error, audioRef } = recorderControls
  return (
    <div>
      <VoiceVisualizer
        ref={audioRef}
        controls={recorderControls}
        mainBarColor={'#000000'}
        secondaryBarColor={'#000000'}
        isDownloadAudioButtonShown={true}
        isDefaultUIShown={true}
        defaultMicrophoneIconColor={'#000000'}
      />
      {recordedBlob && <SaveAsWav audioData={recordedBlob} />}
    </div>
  )
}

export default AudioRecorder
