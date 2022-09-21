
import Container from "../../../layout/Container";

import styles from './index.module.css'
import Logo from '../../../../img/itamoto_logo.png'

function Sales() {
  return (
    <Container customClass="start">
      <div className={styles.sales_container}>
        <h1>
          <img src={Logo} alt="Logo Oficina Itamoto" />
        </h1>
        <br />
        <h1>PÁGINA EM CONSTRUÇÃO!</h1>
      </div>
    </Container>
  )
}

export default Sales;