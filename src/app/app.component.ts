import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessagesService } from './messages.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'tour-of-heroes';
  messages = [];

  constructor(
    private router: Router,
    private messagesService: MessagesService
  ) {}

  ngOnInit() {
    this.messages = this.messagesService.messages;
  }
  dashboardNavigate() {
    this.router.navigate(['/']);
    this.messagesService.addMessage(`fetched dashboard`);
  }

  heroesListNavigate() {
    this.router.navigate(['/heroes']);
    this.messagesService.addMessage(`fetched heroes`);
    this.messages = this.messagesService.messages;
  }

  clearMessages() {
    this.messagesService.clearMessages();
    this.messages = this.messagesService.messages;
  }
}
