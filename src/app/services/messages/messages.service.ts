import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  constructor() {}

  messages = [];

  getMessages() {
    return this.messages;
  }
  addMessage(message: string) {
    this.messages.push(message);
  }

  clearMessages() {
    this.messages = [];
  }
}
