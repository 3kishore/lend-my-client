import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IBadge } from './IBadge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EIconAlignment } from './icon-alignment.enum';
import { EBadgeType } from './badge-type.enum';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [CommonModule, MatTooltipModule],
  templateUrl: './badge.component.html',
})
export class BadgeComponent {
  @Input()
  config!: IBadge | null;

  @Output()
    trigger = new EventEmitter<any>;

  alignment = EIconAlignment;

  badgeType = EBadgeType;
}
