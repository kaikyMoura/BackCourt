import { useEffect, useState } from "react";
import styles from "./styles.module.scss"

const Button = ({ style, type, width, height, text, className, action, disabled }: {
    style: 'primary' | 'secondary' | { type: 'custom', color: string };
    type?: 'button' | 'submit' | 'reset';
    width?: number;
    height?: number;
    text: string;
    className?: string;
    action?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean
}) => {
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        if (action) {
            action(event)
        }
    }

    return (
        <>
            <button className={`${className} ${styles.styledButton} ${style == "primary" ? styles.primary : styles.secondary}`} type={type} style={{ width: width, height: height }} onClick={handleClick} disabled={disabled}>
                <p>{text}</p>
            </button>
        </>
    )
}

export default Button;