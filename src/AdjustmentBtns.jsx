import SetTime from './SetTime';

const AdjustmentBtns = ({ handleIncrement, handleDecrement, breakLength, workLength }) => {
  return (
    <div className="settings-wrapper-box">
      <SetTime
        handleIncrement={handleIncrement}
        handleDecrement={handleDecrement}
        id="break"
        input="breakLength"
        length={breakLength}
        name="Break"
      />
      <SetTime
        handleIncrement={handleIncrement}
        handleDecrement={handleDecrement}
        id="session"
        input="workLength"
        length={workLength}
        name="Work"
      />
    </div>
  );
};

export default AdjustmentBtns