import React from 'react';
import './Button.scss';

export interface ButtonProps {
  /**
   * The button variant style
   */
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';

  /**
   * The button size
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * If true, the button is disabled
   */
  disabled?: boolean;

  /**
   * If true, the button will take full width of container
   */
  fullWidth?: boolean;

  /**
   * Emitted when the button is clicked
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  disabled = false,
  fullWidth = false,
  onClick,
  children,
}) => {
  const buttonClasses = [
    'btn',
    `btn-${variant}`,
    `btn-${size}`,
    disabled ? 'btn-disabled' : '',
    fullWidth ? 'btn-full-width' : '',
  ].filter(Boolean).join(' ');

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled && onClick) {
      onClick(event);
    }
  };

  return (
    <button
      className={buttonClasses}
      disabled={disabled}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};