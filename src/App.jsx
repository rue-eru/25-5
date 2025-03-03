import { useState, useRef } from 'react'
import alarm from './media/AlarmSound.mp3';
import './App.css'
import Header from './Header';
import ClockDial from './ClockDial';
import AdjustmentBtns from './AdjustmentBtns';
import Footer from './Footer';

const baseStates = {
  intClock: 1500, // default = 1500 secs = 25 mins
  isTimerRunning: false,
  intervalId: null, //  is used to store the ID returned by setInterval(). This ID is necessary to clear the interval later using clearInterval(). When you start the timer, setInterval() returns an ID that you can use to stop the timer when needed.
  workTime: true, // true = work time; false = break
  breakLength: 5, // default = 5; min = 1; max = 60
  workLength: 25, // default = 25; min = 1; max = 60
}

function App() {
  const [state, setState] = useState({ ...baseStates });
  const alarmRef = useRef(null);

  //This function starts or stops the timer. When the timer starts, it calls runTimer(), which returns an interval ID. This ID is stored in intervalId so that you can stop the timer later by calling clearInterval(state.intervalId).
  const handleStartStop = () => {
    if (!state.isTimerRunning) {
      // Start or resume the timer
      const intervalId = runTimer();
      setState((prevState) => ({
        ...prevState,
        intervalId,
        isTimerRunning: true,
      }));
    } else {
      // Pause the timer
      clearInterval(state.intervalId);
      setState((prevState) => ({ ...prevState, isTimerRunning: false }));
    }
  };

  // This function resets the timer to its initial state. It clears the interval using clearInterval(state.intervalId) and resets the state to the default values.
  const handleReset = () => {
    clearInterval(state.intervalId);
    setState({ ...baseStates });
    alarmRef.current.pause();
    alarmRef.current.currentTime = 0;
  };

  const handleIncrement = (input) => {
    setState((prevState) => {
      const newSessionLength = prevState[input] + 1;
      // + 1 stands for 1 min
      const newTime = newSessionLength * 60;
      // converting mins into secs 

      //less than 60 secs
      if (prevState[input] < 60 && !state.isTimerRunning) {
        if (prevState.workTime && input === 'workLength') {
          return { 
            ...prevState, 
            // the intClock is updated to reflect the new time
            intClock: newTime, 
            workLength: newSessionLength 
          };
        } else if (!prevState.workTime && input === 'breakLength') {
          return { 
            ...prevState, 
            intClock: newTime, 
            breakLength: newSessionLength 
          };
        } else {
          return { 
            ...prevState, 
            [input]: newSessionLength 
          };
        }
      }
      return prevState;
    });
  };

  const handleDecrement = (input) => {
    setState((prevState) => {
      const newSessionLength = prevState[input] - 1;
      const newTime = newSessionLength * 60;

      if (prevState[input] > 1 && !state.isTimerRunning) {
        if (prevState.workTime && input === 'workLength') {
          return { 
            ...prevState, 
            intClock: newTime, 
            workLength: newSessionLength 
          };
        } else if (!prevState.workTime && input === 'breakLength') {
          return { 
            ...prevState, 
            intClock: newTime, 
            breakLength: newSessionLength 
          };
        } else {
          return { 
            ...prevState, 
            [input]: newSessionLength 
          };
        }
      }
      return prevState;
    });
  };

  // This function runs the timer. It uses setInterval to decrement the intClock every second. When intClock reaches 0, it switches between work and break times and plays the alarm sound.
  // it goes only in intervalId 
  const runTimer = () => {
    return setInterval(() => {
      setState((prevState) => {
        if (prevState.intClock === 0) {
          //it sets an alarm when the time is out
          alarmRef.current.play();
          if (prevState.workTime) {
            return { 
              ...prevState, 
              intClock: prevState.breakLength * 60, 
              workTime: false 
            };
          } else {
            return { 
              ...prevState, 
              intClock: prevState.workLength * 60, 
              workTime: true 
            };
          }
        }
        return { 
          ...prevState, 
          intClock: prevState.intClock - 1 
        };
      });
    }, 1000); // = 1sec
  };

  // This function converts the total seconds (intClock) into a formatted string of minutes and seconds (e.g., "25:00").
  const calcDisplaytime = () => {
    //The padStart() method pads a string with another string (multiple times) until it reaches a given length.
    // 1. Calculate minutes: divide total seconds by 60 and floor the result
    let mins = String(Math.floor(state.intClock / 60));
    // 2. Calculate seconds: get the remainder of total seconds divided by 60
    let secs = String(state.intClock % 60);

    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const { workTime, intClock, isTimerRunning, breakLength, workLength } = state;

  return (
    <>
      <Header />
      <div id="container">
        <ClockDial 
          handleStartStop={handleStartStop}
          handleReset={handleReset}
          calcDisplaytime={calcDisplaytime}
          workTime={workTime}
          intClock={intClock}
          isTimerRunning={isTimerRunning}
        />
        <AdjustmentBtns 
          breakLength={breakLength}
          workLength={workLength}
          handleIncrement={handleIncrement}
          handleDecrement={handleDecrement}
        />
        <audio 
        id="beep" 
        src={alarm} 
        preload="auto" 
        ref={alarmRef} 
        />
      </div>
      <Footer />
    </>
  )
}

export default App
