
import styles from './index.module.css'

function PiecesCard({ id, nome, fabricante, marca, modelo, de, ate, quantidade, preco, key }) {

    return (
        <div className={styles.search_card}>
            <p>{id}</p>
            <p>{nome}</p>
            <p>{fabricante}</p>
            <p>{marca}</p>
            <p>{modelo}</p>
            <p>{de}</p>
            <p>{ate}</p>
            <p>{quantidade}</p>
            <p>{preco}</p>
        </div>
    )
}

export default PiecesCard