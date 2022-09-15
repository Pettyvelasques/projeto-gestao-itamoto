import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

import styles from './index.module.css'
import NewPieceForm from '../NewPieceForm'
import Message from '../../../layout/Message'
import Container from "../../../layout/Container";


function NewPiece() {

    const navigate = useNavigate()
    const [message, setMessage] = useState()
    const [type, setType] = useState()

    function createPost(a) {

        if (!a.nome) {
            setMessage('Nome da peça não definido')
            setType('error')

            setTimeout(() => { setMessage('') }, 2500);
            return false
        }
        else if (!a.fabricante) {
            setMessage('Fabricante da peça não definido')
            setType('error')

            setTimeout(() => { setMessage('') }, 2500);
            return false
        }
        else if (!a.marca) {
            setMessage('Marca da peça não definida')
            setType('error')

            setTimeout(() => { setMessage('') }, 2500);
            return false
        }
        else if (!a.modelo) {
            setMessage('Modelo da moto não definido')
            setType('error')

            setTimeout(() => { setMessage('') }, 2500);
            return false
        }
        else if (!a.cilindrada) {
            setMessage('Cilindrada da moto não definida')
            setType('error')

            setTimeout(() => { setMessage('') }, 2500);
            return false
        }
        else if (!a.anoInicial) {
            setMessage('Ano Inicial inválido')
            setType('error')

            setTimeout(() => { setMessage('') }, 2500);
            return false
        }
        else if (!a.anoFinal || parseFloat(a.anoFinal) < parseFloat(a.anoInicial)) {
            setMessage('Ano Final inválido')
            setType('error')

            setTimeout(() => { setMessage('') }, 2500);
            return false
        }
        else if (!a.quantidade || parseFloat(a.quantidade) < 1) {
            setMessage('Quantidade de peças inválida')
            setType('error')

            setTimeout(() => { setMessage('') }, 2500);
            return false
        }
        else if (!a.custo || parseFloat(a.custo) < 1) {
            setMessage('Custo da peça inválido')
            setType('error')

            setTimeout(() => { setMessage('') }, 2500);
            return false
        }
        else if (!a.preco || parseFloat(a.preco) < parseFloat(a.custo)) {
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
            body: JSON.stringify(a)
        })
            .then(resp => resp.json())
            .then((data) => {
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