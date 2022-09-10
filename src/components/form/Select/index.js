import styles from './index.module.css'

function Select({ text, nome, options, handleOnChange, value, disabled }) {
    return (
        <div className={styles.form_control}>
            <select name={nome} id={nome} onChange={handleOnChange} value={value || ''} disabled={disabled}>
                <option> {text} </option>
                {options.map((option) => (
                    <option value={option.id} key={option.id}>
                        {option.nome}
                        </option>
                ))}
            </select>
        </div>
    )
}

export default Select