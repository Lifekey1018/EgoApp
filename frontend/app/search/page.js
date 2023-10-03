'use client'
import Link from 'next/link'
import { useRef, useState, useEffect, useLayoutEffect } from 'react'

export default function Search() {
    // プロトコルの読み込み
    const [protocol, setProtocol] = useState(
        [['','',''],['','',''],['','',''],['','',''],
        ['','',''],['','',''],['','',''],['','',''],['','',''],['','','']]);

    useLayoutEffect(() => {
        fetch('http://127.0.0.1:3000/')
        .then((res) => res.json())
        .then((data) => setProtocol(data));
    },[]);

    // 検索ボックスに入力された文字列をFlaskとやり取り
    const [form, setForm] = useState({search: ''});
    const [searchTime, setSearchTime] = useState(0)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {    
            const response = await fetch('http://127.0.0.1:3000/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });

            if (response.ok) {
                const data = await response.json();
                setSearchTime(data.time);
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

                    const response = await fetch('http://127.0.0.1:3000/audio', {
                        method: 'POST',
                        body: formData,
                    })
                    const response_data = await response.json()
                }
            } catch (error) {
                alert(error)
                setLoading(false)
            }
            setAudioFile(null)
        }

        fn()
    }, [audioFile])
    const videoRef = useRef();

    function handleEvent(event_num) {
        videoRef.current.currentTime = protocol[event_num][1];
        videoRef.current.play()
    }
    const handleEvent01 = () => {
        videoRef.current.currentTime = protocol[1][1];
        videoRef.current.play()
    };
    const handleEvent02 = () => {
        videoRef.current.currentTime = protocol[2][1];
        videoRef.current.play()
    };
    const handleEvent03 = () => {
        videoRef.current.currentTime = protocol[3][1];
        videoRef.current.play()
    };
    const handleEvent04 = () => {
        videoRef.current.currentTime = protocol[4][1];
        videoRef.current.play()
    };
    const handleEvent05 = () => {
        videoRef.current.currentTime = protocol[5][1];
        videoRef.current.play()
    };
    const handleEvent06 = () => {
        videoRef.current.currentTime = protocol[6][1];
        videoRef.current.play()
    };
    const handleEvent07 = () => {
        videoRef.current.currentTime = protocol[7][1];
        videoRef.current.play()
    };
    const handleEvent08 = () => {
        videoRef.current.currentTime = protocol[8][1];
        videoRef.current.play()
    };
    const handleEvent09 = () => {
        videoRef.current.currentTime = protocol[9][1];
        videoRef.current.play()
    };
    return (
        <html lang="ja">
<head>
    <title>エタノール</title>
</head>

<body>
    <Link href="/">
        動画選択画面
    </Link>
    <video id='video' ref={videoRef} src='videos/ethanol_precipitation_1.mp4' controls autoPlay={true} muted />
    
    <div id="time">
    	<span id="currentTime">currentTime</span> / <span id="totalTime">totalTime</span>
    </div>
    <div>
        <form onSubmit={handleSubmit}>
            <label htmlFor="search">Search Event</label>
            <p/>
            <input 
                type="text"
                id='search'
                name='search'
                value={FormData.search}
                onChange={handleChange}
            />
            <button>検索</button>
        </form>
    </div>
    <div id="audio">
        <button onClick={startRecording}>録音開始</button>
        <button onClick={stopRecording}>録音停止</button>
    </div>
    <div id="control">
        <ul>
            <li>event01
                <button onClick={handleEvent01}>{protocol[1][0]}</button>
                {protocol[1][1]}
            </li>
            <li>event02
                <button onClick={handleEvent02}>{protocol[2][0]}</button>
            </li>
            <li>event03
                <button onClick={handleEvent03}>{protocol[3][0]}</button>
            </li>
            <li>event04
                <button onClick={handleEvent04}>{protocol[4][0]}</button>
            </li>
            <li>event05
                <button onClick={handleEvent05}>{protocol[5][0]}</button>
            </li>
            <li>event06
                <button onClick={handleEvent06}>{protocol[6][0]}</button>
            </li>
            <li>event07
                <button onClick={handleEvent07}>{protocol[7][0]}</button>
            </li>
            <li>event08
                <button onClick={handleEvent08}>{protocol[8][0]}</button>
            </li>
            <li>event09
                <button onClick={handleEvent09}>{protocol[9][0]}</button>
            </li>
        </ul>
    </div>
</body>
</html>
    )
}