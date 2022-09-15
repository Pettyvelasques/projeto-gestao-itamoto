import { useState, useEffect } from 'react';

import styles from './index.module.css'
import Logo from '../../../../img/itamoto_logo.png'
import Container from '../../../layout/Container';
import Input from '../../../form/Input';
import Message from '../../../layout/Message';

function LoginForm({ handleSubmit }) {
    const [handleData, setHandleData] = useState();
    const [dados, setDados] = useState()
    const [message, setMessage] = useState()
    const [type, setType] = useState()

    useEffect(() => {
        fetch('http://localhost:5000/credenciais/699', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((resp) => resp.json())
            .then((data) => { setDados(data) })
            .catch((err) => console.log(err))
    }, [])

    function handleChange(a) {
        setHandleData({ ...handleData, [a.target.name]: a.target.value })
    }

    function validateLogin(a) {

        if (!a.user || a.user !== dados.user) {
            setMessage('Usuário não cadastrado')
            setType('error')
            console.log(a.user)
            console.log(dados.user)

            setTimeout(() => { setMessage('') }, 2500);
            return false
        }
        else if (!a.password || a.password !== dados.password) {
            setMessage('Senha inválida')
            setType('error')

            setTimeout(() => { setMessage('') }, 2500);
            return false
        }
        else {
            handleSubmit(handleData)

        }
    }

    return (
        <div className={styles.login_container}>
            {message && <Message type={type} msg={message} />}
            <h1>
                <img src={Logo} alt="Logo Oficina Itamoto" />
            </h1>
            <Container customClass="column">
                <h2>Faça login para continuar</h2>
                <form onSubmit={validateLogin} className={styles.form}>
                    <label>
                        <p>Usuário</p>
                        <Input
                            name="user"
                            type="text"
                            text="usuario"
                            placeholder="Insira o nome de usuário"
                            handleOnChange={handleChange}
                        />
                    </label>
                    <label>
                        <p>Senha</p>
                        <Input
                            name="password"
                            type="text"
                            text="senha"
                            placeholder="Insira a senha"
                            handleOnChange={handleChange}
                        />
                    </label>
                    <div>
                        <button type="submit">Logar</button>
                    </div>
                </form>
            </Container>
        </div>
    )
}

export default LoginForm