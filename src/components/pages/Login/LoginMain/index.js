import LoginForm from '../LoginForm';

function Login({ closeModal }) {

    return (
        <div>
            <LoginForm handleSubmit={closeModal} />
        </div>
    )
}

export default Login