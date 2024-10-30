import { useState, useEffect } from 'react'
import './App.css'

function App() {

  const [isRungning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0)

  useEffect(() => {
    const startTime = localStorage.getItem('startTime')
    const savedIsRunning = localStorage.getItem('isRunning') === 'true'

    if (startTime && savedIsRunning) {
      const elapsedTime = Math.floor((Date.now() - parseInt(startTime)) / 1000)
      setTime(elapsedTime)
      setIsRunning(true)
    }
  }, [])

  const handleStartAndStop = () => {
    setIsRunning(!isRungning)
  }

  const handleReset = () => {
    setIsRunning(false)
    setTime(0)
  }

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined
    if (isRungning) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1)
      }, 1000)
    } else if (!isRungning && time !== 0) {
      clearInterval(timer)
    }
    return () => clearInterval(timer)
  }, [isRungning])

  const formatTime = (time: number) => {
    const getSeconds = `0${time % 60}`.slice(-2)
    const minutes = Math.floor(time / 60)
    const getMinutes = `0${minutes % 60}`.slice(-2)
    const getHours = `0${Math.floor(time / 3600)}`.slice(-2)
    return `${getHours} : ${getMinutes} : ${getSeconds} `
  }

  return (
    <div className='app'>
      <div className='font'>
        <h1>THE TIME YOU SPEND WORKING</h1>
        <div className='time-display'>{formatTime(time)}</div>
        <div className='buttons'>
          <button onClick={handleStartAndStop}>
            {isRungning ? 'Stop' : 'Start'}
          </button>
          <button onClick={handleReset}>Reset</button>
        </div>
        <a href='https://github.com/tn823' className='byme' target='_blank' rel="noopener noreferrer">
          Design By: tn823
        </a>
      </div>
    </div>
  )
}

export default App
