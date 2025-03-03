import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRedoAlt, faPlay, faPause } from '@fortawesome/free-solid-svg-icons'

const ClockDial = ({
  workTime,
  intClock,
  isTimerRunning,
  handleStartStop,
  handleReset,
  calcDisplaytime,
}) => {
   const timerLabel = workTime ? 'You can do it!' : 'Rest is also important!';
   const timeClass = intClock < 61 ? 'time-left warning' : 'time-left';
 
   const playPause = isTimerRunning ? faPause : faPlay;
   const ariaLabel = isTimerRunning ? 'Pause' : 'Start';
 
   return (
     <>
       <div id="timer-label">
         {timerLabel}
       </div>
       <div className="timer-wrapper">
         <button
           id="start_stop"
           className="timer-btn"
           onClick={handleStartStop}
           aria-label={ariaLabel}
         >
           <FontAwesomeIcon icon={playPause} className="icon timer-btn-icon" />
         </button>
         <div id="time-left" className={timeClass}>
           <p>{calcDisplaytime()}</p>
         </div>
         <button
           id="reset"
           className="timer-btn "
           onClick={handleReset}
           aria-label="Reset timer"
         >
           <FontAwesomeIcon icon={faRedoAlt} className="icon timer-btn-icon"/>
         </button>
       </div>
     </>
   );
}

export default ClockDial