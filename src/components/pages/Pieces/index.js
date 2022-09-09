import { useLocation } from "react-router-dom"

import { useState, useEffect } from "react";

import styles from './index.module.css'
import Message from "../../layout/Message";
import PiecesCard from "../../project/cards/PiecesCard";
import Container from "../../layout/Container";
import LinkButton from "../../layout/LinkButton";

function Pieces() {
  const [pieces, setPieces] = useState({})
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
            setPieces(data.sort())
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

  const setOrderModel = (x , y) => {
    let a = x.modelo.toUpperCase(),
    b = y.modelo.toUpperCase();

    return a == b ? 0 : a > b ? 1 : -1 ;
  }

  return (
    <Container customClass="start">
      <div className={styles.search_container}>
        <input type="text"
          placeholder="Digite para pesquisar"
          onChange={handleOnChange}
          value={wordEntered}
        />
        <LinkButton to="/newbuy" text="+" />
      </div>
      {message && <Message type={type} msg={message} />}

      <div className={styles.index_result}>
        <p> Nome </p>
        <p> Fabricante </p>
        <p> Marca </p>
        <p> Modelo </p>
        <p> Ano Inicial </p>
        <p> Ano Final </p>
        <p> Quantidade </p>
        <p> Preço </p>
        <p> Editar </p>
      </div>
      {filteredData.length !== 0 && (
        <div className={styles.search_result}>
          {filteredData.slice().sort(setOrderModel).map((value) => {
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