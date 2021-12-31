const Numbers = ({ persons }) => {
    return (
        <>
            <h2>Numbers</h2>
            {
                persons.map(val => <p key={val.name}>{val.name} {val.number}</p>)
            }
        </>
    )
}

export default Numbers;