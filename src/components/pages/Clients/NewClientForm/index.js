import { useState, useEffect } from 'react'

import Input from '../../../form/Input'
import Select from '../../../form/Select'
import SubmitButton from '../../../form/Submit'

import styles from "./index.module.css"

function NewClientForm({ handleSubmit, btnText, clienteData, disabled }) {
    const [dados, setDados] = useState([])
    const [cliente, setCliente] = useState(clienteData || {})

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

    const submit = (e) => {
        e.preventDefault()
        handleSubmit(cliente)
    }

    function handleChange(e) {
        setCliente({ ...cliente, [e.target.name]: e.target.value })
    }

    function handleBrand(e) {
        setCliente({
            ...cliente, marca: {
                id: e.target.value,
                nome: e.target.options[e.target.selectedIndex].text
            }
        })
    }
    const setOrderName = (x, y) => {
      let a = x.nome.toUpperCase(),
      b = y.nome.toUpperCase();
  
      return a === b ? 0 : a > b ? 1 : -1;
    }

    return (
        <form onSubmit={submit} className={styles.form}>
            <div>
                <Input
                    name="nome"
                    type="text"
                    text="Nome do cliente"
                    placeholder="Insira o nome do cliente"
                    handleOnChange={handleChange}
                    value={cliente.nome ? cliente.nome : ''}
                    disabled = {disabled}
                />
            </div>
            <div>
                <Input
                    name="sobrenome"
                    type="text"
                    text="Sobrenome do cliente"
                    placeholder="Insira o sobrenome do cliente"
                    handleOnChange={handleChange}
                    value={cliente.sobrenome ? cliente.sobrenome : ''}
                    disabled = {disabled}
                />
            </div>
            <div>
                <Input
                    name="ddd"
                    type="number"
                    text="DDD do cliente"
                    placeholder="Insira o ddd do cliente"
                    handleOnChange={handleChange}
                    value={cliente.ddd ? cliente.ddd : ''}
                />
            </div>
            <div>
                <Input
                    name="telefone"
                    type="number"
                    text="Telefone de contato do cliente"
                    placeholder="Insira o telefone de contato do cliente"
                    handleOnChange={handleChange}
                    value={cliente.telefone ? cliente.telefone : ''}
                />
            </div>
            <div>
                <Input
                    name="endereco"
                    type="text"
                    text="Endereço do cliente"
                    placeholder="Insira o endereço do cliente"
                    handleOnChange={handleChange}
                    value={cliente.endereco ? cliente.endereco : ''}
                />
            </div>
            <div>
                <Input
                    name="numero"
                    type="number"
                    text="Número do endereço do cliente"
                    placeholder="Insira o número do endereço do cliente"
                    handleOnChange={handleChange}
                    value={cliente.numero ? cliente.numero : ''}
                />
            </div>
            <div>
                <Input
                    name="complemento"
                    type="text"
                    text="Complemento do endereço do cliente"
                    placeholder="Insira o complemento de endereço do cliente"
                    handleOnChange={handleChange}
                    value={cliente.complemento ? cliente.complemento : ''}
                />
            </div>
            <div>
                <Input
                    name="bairro"
                    type="text"
                    text="Bairro do endereço do cliente"
                    placeholder="Insira o bairro do cliente"
                    handleOnChange={handleChange}
                    value={cliente.bairro ? cliente.bairro : ''}
                />
            </div>
            <div>
                <Input
                    name="cidade"
                    type="text"
                    text="Cidade do cliente"
                    placeholder="Insira a cidade do cliente"
                    handleOnChange={handleChange}
                    value={cliente.cidade ? cliente.cidade : ''}
                />
            </div>
            <div>
                <Input
                    name="cep"
                    type="number"
                    text="CEP do endereço do cliente"
                    placeholder="Insira o CEP do endereço do cliente"
                    handleOnChange={handleChange}
                    value={cliente.cep ? cliente.cep : ''}
                />
            </div>
            <div>
                <Select
                    nome="marca_id"
                    text="Selecione a marca"
                    options={dados}
                    handleOnChange={handleBrand}
                    value={cliente.marca ? cliente.marca.id : ''}
                />
            </div>
            <div>
                <Input
                    name="modelo"
                    type="text"
                    text="Modelo do veículo do cliente"
                    placeholder="Insira o modelo do veículo do cliente"
                    handleOnChange={handleChange}
                    value={cliente.modelo ? cliente.modelo : ''}
                />
            </div>
            <div>
                <Input
                    name="cilindrada"
                    type="number"
                    text="Cilindrada do veículo do cliente"
                    placeholder="Insira a cilindrada do veículo do cliente"
                    handleOnChange={handleChange}
                    value={cliente.cilindrada ? cliente.cilindrada : ''}
                />
            </div>
            <div>
                <Input
                    name="ano"
                    type="number"
                    text="Ano do veículo do cliente"
                    placeholder="Insira o ano do veículo do modelo"
                    handleOnChange={handleChange}
                    value={cliente.ano ? cliente.ano : ''}
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

export default NewClientForm