import styles from './index.module.css'

function Input({ type, name, placeholder, handleOnChange, value, disabled }) {
    return (
        <div className={styles.form_control}>
            <input
                type={type}
                name={name}
                id={name}
                placeholder={placeholder}
                onChange={handleOnChange}
                value={value} 
                disabled={disabled} />
        </div>
    )
}

export default Input