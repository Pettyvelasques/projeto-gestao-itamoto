import { Link } from 'react-router-dom'
import styles from './index.module.css'

function ReturnButton({ to, text}) {
    return (
       <Link className={styles.btn} to={to}>
        {text}
       </Link>
    )
}

export default ReturnButton