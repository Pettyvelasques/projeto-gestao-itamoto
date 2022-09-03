import { useState, useEffect } from "react";
import SalesCard from "../../project/SalesCard";
import Container from "../../layout/Container";
import Loading from "../../layout/Loading"

import styles from './index.module.css'

function Vendas() {
  const [sales, setSales] = useState({})
  const [removeLoading, setRemoveLoading] = useState()
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
            setRemoveLoading(true)
          })
          .catch((err) => console.log(err))
      }, 300)
  }, [])

  const handleOnChange = (e) => {
    const searchWord = e.target.value
    setWordEntered(searchWord)
    const newFilter = sales.filter((value) => {
      return value.nome.toLowerCase().includes(searchWord.toLowerCase())
    })

    if (searchWord === "") {
      setFilteredData(sales)
    } else {
      setFilteredData(newFilter)
    }
  }

  return (
    <Container customClass="start">
      <div className="search_container">
        <input type="search"
          placeholder="Digite para pesquisar"
          onChange={handleOnChange}
          value={wordEntered}
        />
      </div>
      <div className={styles.index_result}>
        <SalesCard
          id="Id"
          data="Data"
          nome="Nome"
          sobrenome="Sobrenome"
          telefone="Telefone"
          quantidade="Total de Itens"
          total="Valor Total"
          pagamento="Forma de Pagamento"
        />
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
              />
            );
          })}
        </div>
      )
      }
      {!removeLoading && <Loading />}
      {removeLoading && sales.length === 0 && (
        <p>Não há vendas cadastradas!</p>
      )}
    </Container>
  )
}

export default Vendas;