
import styles from './index.module.css'

function SalesCard({ id, data, nome, sobrenome, telefone, quantidade, preco, total, pagamento}) {

    return (
        <div className={styles.search_card}>
            <p>{id}</p>
            <p>{data}</p>
            <p>{nome}</p>
            <p>{sobrenome}</p>
            <p>{telefone}</p>
            <p>{quantidade}</p>
            <p>{total}</p>
            <p>{pagamento}</p>
        </div>
    )
}

export default SalesCard