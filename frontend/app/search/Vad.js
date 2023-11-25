"use client";
import { useMicVAD, utils } from "@ricky0123/vad-react"
import { useState, useEffect } from "react"

export const Vad = () => {
  const [audioFile, setAudioFile] = useState(null)
  const vad = useMicVAD({
    onSpeechEnd: (audio) => {
      const wavBuffer = utils.encodeWAV(audio)
      const file = new File(wavBuffer, 'audio.wav')
      const base64 = utils.arrayBufferToBase64(wavBuffer)
      const url = `data:audio/wav;base64,${base64}`
      setAudioFile(file)
    },
  })
  useEffect(() => {
    const fn = async () => {
        try{
            if (audioFile) {
                const formData = new FormData()
                formData.append('file', audioFile)

                const response = await fetch('http://127.0.0.1:3000/audio', {
                    method: 'POST',
                    body: formData,
                })

                if (response.ok) {
                    const data = await response.json();
                    setSearchTime(data.time);
                    videoRef.current.currentTime = data.time;
                    videoRef.current.play();
                } else {
                    console.log('errored')
                }
            }
        } catch (error) {
            alert(error)
        }
    }
    fn()
}, [audioFile])
  return (
    <div>
      <h5>VAD</h5>
      <ul>{!vad.listening && "Not"} listening</ul>
      <ul>{!vad.errored && "Not"} errored</ul>
      <ul>{!vad.userSpeaking && "Not"} speaking</ul>
      <button onClick={vad.pause}>Pause</button>
      <button onClick={vad.start}>Start</button>
      <button onClick={vad.toggle}>Toggle</button>
    </div>
  )
}

export default Vad