import { Link } from 'react-router-dom'
import styles from './index.module.css'

import { BsPencil, BsFillTrashFill } from 'react-icons/bs'

function PiecesCard({ id, nome, fabricante, marca, modelo, de, ate, quantidade, preco }) {

    return (
        <div className={styles.search_card}>
            <p>{nome}</p>
            <p>{fabricante}</p>
            <p>{marca}</p>
            <p>{modelo}</p>
            <p>{de}</p>
            <p>{ate}</p>
            <p>{quantidade}</p>
            <p>{preco}</p>
            <p>
                <Link to={`./pecas/${id}`}>
                    <BsPencil />
                </Link>
            </p>
        </div>
    )
}

export default PiecesCard