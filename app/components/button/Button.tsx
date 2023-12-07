import styles from "./buton.module.scss";

type ButtonProps = {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
};
export default function Button({ text, onClick, disabled }: ButtonProps) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`${styles.button} ${
        disabled && text === "Show more" && styles.hidden
      }`}
    >
      {text}
    </button>
  );
}
