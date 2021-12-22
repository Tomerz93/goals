import React from "react"

interface ButtonProps {
    title: string
    variant?: "primary"
}

const Button: React.FC<ButtonProps> = ({ title, ...rest }) => <button {...rest}>{title}</button>

export default Button 
