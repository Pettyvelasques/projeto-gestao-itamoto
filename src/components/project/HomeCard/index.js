import { Link } from 'react-router-dom'
import styles from './index.module.css'

//import { BsPencil, BsFillTrashFill } from 'react-icons/bs'

function HomeCard({ to, name, logo, alt }) {

    return (
        <Link className={styles.home_card} to={to}>
            <img src={logo} alt={alt} />
            <h4>{name}</h4>
        </Link>
    )
}

export default HomeCard