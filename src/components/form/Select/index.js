import styles from './index.module.css'

function Select({ text, nome, options, handleOnChange, value }) {
    return (
        <div className={styles.form_control}>
            <label htmlFor={nome}>{text}</label>
            <select name={nome} id={nome} onChange={handleOnChange} value={value || ''}>
                <option>Selecione uma opção</option>
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