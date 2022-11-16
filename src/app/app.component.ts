import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessagesService } from './services/messages/messages.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title: string = 'tour-of-heroes';
  messages: string[] = [];

  constructor(
    private router: Router,
    private messagesService: MessagesService
  ) {}

  /**
   * When the component is initialized
   * Gets the list of messages to display
   */
  ngOnInit() {
    this.messages = this.messagesService.getMessages();
  }

  /**
   * When the 'Dashboard' button is clicked
   * Navigates to the dashboard page
   */
  dashboardNavigate() {
    this.router.navigate(['/']);
    this.messagesService.addMessage(`fetched dashboard`);
  }

  /**
   * When the 'Heroes' button is clicked
   * Navigates to the heroesList page
   */
  heroesListNavigate() {
    this.router.navigate(['/heroes']);
    this.messagesService.addMessage(`fetched heroes`);
    this.messages = this.messagesService.getMessages();
  }

  /**
   * When the 'Clear All' button is clicked
   * Clears the list of messages
   */
  clearMessages() {
    this.messagesService.clearMessages();
    this.messages = this.messagesService.getMessages();
  }
}
