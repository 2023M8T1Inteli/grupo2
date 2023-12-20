import React, { useRef, useState } from 'react'
import { useVoiceVisualizer, VoiceVisualizer } from 'react-voice-visualizer'
import SaveAsWav from '../SaveAudio'

interface AudioRecorderProps {
  activeSoundResourceId: string
}

const AudioRecorder = (props: AudioRecorderProps) => {
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
      {recordedBlob && (
        <SaveAsWav audioData={recordedBlob} activeSoundResourceId={props.activeSoundResourceId} />
      )}
    </div>
  )
}

export default AudioRecorder
