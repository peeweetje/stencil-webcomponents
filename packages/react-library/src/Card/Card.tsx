import React, { useEffect, useRef } from 'react';
import { defineCustomElements } from 'stencil-components/loader';
import './Card.scss';

// Declare custom web component types for TypeScript
declare global {
  interface HTMLPvCardComponentElement extends HTMLElement {
    heading: string;
    subtitle: string;
    imageSrc?: string;
    imageAlt: string;
    variant: 'default' | 'outlined' | 'elevated';
    padding: 'small' | 'medium' | 'large';
    clickable: boolean;
  }

  interface HTMLElementTagNameMap {
    'pv-card-component': HTMLPvCardComponentElement;
  }

  namespace JSX {
    interface IntrinsicElements {
      'pv-card-component': React.DetailedHTMLProps<React.HTMLAttributes<HTMLPvCardComponentElement>, HTMLPvCardComponentElement> & {
        heading?: string;
        subtitle?: string;
        'image-src'?: string;
        'image-alt'?: string;
        variant?: 'default' | 'outlined' | 'elevated';
        padding?: 'small' | 'medium' | 'large';
        clickable?: boolean;
        ref?: React.Ref<HTMLPvCardComponentElement>;
      };
    }
  }
}

export interface CardProps {
  /** Card heading displayed in the header */
  heading?: string;
  /** Card subtitle displayed below the heading */
  subtitle?: string;
  /** Image source displayed at the top of the card */
  imageSrc?: string;
  /** Alt text for the card image */
  imageAlt?: string;
  /** Card variant style */
  variant?: 'default' | 'outlined' | 'elevated';
  /** Card padding size */
  padding?: 'small' | 'medium' | 'large';
  /** If true, the card behaves as a clickable element */
  clickable?: boolean;
  /** Emitted when a clickable card is clicked */
  onCardClick?: (event: CustomEvent<MouseEvent>) => void;
  /** Card body content */
  children?: React.ReactNode;
  /** Custom header (overrides heading/subtitle) */
  header?: React.ReactNode;
  /** Custom media (overrides imageSrc) */
  media?: React.ReactNode;
  /** Footer actions */
  footer?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  heading = '',
  subtitle = '',
  imageSrc,
  imageAlt = '',
  variant = 'default',
  padding = 'medium',
  clickable = false,
  onCardClick,
  children,
  header,
  media,
  footer,
}) => {
  const cardRef = useRef<HTMLPvCardComponentElement>(null);

  useEffect(() => {
    defineCustomElements(window);
  }, []);

  useEffect(() => {
    const element = cardRef.current;
    if (!element || !onCardClick) return;
    const handler = (e: Event) => onCardClick(e as CustomEvent<MouseEvent>);
    element.addEventListener('cardClick', handler);
    return () => element.removeEventListener('cardClick', handler);
  }, [onCardClick]);

  return React.createElement(
    'pv-card-component',
    {
      ref: cardRef,
      heading,
      subtitle,
      'image-src': imageSrc,
      'image-alt': imageAlt,
      variant,
      padding,
      clickable,
    },
    media && React.createElement('div', { slot: 'media' }, media),
    header && React.createElement('div', { slot: 'header' }, header),
    children,
    footer && React.createElement('div', { slot: 'footer' }, footer),
  );
};
