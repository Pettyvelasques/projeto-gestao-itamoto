import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

import NewBuyForm from '../../project/Forms/NewBuyForm'
import Message from '../../layout/Message'

import styles from './index.module.css'

function NewBuy() {

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
        else if (!peca.marca.nome) {
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
            setMessage('Ano Inicial não definido')
            setType('error')
            
            setTimeout(() => { setMessage('') }, 2500);
            return false
        }
        else if (!peca.anoFinal) {
            setMessage('Ano Final não definido')
            setType('error')
            
            setTimeout(() => { setMessage('') }, 2500);
            return false
        }
        else if (!peca.quantidade) {
            setMessage('Quantidade de peças não definida')
            setType('error')
            
            setTimeout(() => { setMessage('') }, 2500);
            return false
        }
        else if (!peca.custo) {
            setMessage('Custo da peça não definido')
            setType('error')
            
            setTimeout(() => { setMessage('') }, 2500);
            return false
        }
        else if (!peca.preco) {
            setMessage('Preço de venda não definido')
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
                navigate ('/pieces', {state: { type: 'success', message: 'Peça cadastrada com sucesso!' }})
            })
            .catch(err => console.log(err))
    }

    return (
        <div className={styles.newproject_container}>
            {message && <Message type={type} msg={message} />}
            <h1>Cadastrar Peça</h1>
            <p>Adicione as informações da nova peça</p>
            <NewBuyForm handleSubmit={createPost} btnText="Cadastrar Peça" />
        </div>
    )
}

export default NewBuy