import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

import styles from './index.module.css'
import NewPieceForm from '../../project/Forms/NewPieceForm'
import Message from '../../layout/Message'
import Container from "../../layout/Container";


function NewPiece() {

    const navigate = useNavigate()
    const [message, setMessage] = useState()
    const [type, setType] = useState()

    function createPost(peca) {

        if (!peca.nome) {
            setMessage('Nome da peça não definido')
            setType('error')

            setTimeout(() => { setMessage('') }, 2500);
            return false
        }
        else if (!peca.fabricante) {
            setMessage('Fabricante da peça não definido')
            setType('error')

            setTimeout(() => { setMessage('') }, 2500);
            return false
        }
        else if (!peca.marca) {
            setMessage('Marca da peça não definida')
            setType('error')

            setTimeout(() => { setMessage('') }, 2500);
            return false
        }
        else if (!peca.modelo) {
            setMessage('Modelo da moto não definido')
            setType('error')

            setTimeout(() => { setMessage('') }, 2500);
            return false
        }
        else if (!peca.anoInicial) {
            setMessage('Ano Inicial inválido')
            setType('error')

            setTimeout(() => { setMessage('') }, 2500);
            return false
        }
        else if (!peca.anoFinal || parseFloat(peca.anoFinal) < parseFloat(peca.anoInicial)) {
            setMessage('Ano Final inválido')
            setType('error')

            setTimeout(() => { setMessage('') }, 2500);
            return false
        }
        else if (!peca.quantidade || parseFloat(peca.quantidade) < 1) {
            setMessage('Quantidade de peças inválida')
            setType('error')

            setTimeout(() => { setMessage('') }, 2500);
            return false
        }
        else if (!peca.custo || parseFloat(peca.custo) < 1) {
            setMessage('Custo da peça inválido')
            setType('error')

            setTimeout(() => { setMessage('') }, 2500);
            return false
        }
        else if (!peca.preco || parseFloat(peca.preco) < parseFloat(peca.custo)) {
            setMessage('Preço de venda inválido')
            setType('error')

            setTimeout(() => { setMessage('') }, 2500);
            return false
        }

        fetch("http://localhost:5000/pecas", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(peca)
        })
            .then(resp => resp.json())
            .then((data) => {
                console.log(data)
                //redirect
                navigate('/pieces', { state: { type: 'success', message: 'Peça cadastrada com sucesso!' } })
            })
            .catch(err => console.log(err))
    }

    return (
        <Container customClass="start">
            <div className={styles.newpiece_container}>
                {message && <Message type={type} msg={message} />}
                <h1>Cadastrar Peça</h1>
                <p>Adicione as informações da nova peça</p>
                <NewPieceForm handleSubmit={createPost} btnText="Cadastrar Peça" />
            </div>
        </Container>
    )
}

export default NewPiece