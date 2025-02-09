import { Component, Input } from '@angular/core';
import { IEmpty } from './error-state.interface';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EErrorState } from './error-state.enum';

@Component({
  selector: 'app-error-state',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './error-state.component.html',
})
export class ErrorStateComponent {
  @Input()
  config!: IEmpty;

  errorState = EErrorState;
}
