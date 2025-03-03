import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'

//goes into AdjustmentBtns components later
//makes a basic structure for break and work timers 
const SetTime = ({ handleIncrement, handleDecrement, id, input, length, name }) => {
    return (
      <div>
        <div id={`${id}-label`} className="settings-label">
          {name}
        </div>
        <div className="settings-wrapper">
          <button
            id={`${id}-increment`}
            className="settings-btn"
            onClick={() => handleIncrement(input)}
            aria-label={`Increment ${id} time`}
          >
            <FontAwesomeIcon icon={faPlus} className="icon" />
          </button>
          <div id={`${id}-length`} className="settings-time">
            {length}
          </div>
          <button
            id={`${id}-decrement`}
            className="settings-btn"
            onClick={() => handleDecrement(input)}
            aria-label={`Decrement ${id} time`}
          >
            <FontAwesomeIcon icon={faMinus} className="icon" />
          </button>
        </div>
      </div>
    );
  };

  export default SetTime