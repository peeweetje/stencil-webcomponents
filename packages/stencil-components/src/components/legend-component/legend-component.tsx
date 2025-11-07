import { Component, Prop, Host, h } from '@stencil/core';

export interface LegendItem {
  label: string;
  color: string;
}

@Component({
  tag: 'pv-legend-component',
  styleUrl: 'legend-component.scss',
  shadow: true,
})
export class LegendComponent {
  /**
   * The legend items
   */
  @Prop() items: LegendItem[] | string;

  /**
   * The legend title
   */
  @Prop() legendTitle?: string;

  private getItems(): LegendItem[] {
    if (typeof this.items === 'string') {
      try {
        return JSON.parse(this.items);
      } catch {
        return [];
      }
    }
    return this.items || [];
  }

  render() {
    const items = this.getItems();

    return (
      <Host>
        <div class="legend">
          {this.legendTitle && <h4 class="legend-title">{this.legendTitle}</h4>}
          <div class="legend-items">
            {items.map((item, index) => (
              <div key={index} class="legend-item">
                <span
                  class="legend-color"
                  style={{ backgroundColor: item.color }}
                ></span>
                <span class="legend-label">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </Host>
    );
  }
}
