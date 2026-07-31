import React, { useEffect, useRef, useState } from 'react';
import { defineCustomElements } from 'stencil-components/loader';
import './Modal.scss';

// Declare custom web component types for TypeScript
declare global {
  interface HTMLPvModalComponentElement extends HTMLElement {
    open: () => void;
    close: () => void;
  }

  interface HTMLElementTagNameMap {
    'pv-modal-component': HTMLPvModalComponentElement;
  }

  namespace JSX {
    interface IntrinsicElements {
      'pv-modal-component': React.DetailedHTMLProps<React.HTMLAttributes<HTMLPvModalComponentElement>, HTMLPvModalComponentElement> & {
        'is-open'?: boolean;
        'title'?: string;
        'show-close-button'?: boolean;
        'close-on-backdrop-click'?: boolean;
        'close-on-escape'?: boolean;
        'size'?: 'small' | 'medium' | 'large' | 'fullscreen';
        ref?: React.Ref<HTMLPvModalComponentElement>;
      };
    }
  }
}

export interface ModalProps {
  /** Controls if the modal is open */
  isOpen: boolean;
  /** Modal title displayed in header */
  title?: string;
  /** If true, close button will be shown in header */
  showCloseButton?: boolean;
  /** If true, clicking outside the modal will close it */
  closeOnBackdropClick?: boolean;
  /** If true, pressing escape key will close it */
  closeOnEscape?: boolean;
  /** Modal size variant */
  size?: 'small' | 'medium' | 'large' | 'fullscreen';
  /** Emitted when modal is opened */
  onOpen?: () => void;
  /** Emitted when modal is closed */
  onClose?: () => void;
  /** Modal content */
  children: React.ReactNode;
  /** Modal footer content */
  footer?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  title = '',
  showCloseButton = true,
  closeOnBackdropClick = true,
  closeOnEscape = true,
  size = 'medium',
  onOpen,
  onClose,
  children,
  footer,
}) => {
  const modalRef = useRef<HTMLPvModalComponentElement>(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    defineCustomElements(window);
    setHasLoaded(true);
  }, []);

  useEffect(() => {
    if (modalRef.current && hasLoaded) {
      if (isOpen) {
        modalRef.current.open();
      } else {
        modalRef.current.close();
      }
    }
  }, [isOpen, hasLoaded]);

  useEffect(() => {
    const element = modalRef.current;
    if (!element) return;

    const handleOpen = () => onOpen?.();
    const handleClose = () => onClose?.();

    element.addEventListener('modalOpen', handleOpen);
    element.addEventListener('modalClose', handleClose);

    return () => {
      element.removeEventListener('modalOpen', handleOpen);
      element.removeEventListener('modalClose', handleClose);
    };
  }, [onOpen, onClose]);

  if (!hasLoaded) return null;

  // Use createElement to avoid TypeScript JSX IntrinsicElements errors for custom elements
  return React.createElement(
    'pv-modal-component',
    {
      ref: modalRef,
      'is-open': isOpen,
      title: title,
      'show-close-button': showCloseButton,
      'close-on-backdrop-click': closeOnBackdropClick,
      'close-on-escape': closeOnEscape,
      size: size,
    },
    children,
    footer && <div slot="footer">{footer}</div>
  );
};