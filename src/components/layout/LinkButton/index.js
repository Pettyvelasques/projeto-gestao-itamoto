import { Link } from 'react-router-dom'
import styles from './index.module.css'

function LinkButton({ to, onClick, text}) {
    return (
       <Link className={styles.btn} onClick={onClick} to={to}>
        {text}
       </Link>
    )
}

export default LinkButton