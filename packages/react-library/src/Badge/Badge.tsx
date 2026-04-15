import React from 'react';
import './Badge.scss';

export interface BadgeProps {
  /**
   * The badge variant style
   */
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'success' | 'warning';

  /**
   * The badge size
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * If true, the badge will be rounded
   */
  rounded?: boolean;

  /**
   * If true, the badge will be filled
   */
  filled?: boolean;

  /**
   * The badge content
   */
  children?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'primary',
  size = 'medium',
  rounded = false,
  filled = true,
  children,
}) => {
  const badgeClasses = [
    'badge',
    `badge-${variant}`,
    `badge-${size}`,
rounded ? 'badge-rounded' : '',
    filled ? '' : 'badge-outline',
  ].filter(Boolean).join(' ');

  return (
    <span className={badgeClasses}>
      {children}
    </span>
  );
};