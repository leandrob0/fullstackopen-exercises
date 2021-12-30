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
      <p key={props.index}>{props.name} {props.exercises}</p>
    </>
  )
}

const Content = (props) => {

  const {
    parts
  } = props;

  return (
    <>
      {
        parts.map((val, index) => {
          return (
            <Part key={index} name={val.name} exercises={val.exercises}/>
          )
        })
      }
    </>
  )
}

const Footer = (props) => {

  return (
    <>
      <p>Number of exercises: 
        {
          props.exercises.reduce((prev, cur) => prev + cur.exercises, 0)
        }
      </p>
    </>
  )

}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Footer exercises={course.parts} />
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
