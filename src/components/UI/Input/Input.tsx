import styles from "./Input.module.scss"
import cx from 'classnames'

interface InputProps {
    name: string;
    type: string;
    value: string;
    error: boolean
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

}

const Input: React.FC<InputProps> = ({ name, type, value, onChange, error = false }) => {
    const classes = cx({
        [styles.Input]: true,
        [styles.Error]: error
    })
    return (
        <>
            <label className={styles.Label} htmlFor={name}>{name}</label>
            <input className={classes} name={name} id={name} type={type} value={value} onChange={onChange} />
        </>
    )

}

export default Input;