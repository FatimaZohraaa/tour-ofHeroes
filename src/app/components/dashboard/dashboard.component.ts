import { Component, OnInit } from '@angular/core';
import { HeroesDataService } from 'src/app/services/heroesData/heroes-data.service';
import { Router } from '@angular/router';
import { MessagesService } from 'src/app/services/messages/messages.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private heroesDataService: HeroesDataService,
    private router: Router,
    private messagesService: MessagesService
  ) {}

  public topHeroes: { name: string; id: string }[] = [];

  /**
   * When the component is initialized
   * Gets the last 3 heroes in the list and stores them in the topHeroes variable
   */
  ngOnInit(): void {
    this.topHeroes = this.heroesDataService.getHeroesList().slice(-3);
  }

  /**
   * When the hero's tab is clicked
   * Navigates to the details page of the hero selected
   * Adds a message that "a hero with id='' was fetched" to the list of messages
   * @param {String} id - Id of the hero to navigate to
   */
  navigateToHero(id: string) {
    this.router.navigate([`./heroes/hero/${id}`]);
    this.messagesService.addMessage(`fetched hero id ${id}`);
  }
}
