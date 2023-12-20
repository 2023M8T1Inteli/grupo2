import React from 'react'
import toWav from 'audiobuffer-to-wav'

const SaveAsWav = (props) => {
  const saveAsWav = async () => {
    if (!props.audioData || !props.activeSoundResourceId) return

    try {
      const audioContext = new AudioContext()
      const arrayBuffer = await props.audioData.arrayBuffer()
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)
      const wavBuffer = toWav(audioBuffer)
      const projectFolderPath = localStorage.getItem('currentProjectPath')

      if (!projectFolderPath) {
        throw new Error('Project path not found')
      }

      const soundName = props.activeSoundResourceId + '.wav'
      const soundFolderPath = `${projectFolderPath}/sounds`

      console.log('WAV buffer:', wavBuffer)
      console.log('Sound name:', soundName)

      window.electronAPI
        .saveWavFile(soundFolderPath, soundName, wavBuffer)

        .then((response) => {
          if (response.success) {
            console.log('WAV file saved to:', response.path)
          } else {
            console.error('Error saving WAV file:', response.error)
          }
        })
        .catch((error) => console.error('IPC error:', error))
    } catch (error) {
      console.error('Error processing audio data:', error)
    }
  }

  return <button onClick={saveAsWav}>Save as WAV</button>
}

export default SaveAsWav
