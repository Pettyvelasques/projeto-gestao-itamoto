import { useState, useEffect } from "react";
import PiecesCard from "../../project/PiecesCard";
import Container from "../../layout/Container";
import Loading from "../../layout/Loading"

import styles from './index.module.css'

function Pecas() {
  const [pieces, setPieces] = useState({})
  const [removeLoading, setRemoveLoading] = useState()
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  useEffect(() => {
    setTimeout(
      () => {
        fetch("http://localhost:5000/pecas", {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
          },
        })
          .then(resp => resp.json())
          .then(data => {
            setPieces(data)
            setFilteredData(data)
            setRemoveLoading(true)
          })
          .catch((err) => console.log(err))
      }, 300)
  }, [])

  const handleOnChange = (e) => {
    const searchWord = e.target.value
    setWordEntered(searchWord)
    const newFilter = pieces.filter((value) => {
      return value.nome.toLowerCase().includes(searchWord.toLowerCase())
    })

    if (searchWord === "") {
      setFilteredData(pieces)
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
        <PiecesCard
          id="Id"
          nome="Nome"
          fabricante="Fabricante"
          marca="Marca"
          modelo="Modelo"
          de="Ano Inicial"
          ate="Ano Final"
          quantidade="Quantidade"
          preco="Preço"
        />
      </div>
      {filteredData.length !== 0 && (
        <div className={styles.search_result}>
          {filteredData.slice().map((value) => {
            return (
              <PiecesCard
                id={value.id}
                nome={value.nome}
                fabricante={value.fabricante}
                marca={value.marca.nome}
                modelo={value.modelo}
                de={value.anoInicial}
                ate={value.anoFinal}
                quantidade={value.quantidade}
                preco={value.preco}
              />
            );
          })}
        </div>
      )
      }
      {!removeLoading && <Loading />}
      {removeLoading && pieces.length === 0 && (
        <p>Não há peças cadastradas!</p>
      )}
    </Container>
  )
}

export default Pecas;