import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  constructor() {}

  messages: string[] = [];

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
