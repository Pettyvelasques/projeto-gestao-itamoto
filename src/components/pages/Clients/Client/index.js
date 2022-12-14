import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { BsPencil, BsFillTrashFill } from 'react-icons/bs'

import styles from './index.module.css'
import Container from '../../../layout/Container'
import NewClientForm from '../NewClientForm'
import Message from '../../../layout/Message'
import Loading from '../../../layout/Loading'

function Client() {

    const navigate = useNavigate()
    const { id } = useParams()

    const [cliente, setCliente] = useState([])
    const [showClientForm, setShowClientForm] = useState(false)
    const [message, setMessage] = useState()
    const [type, setType] = useState()

    useEffect(() => {
        setTimeout(
            () => {
                fetch(`http://localhost:5000/clientes/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                    },
                })
                    .then(resp => resp.json())
                    .then((data) => {
                        setCliente(data)
                    })
                    .catch((err) => console.log(err))
            }, 300)

    }, [id])

    function editPost(a) {
        setMessage('');
        let resultado = window.confirm("Deseja salvar as alterações?");

        if (resultado === false) {
            return false
        }

        if (a.lenght > 11) {
            console.log("tudo normal!")
            setMessage('O preço do produto não pode ser inferior ao seu custo!')
            setType('error')

            setTimeout(() => { setMessage('') }, 2500);
            return false
        }

        fetch(`http://localhost:5000/clientes/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(a),
        })
            .then(resp => resp.json())
            .then((data) => {
                setCliente(data)
                setShowClientForm(false)
                setMessage('Dados Atualizados com Sucesso!')
                setType('success')

            })
            .catch((err) => console.log(err))
    }

    function removeClient(b) {

        let resultado = window.confirm("Tem certeza que deseja excluir esse cadastro?");
        if (resultado === false) {
            return false
        }

        fetch(`http://localhost:5000/clientes/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
            },
        })
            .then(resp => resp.json())
            .then(() => {
                setCliente(b.filter((cliente) => cliente.id !== id))

            })
            .catch((err) => console.log(err))

        navigate('/clients', { state: { type: 'success', message: 'Cadastro do cliente removido com sucesso!' } })

    }

    function toggleClientForm() {
        setShowClientForm(!showClientForm)
    }

    function capitalizeFirstLetter(b) {
        return b.charAt(0).toUpperCase() + b.slice(1).toLowerCase();
    }

    return (
        <>
            {cliente.nome ? (
                <Container customClass='start'>
                    {message && <Message type={type} msg={message} />}
                    <div className={styles.title_container}>
                        <h1> {cliente.nome.split(' ').map(capitalizeFirstLetter).join(' ')} {cliente.sobrenome.split(' ').map(capitalizeFirstLetter).join(' ')} </h1>
                        <div className={styles.buttons_container}>
                            <button className={styles.btn} onClick={toggleClientForm}>
                                {!showClientForm ? <BsPencil /> : "X"}
                            </button>
                            <button className={styles.btn}>
                                <BsFillTrashFill onClick={removeClient} />
                            </button>
                        </div>
                    </div>
                    <div className={styles.details_container}>
                        {!showClientForm ? (
                            <div className={styles.client_info}>
                                <p>
                                    <span>Nome: </span> {cliente.nome.split(' ').map(capitalizeFirstLetter).join(' ')}
                                </p>
                                <p>
                                    <span>Sobrenome: </span> {cliente.sobrenome.split(' ').map(capitalizeFirstLetter).join(' ')}
                                </p>
                                <p>
                                    <span>DDD: </span> {cliente.ddd}
                                </p>
                                <p>
                                    <span>Telefone: </span> {cliente.telefone}
                                </p>
                                <p>
                                    <span>Endereço: </span> {cliente.endereco.split(' ').map(capitalizeFirstLetter).join(' ')}
                                </p>
                                <p>
                                    <span>Número: </span> {cliente.numero}
                                </p>
                                <p>
                                    <span>Complemento: </span> {cliente.complemento.split(' ').map(capitalizeFirstLetter).join(' ')}
                                </p>
                                <p>
                                    <span>Bairro: </span> {cliente.bairro.split(' ').map(capitalizeFirstLetter).join(' ')}
                                </p>
                                <p>
                                    <span>Cidade: </span> {cliente.cidade.split(' ').map(capitalizeFirstLetter).join(' ')}
                                </p>
                                <p>
                                    <span>CEP: </span> {cliente.cep}
                                </p>
                                <p>
                                    <span>Marca: </span> {cliente.marca.nome}
                                </p>
                                <p>
                                    <span>Modelo: </span> {cliente.modelo.split(' ').map(capitalizeFirstLetter).join(' ')}
                                </p>
                                <p>
                                    <span>Cilindrada: </span> {cliente.cilindrada}
                                </p>
                                <p>
                                    <span>Ano: </span> {cliente.ano}
                                </p>
                            </div>
                        ) : (
                            <div className={styles.client_form}>
                                <NewClientForm
                                    handleSubmit={editPost}
                                    btnText="Salvar"
                                    clienteData={cliente}
                                    disabled="true"
                                />
                            </div>
                        )}
                    </div>
                </Container>
            ) : (
                <Loading />
            )}
        </>
    )
}

export default Client