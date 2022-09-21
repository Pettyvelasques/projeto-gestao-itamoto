import { useLocation } from "react-router-dom"
import { useState, useEffect } from "react";

import styles from './index.module.css'
import SearchCard from "../../../form/SearchCard";
import Container from "../../../layout/Container";
import LinkButton from "../../../layout/LinkButton";
import Message from "../../../layout/Message";
import Login from "../../Login/LoginMain";

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

  const handleOnChange = (a) => {
    const searchWord = a.target.value
    setWordEntered(searchWord)
    const newFilter = pieces.filter((value) => {
      return (
        value.nome.toLowerCase().includes(searchWord.toLowerCase())
        || value.fabricante.toLowerCase().includes(searchWord.toLowerCase())
        || value.marca.nome.toLowerCase().includes(searchWord.toLowerCase())
        || value.modelo.toLowerCase().includes(searchWord.toLowerCase())
        || value.cilindrada.toLowerCase().includes(searchWord.toLowerCase())
      )
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

  function capitalizeFirstLetter(b) {
    return b.charAt(0).toUpperCase() + b.slice(1);
  }

  var userLoginValue = sessionStorage.getItem("userLogin");

  function closeModal() {
    userLoginValue = true
    sessionStorage.setItem("userLogin", userLoginValue);
  }

  return (
    <>
      {userLoginValue ? (
        <Container customClass="start" >
          <div className={styles.modal_container}>
            <Login closeModal={closeModal} />
          </div>
        </Container>
      ) : (
        <Container customClass="start">
          <div className={styles.search_container}>
            <input type="search"
              placeholder="Digite para pesquisar"
              onChange={handleOnChange}
              value={wordEntered}
            />
            <LinkButton to="/newclient" text="+" />
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

          {
            filteredData.length !== 0 && (
              <div className={styles.search_result}>
                {filteredData.slice().sort(setOrderModel).map((value) => {
                  return (
                    <SearchCard
                      id_place="pecas"
                      id_item={value.id}
                      a={value.nome.split(' ').map(capitalizeFirstLetter).join(' ')}
                      b={value.fabricante.split(' ').map(capitalizeFirstLetter).join(' ')}
                      c={value.marca.nome}
                      d={value.modelo.split(' ').map(capitalizeFirstLetter).join(' ')}
                      e={value.cilindrada}
                      f={value.anoInicial}
                      g={value.anoFinal}
                      key={value.id}
                    />
                  );
                })}
              </div>
            )
          }
          {
            pieces.length === 0 && (
              <p>Não há peças cadastradas!</p>
            )
          }
        </Container >
      )
      }
    </>
  )
}

export default Pieces;