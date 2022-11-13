import { Component, OnInit } from '@angular/core';
import { HeroesDataService } from '../heroes-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private heroesDataService: HeroesDataService,
    private router: Router
  ) {}

  topHeroes = [];

  ngOnInit(): void {
    this.topHeroes = this.heroesDataService.heroesList.slice(-3);
  }

  navigateToHero(id: string) {
    this.router.navigate([`./heroes/hero/${id}`]);
  }
}
