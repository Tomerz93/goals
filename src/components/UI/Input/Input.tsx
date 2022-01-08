import styles from './Input.module.scss';
import cx from 'classnames';
import type { UseFormRegister, FieldValues } from 'react-hook-form/dist/types';

interface InputProps {
  name: string;
  type: string;
  value?: string;
  error?: boolean;
  labelText?: string;
  required?: boolean;
  register?: UseFormRegister<FieldValues>;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  mode?: 'controlled' | 'uncontrolled';
  explanation?: string;
  validation?: {
    required?: boolean | string;
    getIsMinLength?: (val: string) => string | boolean;
  };
}

const Input: React.FC<InputProps> = ({
  name,
  type,
  value,
  labelText,
  onChange,
  error = false,
  mode = 'controlled',
  register,
  explanation,
  validation,
}) => {
  const classes = cx({
    [styles.Input]: true,
    [styles.Error]: error,
    [styles.textArea]: type === 'textarea',
    [styles.explanation]: true,
  });
  const { required, ...validationFunc } = validation ?? {};
  const getInput = () => {
    if (type === 'textarea') {
      return (
        <textarea
          rows={4}
          className={classes}
          name={name}
          {...register(name, {
            required,
            validate: {
              ...validationFunc,
            },
          })}
        />
      );
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
    if (!register) return null;
    return (
      <input
        {...register(name, {
          required,
          validate: {
            ...validationFunc,
          },
        })}
        className={classes}
        name={name}
        id={name}
        type={type}
      />
    );
  };
  return (
    <div>
      <label className={styles.Label} htmlFor={name}>
        {labelText ? labelText : name}
      </label>
      {explanation && (
        <p className={`${styles.explanation} mb-1`}>{explanation}</p>
      )}
      {getInput()}
    </div>
  );
};

export default Input;
