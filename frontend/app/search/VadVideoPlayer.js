"use client";
import { useMicVAD, utils } from "@ricky0123/vad-react"
import { useState, useEffect } from "react"

export const VadVideoPlayer = ({videoRef}) => {
  const [audioFile, setAudioFile] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const vad = useMicVAD({
    onSpeechEnd: (audio) => {
      const wavBuffer = utils.encodeWAV(audio)
      const file = new File([wavBuffer], 'audio.wav')
      const base64 = utils.arrayBufferToBase64(wavBuffer)
      const url = `data:audio/wav;base64,${base64}`
      setAudioFile(file)
      console.log('Speach ends')
    },
  })

  useEffect(() => {
    console.log(isLoading)
    if (!isLoading) {
      const fn = async () => {
          try{
              setIsLoading(true);
              console.log('useEffect')
              if (audioFile) {
                  const formData = new FormData()
                  formData.append('file', audioFile)
                  const response = await fetch('http://127.0.0.1:3000/audio', {
                      method: 'POST',
                      body: formData,
                  })

                  console.log(response)
                  if (response.ok) {
                      const data = await response.json();
                      console.log(data);
                      videoRef.current.currentTime = data.time;
                      
                      videoRef.current.play();
                      console.log('video is playing')
                  } else {
                      console.log('errored')
                  }
              }
          } catch (error) {
              alert(error)
          }
          setAudioFile(null)
          setIsLoading(false)
      }
  
      fn()
    }

  }, [audioFile])

  return (
    <div>
      <video id='video' ref={videoRef} src='videos/S1720001.MP4' controls autoPlay={true} muted />
      {isLoading ? <div>処理待ち中</div> : <div>喋っていいよ</div>}
    </div>
  )
}

export default VadVideoPlayer