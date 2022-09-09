import { Link } from 'react-router-dom'

import styles from './index.module.css'
import Container from '../Container/index'

import Logo from '../../../img/itamoto_logo.png'

function Navbar() {
    return (
        <nav className={styles.navbar}>
            <Container>
                <Link to="/">
                    <img src={Logo} alt="Mechanic Tools Logo" />
                </Link>
                <ul className={styles.list}>
                    <li className={styles.item}>
                        <Link to="/">Home</Link>
                    </li>
                    <li className={styles.item}>
                        <Link to="/pieces">Peças</Link>
                    </li>
                    <li className={styles.item}>
                        <Link to="/clients">Clientes</Link>
                    </li>
                    <li className={styles.item}>
                        <Link to="/sales">Vendas</Link>
                    </li>
                </ul>
            </Container>
        </nav>
    )
}


export default Navbar   