import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Display = ({title, text}) => {
  return (
    <>
      <h2>{title}</h2>
      <p>{text}</p>
    </>
  )
}

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState([0,0,0,0,0,0,0])

  const generateRandom = () => setSelected(Math.floor(Math.random() * 6));

  const updatePoints = () => {
    let cpy = [...points];
    cpy[selected]++;
    setPoints(cpy);
  }

  const maxVotes = () => points.indexOf(Math.max(...points));

  return (
    <div>
      <Display title={props.anecdotes[selected]}/>
      <p>{points[selected]}</p>
      <Button onClick={updatePoints} text='Vote'/>
      <Button onClick={generateRandom} text='Next anecdote' />
      <Display title='Anecdote with most votes: ' text={anecdotes[maxVotes()]}/>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <React.StrictMode>
    <App anecdotes={anecdotes} />
  </React.StrictMode>,
  document.getElementById('root')
);
