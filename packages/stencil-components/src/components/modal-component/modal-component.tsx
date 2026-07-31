import { Component, Prop, State, h, Event, EventEmitter, Watch, Method } from '@stencil/core';

@Component({
  tag: 'pv-modal-component',
  styleUrl: 'modal-component.scss',
  shadow: true,
})
export class ModalComponent {
  /**
   * Controls if the modal is open
   */
  @Prop() isOpen: boolean = false;

  /**
   * Modal title displayed in header
   */
  @Prop() modalTitle: string = '';

  /**
   * If true, close button will be shown in header
   */
  @Prop() showCloseButton: boolean = true;

  /**
   * If true, clicking outside the modal will close it
   */
  @Prop() closeOnBackdropClick: boolean = true;

  /**
   * If true, pressing escape key will close the modal
   */
  @Prop() closeOnEscape: boolean = true;

  /**
   * Modal size variant
   */
  @Prop() size: 'small' | 'medium' | 'large' | 'fullscreen' = 'medium';

  /**
   * Emitted when modal is opened
   */
  @Event() modalOpen!: EventEmitter<void>;

  /**
   * Emitted when modal is closed
   */
  @Event() modalClose!: EventEmitter<void>;

  @State() visible: boolean = false;
  @State() animating: boolean = false;

  @Watch('isOpen')
  handleIsOpenChange(newValue: boolean) {
    if (newValue) {
      this.open();
    } else {
      this.close();
    }
  }

  componentDidLoad() {
    if (this.isOpen) {
      this.visible = true;
    }
  }

  /**
   * Programmatically open the modal
   */
  @Method()
  async open() {
    this.visible = true;
    this.animating = true;
    this.modalOpen.emit();
    
    setTimeout(() => {
      this.animating = false;
    }, 300);
  }

  /**
   * Programmatically close the modal
   */
  @Method()
  async close() {
    this.animating = true;
    
    setTimeout(() => {
      this.visible = false;
      this.animating = false;
      this.modalClose.emit();
    }, 300);
  }

  handleBackdropClick = () => {
    if (this.closeOnBackdropClick && !this.animating) {
      this.close();
    }
  }

  handleCloseClick = () => {
    if (!this.animating) {
      this.close();
    }
  }

  handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && this.closeOnEscape && !this.animating) {
      this.close();
    }
  }

  render() {
    if (!this.visible && !this.animating) {
      return null;
    }

    const modalClasses = {
      'modal': true,
      'modal-open': this.visible,
      'modal-animating': this.animating,
      [`modal-${this.size}`]: true,
    };

    return (
      <div class="modal-overlay" onClick={this.handleBackdropClick} onKeyDown={this.handleKeyDown} tabIndex={-1}>
        <div class={modalClasses} onClick={e => e.stopPropagation()}>
          {this.modalTitle || this.showCloseButton ? (
            <div class="modal-header">
              {this.modalTitle ? <h3 class="modal-title">{this.modalTitle}</h3> : <div />}
              {this.showCloseButton ? (
                <button class="modal-close" onClick={this.handleCloseClick} aria-label="Close modal">
                  ×
                </button>
              ) : null}
            </div>
          ) : null}
          
          <div class="modal-body">
            <slot />
          </div>

          <div class="modal-footer">
            <slot name="footer" />
          </div>
        </div>
      </div>
    );
  }
}