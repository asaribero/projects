import { Component, Input, booleanAttribute } from '@angular/core';
import { SwitchService } from '../../../services/modal/switch.service';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, FormsModule,ModalComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  @Input({ required:true}) title!:string;
  @Input({ required:true}) content!:string;
  @Input({ required:true}) routerLinkBtn1!:string;
  @Input({ required:true}) textBtn1!:string;
  @Input({ required:true}) textBtn2!:string;
  @Input({ transform: booleanAttribute }) withShadow:boolean = false;

  constructor(private modalSS:SwitchService){}

  closeModal() {
    this.modalSS.$modal.emit(false);
  }
}
