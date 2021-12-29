import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Part = (props) => {
  
  return (
    <>
      <p key={props.index}>{props.val} {props.exercises[props.index]}</p>
    </>
  )
}

const Content = (props) => {

  const {
    parts,
    exercises
  } = props;

  return (
    <>
      {
        parts.map((val,index) => {
          return (
            <Part index={index} val={val} exercises={exercises}/>
          )
        })
      }
    </>
  )
}

const Footer = (props) => {

  return (
    <>
      <p>Number of exercises: {props.exercises[0] + props.exercises[1] + props.exercises[2]}</p>
    </>
  )

}

const App = () => {
  const course = 'Half Stack application development'
  const parts = ['Fundamentals of React', 'Using props to pass data', 'State of a component']
  const exercises = [10,7,14]

  return (
    <div>
      <Header course={course}/>
      <Content parts={parts} exercises={exercises}/>
      <Footer exercises={exercises} />
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
