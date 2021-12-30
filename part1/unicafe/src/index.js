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
  return (
    <>
      <h2>Statistics: </h2>
      <p>Good: {good}</p>
      <p>Bad: {bad}</p>
      <p>Neutral: {neutral}</p>
    </>
  )
}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleChange = (e) => {

    const id = e.target.id;
    
    if(id === 'good') {
      setGood(good + 1);
    } else if(id === 'neutral') {
      setNeutral(neutral + 1);
    } else {
      setBad(bad + 1);
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
