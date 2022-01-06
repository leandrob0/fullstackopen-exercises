import '../styles/Success.css'

const Success = ({ msg }) => {
    if(msg.msg === '') {
        return null;
    } else {
        if(msg.type === 0) {
            return (
                <div className="succes-message">{msg.msg}</div>
            )
        } else {
            return (
                <div className="error-message">{msg.msg}</div>
            )
        }
    }
}

export default Success;