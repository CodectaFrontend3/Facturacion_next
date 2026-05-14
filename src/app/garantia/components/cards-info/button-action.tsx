import { ReactNode } from "react"
import { ButtonProps } from "react-day-picker";

export function Button({
    children,
    className = ``,
    onClick
}: ButtonProps) {
    return (
    <button 
      className={`btn-base ${className}`} 
      onClick={onClick}
    >
      {children}
    </button>
  );
}
