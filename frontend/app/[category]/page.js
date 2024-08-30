'use client'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import FormData from 'form-data'
import { useRef, useState, useEffect, useLayoutEffect } from 'react'
import styles from '../styles/page.module.css'

const VadVideoPlayer = dynamic(() => import("./VadVideoPlayer"), {
    ssr: false
})

export default function Search({params}) {
    const category = params.category;

    // プロトコルの読み込み
    const [protocols, setProtocols] = useState([]);
    useLayoutEffect(() => {
        fetch(process.env.API_URL+"/index", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'category': category}),
        })
        .then((res) => res.json())
        .then((data) => setProtocols(data));
    },[]);

    const videoRef = useRef(null);
    // 検索ボックスに入力された文字列をFlaskとやり取り
    const [form, setForm] = useState({search: '', category: category});
    const [searchTime, setSearchTime] = useState(0)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {    
            const response = await fetch(process.env.API_URL+'/text', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });

            if (response.ok) {
                const data = await response.json();
                setSearchTime(data.time);
                console.log(data.time)
                videoRef.current.currentTime = data.time;
                videoRef.current.play();
            } else {
                console.log('errored')
            }
        } catch (error) {
            console.error('エラー:', error);
        }
    };

    // 音声録音関係 
    const MicRecoder = require('mic-recorder-to-mp3')
    const [recoder,setRecorder] = useState(
        new MicRecoder({ bitRate: 128 })
    );
    const [loading, setLoading] = useState(false)
    const [audioFile, setAudioFile] = useState(null)
    const [recording, setRecording] = useState(false)
    const startRecording = async () => {
        await recoder
        .start()
        .then(() => {
            setRecording(true)
        })
        .catch((error) => {
            console.error(error)
        })
    }

    const stopRecording = async () => {
        await recoder
            .stop()
            .getMp3()
            .then(([buffer, blob]) => {
                const file = new File(buffer, 'audio.mp3', {
                    type: blob.type,
                    lastModified: Date.now(),
                })
                setLoading(true)
                setAudioFile(file)
            })
            .catch((error) => {
                console.log(error)
                setLoading(false)
            })
        setRecording(false)
    }
    useEffect(() => {
        const fn = async () => {
            try{
                if (audioFile) {
                    const formData = new FormData()
                    formData.append('file', audioFile)
                    const response = await fetch(process.env.API_URL+'/audio', {
                        method: 'POST',
                        body: formData,
                    })

                    if (response.ok) {
                        const data = await response.json();
                        videoRef.current.currentTime = data.time;
                        videoRef.current.play();
                    } else {
                        console.log('errored')
                    }
                }
            } catch (error) {
                alert(error)
                setLoading(false)
            }
            setAudioFile(null)
        }

        fn()
    }, [audioFile])
    
    function handleEvent(startTime){
        if (videoRef.current){
            videoRef.current.currentTime = startTime;
            videoRef.current.play();
        }
    };
    return (
        <div>
            <Link href="/">
                動画選択画面
            </Link>
            <div class={styles.twoColumns}>
                <VadVideoPlayer videoRef={videoRef} category={category}></VadVideoPlayer>
            <div>
                <div>
                    <form onSubmit={handleSubmit}>
                        <label class={styles.label} htmlFor="search">Search Event</label>
                        <input 
                            type="text"
                            id='search'
                            name='search'
                            value={FormData.search}
                            onChange={handleChange}
                        />
                        <button class={styles.button}>検索</button>
                    </form>
                </div>
                <div id="audio">
                    <button class={styles.button} onClick={startRecording}>録音開始</button>
                    <button class={styles.button} onClick={stopRecording}>録音停止</button>
                </div>
                <div id="skip-buttons">
                    <ul class={styles.ul}>
                        {protocols.map((protocol) => (
                            <li class={styles.li} id={protocol[0]}>
                                <button class={styles.button} onClick={handleEvent.bind(this,protocol[2])}>{protocol[0]}</button>
                            </li>
                        ))}
                    </ul>
                </div>
                </div>
            </div>
        </div>
    )
}