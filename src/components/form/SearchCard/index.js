import { Link } from 'react-router-dom'
import styles from './index.module.css'

import { BsSearch } from 'react-icons/bs'

function SearchCard({ id_place, id_item, a, b, c, d, e, f, g, h, i, j }) {

    return (
        <div className={styles.search_card}>
            {a ? <p>{a}</p> : ''}
            {b ? <p>{b}</p> : ''}
            {c ? <p>{c}</p> : ''}
            {d ? <p>{d}</p> : ''}
            {e ? <p>{e}</p> : ''}
            {f ? <p>{f}</p> : ''}
            {g ? <p>{g}</p> : ''}
            {h ? <p>{h}</p> : ''}
            {i ? <p>{i}</p> : ''}
            {j ? <p>{j}</p> : ''}
            <p>
                <Link to={`./${id_place}/${id_item}`}>
                    <BsSearch />
                </Link>
            </p>
        </div>
    )
}

export default SearchCard