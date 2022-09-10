import { Link } from 'react-router-dom'
import styles from './index.module.css'

import { BsSearch } from 'react-icons/bs'

function SalesCard({ id, data, nome, sobrenome, telefone, quantidade, preco, total, pagamento}) {

    return (
        <div className={styles.search_card}>
            <p>{data}</p>
            <p>{nome}</p>
            <p>{sobrenome}</p>
            <p>{telefone}</p>
            <p>{quantidade}</p>
            <p>{total}</p>
            <p>{pagamento}</p>
            <p>
                <Link to={`./vendas/${id}`}>
                    <BsSearch />
                </Link>
            </p>
        </div>
    )
}

export default SalesCard