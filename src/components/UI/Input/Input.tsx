import styles from './Input.module.scss';
import cx from 'classnames';

interface InputProps {
  name: string;
  type: string;
  value?: string;
  error?: boolean;
  labelText?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  mode?: 'controlled' | 'uncontrolled';
}

const Input: React.FC<InputProps> = ({
  name,
  type,
  value,
  labelText,
  onChange,
  error = false,
  mode = 'controlled',
}) => {
  const classes = cx({
    [styles.Input]: true,
    [styles.Error]: error,
  });
  const getInput = () => {
    if (type === 'textarea') {
      return <textarea className={classes} name={name} />;
    }
    if (mode === 'controlled') {
      return (
        <input
          className={classes}
          name={name}
          id={name}
          type={type}
          value={value}
          onChange={onChange}
        />
      );
    }
    return <input className={classes} name={name} id={name} type={type} />;
  };
  return (
    <>
      <label className={styles.Label} htmlFor={name}>
        {labelText ? labelText : name}
      </label>
      {getInput()}
    </>
  );
};

export default Input;
