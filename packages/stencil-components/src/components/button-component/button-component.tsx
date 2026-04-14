import { Component, Prop, h, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'pv-button-component',
  styleUrl: 'button-component.scss',
  shadow: true,
})
export class ButtonComponent {
  /**
   * The button variant style
   */
  @Prop() variant: 'primary' | 'secondary' | 'outline' | 'danger' = 'primary';

  /**
   * The button size
   */
  @Prop() size: 'small' | 'medium' | 'large' = 'medium';

  /**
   * If true, the button is disabled
   */
  @Prop() disabled: boolean = false;

  /**
   * If true, the button will take full width of container
   */
  @Prop() fullWidth: boolean = false;

  /**
   * Emitted when the button is clicked
   */
  @Event() buttonClick!: EventEmitter<MouseEvent>;

  handleClick = (event: MouseEvent) => {
    if (!this.disabled) {
      this.buttonClick.emit(event);
    }
  }

  render() {
    const buttonClasses = {
      'btn': true,
      [`btn-${this.variant}`]: true,
      [`btn-${this.size}`]: true,
      'btn-disabled': this.disabled,
      'btn-full-width': this.fullWidth,
    };

    return (
      <button
        class={buttonClasses}
        disabled={this.disabled}
        onClick={this.handleClick}
      >
        <slot />
      </button>
    );
  }
}