import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'pv-badge-component',
  styleUrl: 'badge.scss',
  shadow: true,
})
export class Badge {
  /**
   * The badge variant style
   */
  @Prop() variant: 'primary' | 'secondary' | 'outline' | 'danger' | 'success' | 'warning' = 'primary';

  /**
   * The badge size
   */
  @Prop() size: 'small' | 'medium' | 'large' = 'medium';

  /**
   * If true, the badge will be rounded
   */
  @Prop({ reflect: true }) rounded: boolean = false;

  /**
   * If true, the badge will be filled
   */
  @Prop({ reflect: true }) filled: boolean = true;

  render() {
    const badgeClasses = [
      'badge',
      `badge-${this.variant}`,
      `badge-${this.size}`,
this.rounded ? 'badge-rounded' : '',
      this.filled ? '' : 'badge-outline',
    ].filter(Boolean).join(' ');

    return (
      <span class={badgeClasses}>
        <slot></slot>
      </span>
    );
  }
}