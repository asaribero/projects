import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { ChatService } from '../../../chat-service.service';
import { TittleComponent } from '../../../shared/tittle/tittle.component';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router } from 'express';
export interface CreateForm {
  fullName: FormControl<string>;
  email: FormControl<string>;
}
@Component({
  selector: 'app-chat-room',
  standalone: true,
  imports: [CommonModule,TittleComponent,FormsModule,ReactiveFormsModule,RouterLink],
  templateUrl: './chat-room.component.html',
})
export default class ChatRoomComponent {
  private _formBuilder = inject(FormBuilder).nonNullable;
  // private _router = inject(Router);
  private _ChatService = inject(ChatService);
  // private _contactId = '';

  // get contactId(): string {
  //   return this._contactId;
  // }

  // @Input() set contactId(value: string) {
  //   this._contactId = value;
  //   /*this.setFormValues(this._contactId);*/
  // }

  // form = this._formBuilder.group<CreateForm>({
  //   fullName: this._formBuilder.control('', Validators.required),
  //   email: this._formBuilder.control('', [
  //     Validators.required,
  //     Validators.email,
  //   ])
  // });
  async createContact() {
    // if (this.form.invalid) return;

    // try {
    //  /* const contact = this.form.value as ContactForm;
    //   !this.contactId
    //     ? await this._ChatService.createContact(contact)
    //     : await this._ChatService.updateContact(this.contactId, contact);
    //   this._router.navigate(['/dashboard']);*/
    // } catch (error) {
    //   // call some toast service to handle the error
    // }
  }

  messages: string[] = [];
  newMessage: string = '';
  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.chatService.getMessages().subscribe((message: string) => {
      this.messages.push(message);
    });
  }

  sendMessage(message: string) {
    this.chatService.sendMessage(message);
  }

  onEnter(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.sendMessage(this.newMessage);
      this.newMessage = '';
    }
  }
}
