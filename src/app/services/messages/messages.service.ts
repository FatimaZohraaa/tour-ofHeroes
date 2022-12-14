import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  constructor() {}

  public messages: string[] = ['test message', 'test message 2'];

  /**
   * Returns the list of messages
   * @returns {list} - list of the messages
   */
  getMessages() {
    return this.messages;
  }

  /**
   * Adds the new message to the list of messages
   * @param {string} message - message to add
   */
  addMessage(message: string) {
    this.messages.push(message);
  }

  /**
   * Clears all messages
   */
  clearMessages() {
    this.messages = [];
  }
}
