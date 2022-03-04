import styles from './FormLabelDescription.module.scss';

interface FormLabelDescriptionProps {
  title: string;
  description: string;
}
const FormLabelDescription: React.FC<FormLabelDescriptionProps> = ({
  title,
  description,
}) => (
  <div className={styles.formLabelDescription}>
    <h6>{title}</h6>
    <p>{description}</p>
  </div>
);

export default FormLabelDescription;
