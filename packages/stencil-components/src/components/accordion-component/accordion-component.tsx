import { Component, Prop, Host, h, State, Event, EventEmitter } from '@stencil/core';

export interface AccordionItem {
  header: string;
  content: string;
}

@Component({
  tag: 'pv-accordion-component',
  styleUrl: 'accordion-component.scss',
  shadow: true,
})
export class AccordionComponent {
  /**
   * The accordion items
   */
  @Prop() items: AccordionItem[] | string;

  /**
   * Allow multiple sections to be open at the same time
   */
  @Prop() allowMultiple: boolean = false;

  @Event() accordionChange: EventEmitter;

  @State() openSections: number[] = [];

  private parseItems(): AccordionItem[] {
    if (typeof this.items === 'string') {
      try {
        return JSON.parse(this.items);
      } catch {
        return [];
      }
    }
    return this.items || [];
  }

  private toggleSection(index: number) {
    const isOpen = this.openSections.includes(index);

    if (this.allowMultiple) {
      if (isOpen) {
        this.openSections = this.openSections.filter(i => i !== index);
      } else {
        this.openSections = [...this.openSections, index];
      }
    } else {
      // If single mode, clicking an open one closes it, clicking a closed one opens it and closes others
      if (isOpen) {
        this.openSections = [];
      } else {
        this.openSections = [index];
      }
    }

    this.accordionChange.emit({
      openSections: this.openSections,
      toggledIndex: index,
      isOpen: !isOpen
    });
  }

  render() {
    const items = this.parseItems();

    return (
      <Host>
        <div class="accordion">
          {items.map((item, index) => {
            const isOpen = this.openSections.includes(index);
            return (
              <div class={{ 'accordion-item': true, 'is-open': isOpen }} key={index}>
                <button
                  class="accordion-header"
                  onClick={() => this.toggleSection(index)}
                  aria-expanded={isOpen ? 'true' : 'false'}
                >
                  <span class="header-text">{item.header}</span>
                  <span class="accordion-icon">{isOpen ? '−' : '+'}</span>
                </button>
                <div
                  class="accordion-content"
                  hidden={!isOpen}
                  role="region"
                >
                  <div class="content-inner">{item.content}</div>
                </div>
              </div>
            );
          })}
        </div>
      </Host>
    );
  }
}
