const Form = (props) => {
  const { submitForm, valueName, changeName, valueNumber, changeNumber } =
    props;

  return (
    <>
      <h2>Add a new: </h2>
      <form onSubmit={submitForm}>
        <div>
          name: <input value={valueName} onChange={changeName} />
        </div>
        <div>
          number: <input value={valueNumber} onChange={changeNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

export default Form;
