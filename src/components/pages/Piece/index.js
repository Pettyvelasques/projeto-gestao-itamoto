import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { BsPencil, BsFillTrashFill } from 'react-icons/bs'

import styles from './index.module.css'
import Container from '../../layout/Container'
import NewPieceForm from '../../project/Forms/NewPieceForm'
import Message from '../../layout/Message'
import Loading from '../../layout/Loading'

function Piece() {

    const navigate = useNavigate()
    const { id } = useParams()

    const [peca, setPeca] = useState([])
    const [showPieceForm, setShowPieceForm] = useState(false)
    const [message, setMessage] = useState()
    const [type, setType] = useState()

    useEffect(() => {
        setTimeout(
            () => {
                fetch(`http://localhost:5000/pecas/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                    },
                })
                    .then(resp => resp.json())
                    .then((data) => {
                        setPeca(data)
                    })
                    .catch((err) => console.log(err))
            }, 300)

    }, [id])

    function editPost(peca) {
        setMessage('');
        let resultado = window.confirm("Deseja salvar as alterações?");
        
        if (resultado === false) {
            return false
        }

        else if (parseFloat(peca.preco) < parseFloat(peca.custo)) {
            setMessage('O preço do produto não pode ser inferior ao seu custo!')
            setType('error')

            setTimeout(() => { setMessage('') }, 2500);
            return false
        }

        fetch(`http://localhost:5000/pecas/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(peca),
        })
            .then(resp => resp.json())
            .then((data) => {
                setPeca(data)
                setShowPieceForm(false)
                setMessage('Dados Atualizados com Sucesso!')
                setType('success')

            })
            .catch((err) => console.log(err))
    }

    function removePiece(peca) {

        let resultado = window.confirm("Tem certeza que deseja excluir essa peça?");
        if (resultado === false) {
            return false
        }

        fetch(`http://localhost:5000/pecas/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
            },
        })
            .then(resp => resp.json())
            .then(() => {
                setPeca(peca.filter((peca) => peca.id !== id))

            })
            .catch((err) => console.log(err))

        navigate('/pieces', { state: { type: 'success', message: 'Peça removida com sucesso!' } })

    }

    function togglePieceForm() {
        setShowPieceForm(!showPieceForm)
    }

    return (
        <>
            {peca.nome ? (
                <Container customClass='start'>
                    {message && <Message type={type} msg={message} />}
                    <div className={styles.title_container}>
                        <h1> {peca.nome} {peca.fabricante} </h1>
                        <div className={styles.buttons_container}>
                            <button className={styles.btn} onClick={togglePieceForm}>
                                {!showPieceForm ? <BsPencil /> : "X"}
                            </button>
                            <button className={styles.btn}>
                                <BsFillTrashFill onClick={removePiece} />
                            </button>
                        </div>
                    </div>
                    <div className={styles.details_container}>
                        {!showPieceForm ? (
                            <div className={styles.project_info}>
                                <p>
                                    <span>Nome: </span> {peca.nome}
                                </p>
                                <p>
                                    <span>Fabricante: </span> {peca.fabricante}
                                </p>
                                <p>
                                    <span>Marca: </span> {peca.marca.nome}
                                </p>
                                <p>
                                    <span>Modelo: </span> {peca.modelo}
                                </p>
                                <p>
                                    <span>Ano Inicial: </span> {peca.anoInicial}
                                </p>
                                <p>
                                    <span>Ano Final: </span> {peca.anoFinal}
                                </p>
                                <p>
                                    <span>Custo Total: </span> {peca.custo}
                                </p>
                                <p>
                                    <span>Preço Final: </span> {peca.preco}
                                </p>
                                <p>
                                    <span>Quantidade: </span> {peca.quantidade}
                                </p>
                            </div>
                        ) : (
                            <div className={styles.project_form}>
                                <NewPieceForm
                                    handleSubmit={editPost}
                                    btnText="Salvar"
                                    pecaData={peca}
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

export default Piece