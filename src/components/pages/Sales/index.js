import { useState, useEffect } from "react";
import SalesCard from "../../project/cards/SalesCard";
import Container from "../../layout/Container";
import LinkButton from "../../layout/LinkButton";

import styles from './index.module.css'

function Sales() {
  const [sales, setSales] = useState({})
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  useEffect(() => {
    setTimeout(
      () => {
        fetch("http://localhost:5000/vendas", {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
          },
        })
          .then(resp => resp.json())
          .then(data => {
            setSales(data)
            setFilteredData(data)
          })
          .catch((err) => console.log(err))
      }, 300)
  }, [])

  const handleOnChange = (e) => {
    const searchWord = e.target.value
    setWordEntered(searchWord)
    const newFilter = sales.filter((value) => {
      return value.comprador.nome.toLowerCase().includes(searchWord.toLowerCase())
    })

    if (searchWord === "") {
      setFilteredData(sales)
    } else {
      setFilteredData(newFilter)
    }
  }

  return (
    <Container customClass="start">
      <div className={styles.search_container}>
        <input type="search"
          placeholder="Digite para pesquisar"
          onChange={handleOnChange}
          value={wordEntered}
        />
        <LinkButton to="/newsale" text="+" />
      </div>
      <div className={styles.index_result}>
        <p> Data </p>
        <p> Nome </p>
        <p> Sobrenome </p>
        <p> Telefone </p>
        <p> Total de Itens </p>
        <p> Valor Total </p>
        <p> Forma de Pagamento </p>
        <p> Editar </p>
      </div>
      {filteredData.length !== 0 && (
        <div className={styles.search_result}>
          {filteredData.slice().map((value) => {
            return (
              <SalesCard
                id={value.id}
                data={value.data}
                nome={value.comprador.nome}
                sobrenome={value.comprador.sobrenome}
                telefone={value.dados.telefone}
                quantidade={value.itens.quantidade}
                total={value.total}
                pagamento={value.formaPagamento}
                key={value.id}
              />
            );
          })}
        </div>
      )
      }
      {sales.length === 0 && (
        <p>Não há vendas cadastradas!</p>
      )}
    </Container>
  )
}

export default Sales;