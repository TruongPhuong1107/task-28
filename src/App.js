import './App.css';
import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faForward, faBackward } from '@fortawesome/free-solid-svg-icons';
function App() {
  const [isPlay, setIsPlay] = useState(false)
  const [isEnd, setIsEnd] = useState(false)
  const getAudio = useRef(null)
  const [currentTimePlayer, setCurrentTimePlayer] = useState("0:00")
  const [durationPlayer, setDurationPlayer] = useState(0)
  const getProgressBar = useRef(null)
  const now = useRef(null)

  const ahuhu = () => {
    const song = getAudio.current
    setDurationPlayer(formatNumber(Math.ceil(song.duration)))
    song.addEventListener("timeupdate", ()=>{
      let time = formatNumber(Math.ceil(song.currentTime))
      setCurrentTimePlayer(time)
      now.current.style.width = song.currentTime / song.duration.toFixed(3) * 100 + '%'
      if(song.currentTime === song.duration) setIsEnd(true)
    })
  }

  function formatNumber(s){return (s-(s%=60))/60+(9<s?':':':0')+s}

  const handlePlay = () => {
    if(!isPlay){
      getAudio.current.play()
      setIsPlay(true)
      if(isEnd===true) setIsEnd(false)
    }
    else{
      getAudio.current.pause()
      setIsPlay(false)
    }
     
  }

  const next = () => {
    let time = getAudio.current
    getAudio.current.currentTime = Math.ceil(time.currentTime)+5
  }

  const previous = () => {
    let time = getAudio.current
    getAudio.current.currentTime = Math.ceil(time.currentTime)-5
  }
  const handleClick = (event) => {
      let coordStart = getProgressBar.current.getBoundingClientRect().left
      let coordEnd = event.pageX
      let p = (coordEnd - coordStart) / getProgressBar.current.offsetWidth
      now.current.style.width = `${p.toFixed(3) * 100}%`
      getAudio.current.currentTime = p * getAudio.current.duration
  }

  
  return (
    <div className="App">
      <div className='wrapper'>
        <div className='playerContainer'>
          <div className='playerBody'>
            <div className='imgPlayer'>
              <img src="/img/sky.jpg"></img>
            </div>
            <div className='controlPlayer'>
              <audio ref={getAudio} onLoadedData={ahuhu}>
                <source src="/audio/flyingWithoutWings.mp3" type="audio/mpeg"></source>
              </audio>
              <div className='songInfo'>
                <h2>Flying Without Wings</h2>
                <p>Weslife</p>
              </div>
              <div className='btnGroup'>
                <FontAwesomeIcon icon={faBackward} onClick={previous} />
                <FontAwesomeIcon icon={(isPlay&&!isEnd)?faPause:faPlay} onClick={handlePlay}/>
                <FontAwesomeIcon icon={faForward} onClick = {next}/>
              </div>

              <div className='timeControl'>
                <span>{currentTimePlayer}</span>
                <span>{durationPlayer}</span>
              </div>
              <div className='controlProgress' ref={getProgressBar} onClick={(event) => handleClick(event)}>
                <div className='now' ref={now}></div>
                <div className='musicDuration'></div>   
                <span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
