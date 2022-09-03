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
                        <Link to="/pecas">Peças</Link>
                    </li>
                    <li className={styles.item}>
                        <Link to="/clientes">Clientes</Link>
                    </li>
                    <li className={styles.item}>
                        <Link to="/vendas">Vendas</Link>
                    </li>
                </ul>
            </Container>
        </nav>
    )
}


export default Navbar   