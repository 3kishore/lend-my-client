import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IFormInputText } from './input-text.interface';
import { CommonModule } from '@angular/common';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-input-text',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './input-text.component.html'
})
export class InputTextComponent implements OnInit {

  @Input()
  inputConfig!: IFormInputText;

  @Output()
  valueChange = new EventEmitter();

  @Input()
  columnFilterField!: Object;

  @Input()
  value!: String | Number;

  ngOnInit(): void {
    this.inputConfig.formControl.setValue(this.value ? this.value : '');
    this.inputConfig.formControl.valueChanges
      .pipe(
        debounceTime(600),
        distinctUntilChanged()
      )
      .subscribe((value: any) => {
        this.valueChange.emit({ filterField: this.columnFilterField, value: value });
      });
  }

}
