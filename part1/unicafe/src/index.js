import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Feedback = ({handleState, text, id}) => {
  return (
    <>
      <button id={id} onClick={handleState}>{text}</button>
    </>
  )
}

const Stats = ({good, bad, neutral}) => {

  const operacion = (good/(good+bad+neutral)) * 100;

  return (
    <>
      <h2>Statistics: </h2>
      <p>Good: {good}</p>
      <p>Bad: {bad}</p>
      <p>Neutral: {neutral}</p>
      <p>All: {good+bad+neutral}</p>
      <p>Percentage good: {(operacion) ? operacion.toFixed(2) : 0}</p>
      <p>Average: {((good+bad+neutral)/3).toFixed(2)}</p>
      <p></p>
    </>
  )
}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleChange = (e) => {

    const id = e.target.id;
    
    switch(id){
      case 'good':
        setGood(good + 1);
        break;
      case 'bad':
        setBad(bad + 1);
        break;
      default:
        setNeutral(neutral + 1);
        break;
    }

  }

  return (
    <div>
      <h2>Give feedback!:</h2>
      <Feedback handleState={handleChange} text='Good' id='good'/>
      <Feedback handleState={handleChange} text='Neutral' id='neutral'/>
      <Feedback handleState={handleChange} text='Bad' id='bad'/>
      <Stats good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
