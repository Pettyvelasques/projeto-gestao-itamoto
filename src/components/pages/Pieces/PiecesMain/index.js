import { useLocation } from "react-router-dom"
import { useState, useEffect } from "react";

import styles from './index.module.css'
import PiecesCard from "../PiecesCard"
import Container from "../../../layout/Container";
import LinkButton from "../../../layout/LinkButton";
import Message from "../../../layout/Message";

function Pieces() {
  const [pieces, setPieces] = useState([])
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const location = useLocation()
  let message = ''
  let type = ''
  if (location.state) {
    message = location.state.message
    type = location.state.type
  }

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

  const setOrderModel = (x, y) => {
    let a = x.modelo.toUpperCase(),
      b = y.modelo.toUpperCase();

    return a === b ? 0 : a > b ? 1 : -1;
  }

  function capitalizeFirstLetter(a) {
    return a.charAt(0).toUpperCase() + a.slice(1);
  }

  return (
    <Container customClass="start">
      <div className={styles.search_container}>
        <input type="search"
          placeholder="Digite para pesquisar"
          onChange={handleOnChange}
          value={wordEntered}
        />
        <LinkButton to="/newpiece" text="+" />
      </div>
      {message && <Message type={type} msg={message} />}

      <div className={styles.index_result}>
        <p> Nome </p>
        <p> Fabricante </p>
        <p> Marca </p>
        <p> Modelo </p>
        <p> Cilindrada </p>
        <p> Ano Inicial </p>
        <p> Ano Final </p>
        <p>  </p>
      </div>

      {filteredData.length !== 0 && (
        <div className={styles.search_result}>
          {filteredData.slice().sort(setOrderModel).map((value) => {
            return (
              <PiecesCard
                id={value.id}
                nome={capitalizeFirstLetter(value.nome)}
                fabricante={capitalizeFirstLetter(value.fabricante)}
                marca={value.marca.nome}
                modelo={capitalizeFirstLetter(value.modelo)}
                cilindrada={value.cilindrada}
                de={value.anoInicial}
                ate={value.anoFinal}
                quantidade={value.quantidade}
                preco={value.preco}
                key={value.id}
              />
            );
          })}
        </div>
      )
      }
      {pieces.length === 0 && (
        <p>Não há peças cadastradas!</p>
      )}
    </Container>
  )
}

export default Pieces;