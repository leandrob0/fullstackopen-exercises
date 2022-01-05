const Numbers = ({ persons , onclick }) => {
  return (
    <>
      <h2>Numbers</h2>
      {persons.map((val) => (
        <div key={val.id} id={val.id}>
          <p>
            {val.name} {val.number}
            <button onClick={onclick} type='button'>delete</button>
          </p>
        </div>
      ))}
    </>
  );
};

export default Numbers;
