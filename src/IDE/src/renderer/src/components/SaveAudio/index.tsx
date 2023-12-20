// SaveAsWav.js
import React from 'react'
import toWav from 'audiobuffer-to-wav'

interface SaveAsWavProps {
  audioData: any
  activeSoundResourceId: string
}

const SaveAsWav = (props: SaveAsWavProps) => {
  const saveAsWav = async () => {
    if (!props.audioData) return

    const audioContext = new AudioContext()
    const arrayBuffer = await props.audioData.arrayBuffer()
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
