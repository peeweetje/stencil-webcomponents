import { Component, Prop, h, Event, EventEmitter, Host } from '@stencil/core';

@Component({
  tag: 'pv-card-component',
  styleUrl: 'card-component.scss',
  shadow: true,
})
export class CardComponent {
  /**
   * The card heading displayed in the header
   */
  @Prop() heading: string = '';

  /**
   * The card subtitle displayed below the heading
   */
  @Prop() subtitle: string = '';

  /**
   * Image source displayed at the top of the card
   */
  @Prop() imageSrc?: string;

  /**
   * Alt text for the card image
   */
  @Prop() imageAlt: string = '';

  /**
   * The card variant style
   */
  @Prop() variant: 'default' | 'outlined' | 'elevated' = 'default';

  /**
   * The card padding size
   */
  @Prop() padding: 'small' | 'medium' | 'large' = 'medium';

  /**
   * If true, the card behaves as a clickable element
   */
  @Prop() clickable: boolean = false;

  /**
   * Emitted when a clickable card is clicked
   */
  @Event() cardClick!: EventEmitter<MouseEvent>;

  private handleClick = (event: MouseEvent) => {
    if (this.clickable) {
      this.cardClick.emit(event);
    }
  };

  private handleKeyDown = (event: KeyboardEvent) => {
    if (this.clickable && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      (event.target as HTMLElement).click();
    }
  };

  render() {
    const cardClasses = {
      card: true,
      [`card-${this.variant}`]: true,
      [`card-padding-${this.padding}`]: true,
      'card-clickable': this.clickable,
    };

    return (
      <Host>
        <article
          class={cardClasses}
          onClick={this.handleClick}
          onKeyDown={this.handleKeyDown}
          tabindex={this.clickable ? 0 : undefined}
          role={this.clickable ? 'button' : undefined}
        >
          {this.imageSrc ? (
            <div class="card-media">
              <slot name="media">
                <img class="card-image" src={this.imageSrc} alt={this.imageAlt} />
              </slot>
            </div>
          ) : (
            <slot name="media" />
          )}
          {this.heading || this.subtitle ? (
            <div class="card-header">
              <slot name="header">
                {this.heading ? <h3 class="card-heading">{this.heading}</h3> : null}
                {this.subtitle ? <p class="card-subtitle">{this.subtitle}</p> : null}
              </slot>
            </div>
          ) : (
            <slot name="header" />
          )}
          <div class="card-body">
            <slot />
          </div>
          <div class="card-footer">
            <slot name="footer" />
          </div>
        </article>
      </Host>
    );
  }
}
