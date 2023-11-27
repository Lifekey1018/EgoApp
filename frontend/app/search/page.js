'use client'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useRef, useState, useEffect, useLayoutEffect } from 'react'

const VadVideoPlayer = dynamic(() => import("./VadVideoPlayer"), {
    ssr: false
})


// const Vad = dynamic(() => import("./vad"), {
//     ssr: false,
// })


export default function Search() {
    // プロトコルの読み込み
    const [protocol, setProtocol] = useState(
        [['','','',''],['','','',''],['','','',''],
        ['','','',''],['','','',''],['','','',''],
        ['','','',''],['','','',''],['','','',''],
        ['','','','']]);

    useLayoutEffect(() => {
        fetch('http://127.0.0.1:3000/')
        .then((res) => res.json())
        .then((data) => setProtocol(data));
    },[]);

    const videoRef = useRef(null);
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
            const response = await fetch('http://127.0.0.1:3000/search/text', {
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
    
    // const vals = useListenAudio();
    // const [importedAudioFile,setImportedAudioFile] = useState(vals[1]);
    
    // useEffect(() => {
    //     console.log("useEffect using imported audioFile")
    //     const fn = async () => {
    //         try{
    //             console.log(importedAudioFile)
    //             if (importedAudioFile) {
    //                 console.log('importedAudioFile is not null')
    //                 const formData = new FormData()
    //                 formData.append('file', importedAudioFile)
    
    //                 const response = await fetch('http://127.0.0.1:3000/audio', {
    //                     method: 'POST',
    //                     body: formData,
    //                     mode: 'no-cors',
    //                 })
    
    //                 if (response.ok) {
    //                     const data = await response.json();
    //                     setSearchTime(data.time);
    //                     videoRef.current.currentTime = data.time;
    //                     videoRef.current.play();
    //                 } else {
    //                     console.log('errored');
    //                     console.log(response);
    //                 }
    //             }
    //         } catch (error) {
    //             alert(error)
    //         }
    //     }
    //     fn()
    // }, [importedAudioFile])

    // useEffect(() => {
    //     var currentTime = document.getElementById("currentTime");
    //     var totalTime = document.getElementById("totalTime");
    //     videoRef.current.addEventListener("timeupdate", function() {
    //         currentTime.textContent = videoRef.current.currentTime;
    //         totalTime.textContent = videoRef.current.duration;
    //     }, false);
    // }, [videoRef.current]);
    /*
    const handleEvent = (event_num) => {
        const video = document.getElementById('video');
        video.current.currentTime = protocol[event_num][1];
        videoRef.current.play()
    };
    */
    const handleEvent01 = () => {
        videoRef.current.currentTime = protocol[1][2];
        videoRef.current.play()
    };
    const handleEvent02 = () => {
        videoRef.current.currentTime = protocol[2][2];
        videoRef.current.play()
    };
    const handleEvent03 = () => {
        videoRef.current.currentTime = protocol[3][2];
        videoRef.current.play()
    };
    const handleEvent04 = () => {
        videoRef.current.currentTime = protocol[4][2];
        videoRef.current.play()
    };
    const handleEvent05 = () => {
        videoRef.current.currentTime = protocol[5][2];
        videoRef.current.play()
    };
    const handleEvent06 = () => {
        videoRef.current.currentTime = protocol[6][2];
        videoRef.current.play()
    };
    const handleEvent07 = () => {
        videoRef.current.currentTime = protocol[7][2];
        videoRef.current.play()
    };
    const handleEvent08 = () => {
        videoRef.current.currentTime = protocol[8][2];
        videoRef.current.play()
    };
    const handleEvent09 = () => {
        videoRef.current.currentTime = protocol[9][2];
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
    <div id="vadVideoplayer">
        <VadVideoPlayer videoRef={videoRef}></VadVideoPlayer>
    </div>
    
    <div id="time">
    	<span id="currentTime">0</span> / <span id="totalTime">0</span>
    </div>
    {/* <Vad /> */}
    <div>
        <form onSubmit={handleSubmit}>
            <label htmlFor="search">Search Event</label>
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