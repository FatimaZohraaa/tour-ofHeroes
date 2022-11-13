import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeroesDataService } from './heroes-data.service';
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
    private heroesDataService: HeroesDataService
  ) {}

  ngOnInit() {
    this.messages = this.heroesDataService.messages;
  }
  dashboardNavigate() {
    this.router.navigate(['/']);
    this.heroesDataService.addMessage(`fetched dashboard`);
  }

  heroesListNavigate() {
    this.router.navigate(['/heroes']);
    this.heroesDataService.addMessage(`fetched heroes`);
    this.messages = this.heroesDataService.messages;
  }

  clearMessages() {
    this.heroesDataService.clearMessages();
    this.messages = this.heroesDataService.messages;
  }
}
