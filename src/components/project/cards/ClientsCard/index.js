import { Link } from 'react-router-dom'
import styles from './index.module.css'

import { BsPencil, BsFillTrashFill } from 'react-icons/bs'

function ClientsCard({ id, nome, sobrenome, telefone, marca, modelo, cilindrada, ano }) {

    return (
        <div className={styles.search_card}>
            <p>{nome}</p>
            <p>{sobrenome}</p>
            <p>{telefone}</p>
            <p>{marca}</p>
            <p>{modelo}</p>
            <p>{cilindrada}</p>
            <p>{ano}</p>
            <p>
                <Link to={`./clientes/${id}`}>
                    <BsPencil />
                </Link>
            </p>
        </div>
    )
}

export default ClientsCard