import React from "react"
import cx from "classnames"
import styles from "./Button.module.scss"

interface ButtonProps {
    children: React.ReactNode
    variant?: "primary"
    icon?: string
    size?: "sm" | "md" | "lg"
    disabled?: boolean
    className?: string
    handleOnClick?: () => void
    type?: "button" | "submit" | "link"
}

const Button: React.FC<ButtonProps> = ({ children, className, disabled, handleOnClick, variant = "primary" }) => {
    const classes = cx({
        [styles.btn]: true,
        [styles.btnPrimary]: variant === "primary",
        [styles.disabled]: disabled,
        [`${className}`]: className
    })
    return (
        <button className={classes} disabled={disabled} onClick={handleOnClick}>{children}</button>
    )
}

Button.defaultProps = {
    variant: "primary",
    children: null,
    disabled: false,
    type: "button"
}

export default Button 
