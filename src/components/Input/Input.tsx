import { ChangeEventHandler, MouseEventHandler, useState } from 'react';
import { FaLock, FaUnlock } from 'react-icons/fa6';
import styles from './Input.module.scss';

const Input = ({ onClick, onChange, type, label, placeholder, value, maxLength, accept }: {
    onClick?: MouseEventHandler<HTMLInputElement> | undefined;
    onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
    label?: string;
    value?: string | undefined;
    placeholder: string;
    type: "text" | "password" | "email" | "number" | "file";
    maxLength?: number;
    accept?: string
}) => {
    const [changeIcon, setChangeIcon] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    let icon
    if (type === "password") {
        icon = <FaLock fontSize={22} color='#fff' />;
    } else {
        icon = null;
    }

    const handleIconChange = (event: { preventDefault: () => void; }) => {
        event.preventDefault()
        if (changeIcon == false) {
            setShowPassword(true)
            setChangeIcon(true)
        }
        else {
            setShowPassword(false)
            setChangeIcon(false)
        }
    }

    return (
        <div className={`${styles.inputButton}`}>
            <label>{label}</label>
            <input className={`${styles.input}`} type={type === "password" && showPassword ? "text" : type}
                onClick={onClick} placeholder={placeholder} onChange={onChange} value={value} maxLength={maxLength} accept={accept} />
            {type === "password" && (
                <>
                    {!changeIcon ?
                        <button className='' onClick={handleIconChange}>
                            <i>{icon}</i>
                        </button>
                        :
                        <button className='' onClick={handleIconChange}>
                            <i>{icon = <FaUnlock fontSize={22} color='#fff' />}</i>
                        </button>
                    }
                </>
            )}
        </div>
    )
}

export default Input;