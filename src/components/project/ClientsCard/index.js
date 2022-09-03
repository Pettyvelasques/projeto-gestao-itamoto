import styles from './index.module.css'

function ClientsCard({ id, nome, sobrenome, telefone, marca, modelo, cilindrada, ano }) {

    return (
        <div className={styles.search_card}>
            <p>{id}</p>
            <p>{nome}</p>
            <p>{sobrenome}</p>
            <p>{telefone}</p>
            <p>{marca}</p>
            <p>{modelo}</p>
            <p>{cilindrada}</p>
            <p>{ano}</p>
        </div>
    )
}

export default ClientsCard