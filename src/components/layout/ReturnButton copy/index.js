import { Link } from 'react-router-dom'
import styles from './index.module.css'

import { BsPencil, BsFillTrashFill } from 'react-icons/bs'

function SearchButton({ click }) {
    return (
       <div className={styles.btn} onClick={click}>
        <BsPencil />
       </div>
    )
}

export default SearchButton