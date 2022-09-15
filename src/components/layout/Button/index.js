import styles from './index.module.css'

function Button({ to, onClick, text}) {
    return (
       <button className={styles.btn} onClick={onClick} to={to}>
        {text}
       </button>
    )
}

export default Button