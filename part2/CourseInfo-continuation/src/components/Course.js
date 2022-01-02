const Title = ({ title }) => {
  return (
    <>
      <h2>{title}</h2>
    </>
  );
};

const Parts = ({ parts }) => {
  return (
    <ul>
      {parts.map((val) => (
        <li key={val.id}>
          {val.name} {val.exercises}
        </li>
      ))}
      <p>
        Total exercises: {parts.reduce((prev, cur) => prev + cur.exercises, 0)}
      </p>
    </ul>
  );
};

const Course = ({ courses }) => {
  return (
    <div>
      {courses.map((val) => {
        return (
          <>
            <Title key={val.id} title={val.name} />
            <Parts parts={val.parts} />
          </>
        );
      })}
    </div>
  );
};

export default Course;
