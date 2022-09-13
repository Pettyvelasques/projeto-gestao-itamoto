import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

import styles from './index.module.css'
import NewClientForm from '../NewClientForm'
import Message from '../../../layout/Message'
import Container from "../../../layout/Container";

function NewClient() {

    const navigate = useNavigate()
    const [message, setMessage] = useState()
    const [type, setType] = useState()

    function createPost(cliente) {

        if (!cliente.nome) {
            setMessage('Nome do cliente não definido')
            setType('error')

            setTimeout(() => { setMessage('') }, 2500);
            return false
        }
        else if (!cliente.sobrenome) {
            setMessage('Sobrenome não definido')
            setType('error')

            setTimeout(() => { setMessage('') }, 2500);
            return false
        }
        else if (!cliente.endereco) {
            setMessage('Endereço não definido')
            setType('error')

            setTimeout(() => { setMessage('') }, 2500);
            return false
        }
        else if (!cliente.numero) {
            setMessage('Número de endereço não definido')
            setType('error')

            setTimeout(() => { setMessage('') }, 2500);
            return false
        }
        else if (!cliente.bairro) {
            setMessage('Bairro não definido')
            setType('error')

            setTimeout(() => { setMessage('') }, 2500);
            return false
        }
        else if (!cliente.cidade) {
            setMessage('Cidade não definida')
            setType('error')

            setTimeout(() => { setMessage('') }, 2500);
            return false
        }
        else if (!cliente.cep) {
            setMessage('CEP não definido')
            setType('error')

            setTimeout(() => { setMessage('') }, 2500);
            return false
        }
        else if (!cliente.ddd) {
            setMessage('DDD não definido')
            setType('error')

            setTimeout(() => { setMessage('') }, 2500);
            return false
        }
        else if (!cliente.telefone) {
            setMessage('Telefone de contato não definido')
            setType('error')

            setTimeout(() => { setMessage('') }, 2500);
            return false
        }
        else if (!cliente.marca) {
            setMessage('Marca do veículo não definido')
            setType('error')

            setTimeout(() => { setMessage('') }, 2500);
            return false
        }
        else if (!cliente.modelo) {
            setMessage('Modelo do veículo não definido')
            setType('error')

            setTimeout(() => { setMessage('') }, 2500);
            return false
        }
        else if (!cliente.cilindrada) {
            setMessage('Cilindrada do veículo não definida')
            setType('error')

            setTimeout(() => { setMessage('') }, 2500);
            return false
        }
        else if (!cliente.ano) {
            setMessage('Ano do veículo não definido')
            setType('error')

            setTimeout(() => { setMessage('') }, 2500);
            return false
        }

        fetch("http://localhost:5000/clientes", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(cliente)
        })
            .then(resp => resp.json())
            .then((data) => {
                navigate('/clients', { state: { type: 'success', message: 'Cliente cadastrado com sucesso!' } })
            })
            .catch(err => console.log(err))
    }

    return (
        <Container customClass="start">
            <div className={styles.newclient_container}>
                {message && <Message type={type} msg={message} />}
                <h1>Cadastrar Cliente</h1>
                <p>Adicione as informações do cliente</p>
                <NewClientForm handleSubmit={createPost} btnText="Cadastrar Cliente" />
            </div>
        </Container>
    )
}

export default NewClient