import { JSX } from "react";
import styles from "./Button.module.scss";

const Button = ({ style, type, width, height, text, className, action, disabled, icon }: {
    style: 'primary' | 'secondary' | { type: 'custom', color: string };
    type?: 'button' | 'submit' | 'reset';
    width?: number;
    height?: number;
    text: string;
    className?: string;
    action?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    icon?: JSX.Element
}) => {
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        if (action) {
            action(event)
        }
    }

    const customStyle =
        typeof style === 'object' && style.type === 'custom'
            ? { backgroundColor: style.color }
            : {};

    return (
        <>
            <button className={`${className} ${styles.styledButton} ${style == "primary" ? styles.primary : styles.secondary}`} type={type} style={{ width, height, ...customStyle }} onClick={handleClick} disabled={disabled}>
                <p>{text}</p>
                {icon && icon}
            </button>
        </>
    )
}

export default Button;