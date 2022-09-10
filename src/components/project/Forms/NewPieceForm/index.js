import { useState, useEffect } from 'react'

import Input from '../../../form/Input'
import Select from '../../../form/Select'
import SubmitButton from '../../../form/Submit'

import styles from "./index.module.css"

function NewPieceForm({ handleSubmit, btnText, pecaData, disabled }) {
    const [dados, setDados] = useState([])
    const [peca, setPeca] = useState(pecaData || {})

    useEffect(() => {
        fetch('http://localhost:5000/marcas', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((resp) => resp.json())
            .then((data) => { setDados(data) })
            .catch((err) => console.log(err))
    }, [])

    const submit = (e) => {
        e.preventDefault()
        handleSubmit(peca)
    }

    function handleChange(e) {
        setPeca({ ...peca, [e.target.name]: e.target.value })
    }

    function handleBrand(e) {
        setPeca({
            ...peca, marca: {
                id: e.target.value,
                nome: e.target.options[e.target.selectedIndex].text
            }
        })
    }

    return (
        <form onSubmit={submit} className={styles.form}>
            <div>
                <Input
                    name="nome"
                    type="text"
                    text="Nome da Peça"
                    placeholder="Insira o nome da peça"
                    handleOnChange={handleChange}
                    value={peca.nome ? peca.nome : ''}
                    disabled = {disabled}
                />
            </div>
            <div>
                <Input
                    name="fabricante"
                    type="text"
                    text="Fabricante da Peça"
                    placeholder="Insira o nome do fabricante"
                    handleOnChange={handleChange}
                    value={peca.fabricante ? peca.fabricante : ''}
                    disabled = {disabled}
                />
            </div>
            <div>
                <Select
                    nome="marca_id"
                    text="Selecione a marca"
                    options={dados}
                    handleOnChange={handleBrand}
                    value={peca.marca ? peca.marca.id : ''}
                    disabled = {disabled}
                />
            </div>
            <div>
                <Input
                    name="modelo"
                    type="text"
                    text="Modelo da Moto"
                    placeholder="Insira o modelo da moto"
                    handleOnChange={handleChange}
                    value={peca.modelo ? peca.modelo : ''}
                    disabled = {disabled}
                />
            </div>
            <div>
                <Input
                    name="anoInicial"
                    type="number"
                    text="Ano Inicial"
                    placeholder="Insira o ano inicial do modelo"
                    handleOnChange={handleChange}
                    value={peca.anoInicial ? peca.anoInicial : ''}
                    disabled = {disabled}
                />
            </div>
            <div>
                <Input
                    name="anoFinal"
                    type="number"
                    text="Ano Final"
                    placeholder="Insira o ano final do modelo"
                    handleOnChange={handleChange}
                    value={peca.anoFinal ? peca.anoFinal : ''}
                    disabled = {disabled}
                />
            </div>
            <div>
                <Input
                    name="custo"
                    type="number"
                    text="Preço de Custo da Peça"
                    placeholder="Insira o custo total"
                    handleOnChange={handleChange}
                    value={peca.custo ? peca.custo : ''}
                />
            </div>
            <div>
                <Input
                    name="preco"
                    type="number"
                    text="Preço de Venda da Peça"
                    placeholder="Insira o preço de venda"
                    handleOnChange={handleChange}
                    value={peca.preco ? peca.preco : ''}
                />
            </div>
            <div>
                <Input
                    name="quantidade"
                    type="number"
                    text="Quantidade de Peças"
                    placeholder="Insira a quantidade de peças"
                    handleOnChange={handleChange}
                    value={peca.quantidade ? peca.quantidade : ''}
                />
            </div>
            <div className={styles.form_button}>
                <SubmitButton
                    text={btnText}
                />
            </div>  
        </form>
    )
}

export default NewPieceForm