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
            .then((data) => { setDados(data.sort(setOrderName)) })
            .catch((err) => console.log(err))
    }, [])

    const submit = (a) => {
        a.preventDefault()
        handleSubmit(peca)
    }

    function handleChange(b) {
        setPeca({ ...peca, [b.target.name]: b.target.value })
    }

    function handleBrand(c) {
        setPeca({
            ...peca, marca: {
                id: c.target.value,
                nome: c.target.options[c.target.selectedIndex].text
            }
        })
    }
    const setOrderName = (x, y) => {
      let a = x.nome.toUpperCase(),
      b = y.nome.toUpperCase();
  
      return a === b ? 0 : a > b ? 1 : -1;
    }

    function capitalizeFirstLetter(b) {
      return b.charAt(0).toUpperCase() + b.slice(1);
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
                    value={peca.nome ? peca.nome.split(' ').map(capitalizeFirstLetter).join(' ') : ''}
                    disabled={disabled}
                />
            </div>
            <div>
                <Input
                    name="fabricante"
                    type="text"
                    text="Fabricante da Peça"
                    placeholder="Insira o nome do fabricante"
                    handleOnChange={handleChange}
                    value={peca.fabricante ? peca.fabricante.split(' ').map(capitalizeFirstLetter).join(' ') : ''}
                    disabled={disabled}
                />
            </div>
            <div>
                <Select
                    nome="marca_id"
                    text="Selecione a marca da moto"
                    options={dados}
                    handleOnChange={handleBrand}
                    value={peca.marca ? peca.marca.id : ''}
                    disabled={disabled}
                />
            </div>
            <div>
                <Input
                    name="modelo"
                    type="text"
                    text="Modelo da Moto"
                    placeholder="Insira o modelo da moto"
                    handleOnChange={handleChange}
                    value={peca.modelo ? peca.modelo.split(' ').map(capitalizeFirstLetter).join(' ') : ''}
                    disabled={disabled}
                />
            </div>
            <div>
                <Input
                    name="cilindrada"
                    type="number"
                    text="Cilindrada da Moto"
                    placeholder="Insira a cilindrada da moto"
                    handleOnChange={handleChange}
                    value={peca.cilindrada ? peca.cilindrada : ''}
                    disabled={disabled}
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
                    disabled={disabled}
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
                    disabled={disabled}
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
            <div />
            <div className={styles.form_button}>
                <SubmitButton
                    text={btnText}
                />
            </div>
        </form>
    )
}

export default NewPieceForm