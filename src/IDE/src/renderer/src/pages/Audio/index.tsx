import { useEffect } from 'react'
import { useVoiceVisualizer, VoiceVisualizer } from 'react-voice-visualizer'

const App = () => {
  // Initialize the recorder controls using the hook
  const recorderControls = useVoiceVisualizer()
  const {
    // ... (Extracted controls and states, if necessary)
    recordedBlob,
    error,
    audioRef
  } = recorderControls

  // Get the recorded audio blob
  useEffect(() => {
    if (!recordedBlob) return

    console.log(recordedBlob)
  }, [recordedBlob, error])

  // Get the error when it occurs
  useEffect(() => {
    if (!error) return

    console.error(error)
  }, [error])

  return <VoiceVisualizer ref={audioRef} controls={recorderControls} />
}

export default App
