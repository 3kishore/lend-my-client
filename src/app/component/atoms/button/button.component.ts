import { Component, EventEmitter, Input, Output } from "@angular/core";
import { IButton } from "./button.interface";
import { CommonModule } from "@angular/common";
import { EButtonType } from "./button-type.enum";
import { Router } from "@angular/router";

@Component({
  standalone: true,
  selector: 'app-button',
  templateUrl: './button.component.html',
  imports: [CommonModule]
})
export class ButtonComponent {

  @Input()
    button!: IButton;

  @Output() 
    buttonClicked = new EventEmitter<IButton>();

  buttonType = EButtonType;

  constructor(private route: Router) {}

  onClick(event: IButton) {
    this.buttonClicked.emit(event);
    if(event.routeLink) {
      this.route.navigate([event.routeLink]);
    }
  }
}
