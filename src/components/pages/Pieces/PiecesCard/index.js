import { Link } from 'react-router-dom'
import styles from './index.module.css'

import { BsSearch } from 'react-icons/bs'

function PiecesCard({ id, nome, fabricante, marca, modelo, cilindrada, de, ate }) {

    return (
        <div className={styles.search_card}>
            <p>{nome}</p>
            <p>{fabricante}</p>
            <p>{marca}</p>
            <p>{modelo}</p>
            <p>{cilindrada}</p>
            <p>{de}</p>
            <p>{ate}</p>
            <p>
                <Link to={`./pecas/${id}`}>
                    <BsSearch />
                </Link>
            </p>
        </div>
    )
}

export default PiecesCard