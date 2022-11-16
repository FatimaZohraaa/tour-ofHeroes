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

  ngOnInit(): void {
    this.topHeroes = this.heroesDataService.getHeroesList().slice(-3);
  }

  navigateToHero(id: string) {
    this.router.navigate([`./heroes/hero/${id}`]);
    this.messagesService.addMessage(`fetched hero id ${id}`);
  }
}
