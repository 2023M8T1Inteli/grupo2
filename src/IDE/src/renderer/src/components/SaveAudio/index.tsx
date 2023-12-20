// SaveAsWav.js is a functional React component that provides the functionality to save audio data as a WAV file.
// It utilizes the 'audiobuffer-to-wav' library to convert audio data into WAV format.
// The component:
// - Receives 'audioData' as a prop, which is expected to be an audio recording data.
// - Contains a function 'saveAsWav' that:
//   - Checks if 'audioData' exists. If not, it returns early.
//   - Converts 'audioData' from an ArrayBuffer to an AudioBuffer, and then to a WAV format ArrayBuffer using 'toWav'.
//   - Creates a Blob from the WAV ArrayBuffer and passes it to 'downloadWav'.
// - 'downloadWav' function creates a temporary download link and triggers the download of the WAV file.
// - Renders a button that, when clicked, triggers the 'saveAsWav' function.

import toWav from 'audiobuffer-to-wav'

const SaveAsWav = ({ audioData }) => {
  const saveAsWav = async () => {
    if (!audioData) return

    const audioContext = new AudioContext()
    const arrayBuffer = await audioData.arrayBuffer()
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)
    const wavBuffer = toWav(audioBuffer)
    const wavBlob = new Blob([wavBuffer], { type: 'audio/wav' })
    downloadWav(wavBlob)
  }

  const downloadWav = (wavBlob) => {
    const url = URL.createObjectURL(wavBlob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = 'recording.wav'
    anchor.click()
    URL.revokeObjectURL(url)
  }

  return <button onClick={saveAsWav}>Save as WAV</button>
}

export default SaveAsWav
