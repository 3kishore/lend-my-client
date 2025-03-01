import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IIndicationBadge } from './indication-badge.interface';

@Component({
  selector: 'app-indication-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './indication-badge.component.html'
})
export class IndicationBadgeComponent {

  @Input()
  config: IIndicationBadge;
}
