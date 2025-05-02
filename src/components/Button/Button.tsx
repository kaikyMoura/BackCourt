import { JSX } from "react";
import styles from "./Button.module.scss";

const Button = ({ children, style, type, width, height, text, className, action, disabled, icon }: {
    children?: React.ReactNode;
    style: 'primary' | 'secondary' | { type: 'custom', backgroundColor:string, color: string };
    type?: 'button' | 'submit' | 'reset';
    width?: number;
    height?: number;
    text?: string;
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
            ? { backgroundColor: style.backgroundColor, color: style.color }
            : {};

    return (
        <>
            <button className={`${className} ${styles.styledButton} ${style == "primary" ? styles.primary : styles.secondary}`} type={type} style={{ width, height, ...customStyle }} onClick={handleClick} disabled={disabled}>
                {text || icon ?
                    <>
                        <p>{text}</p>
                        {icon && icon}
                    </>
                    :
                    <>
                        {children}
                    </>
                }
            </button>
        </>
    )
}

export default Button;