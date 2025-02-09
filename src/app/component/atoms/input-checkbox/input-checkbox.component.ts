import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input-checkbox',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './input-checkbox.component.html'
})
export class InputCheckboxComponent{

  /**
   * @property a list of items in the grid
   */
  @Input()
  public items: Array<{ key: string; value: string; checked?: boolean; label?: string; disabled?: boolean }>;

  @Input()
  columnFilterField: Object;

  @Output()
  valueChange = new EventEmitter();

  onItemChanged(item: any) {
    item.checked = !item.checked;
    this.valueChange.emit({columnFilterField: this.columnFilterField, value: item});
  }

}
