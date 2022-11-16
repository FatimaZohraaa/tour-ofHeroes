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
   * when the component is initialized
   * gets the list of messages to display
   */
  ngOnInit() {
    this.messages = this.messagesService.getMessages();
  }

  /**
   * navigates to the dashboard page when the 'Dashboard' button is clicked
   */
  dashboardNavigate() {
    this.router.navigate(['/']);
    this.messagesService.addMessage(`fetched dashboard`);
  }

  /**
   * navigates to the heroesList page when the 'Heroes' button is clicked
   */
  heroesListNavigate() {
    this.router.navigate(['/heroes']);
    this.messagesService.addMessage(`fetched heroes`);
    this.messages = this.messagesService.getMessages();
  }

  /**
   * clears the list of messages when the 'Clear All' button is clicked
   */
  clearMessages() {
    this.messagesService.clearMessages();
    this.messages = this.messagesService.getMessages();
  }
}
