const InputError: React.FC<{ message: string }> = ({ message }) =>
  message ? (
    <span
      className="my-2"
      style={{
        display: 'block',
        color: 'var(--danger)',
        fontSize: 'var(--fs-300)',
      }}
    >
      {message}
    </span>
  ) : null;
export default InputError;
