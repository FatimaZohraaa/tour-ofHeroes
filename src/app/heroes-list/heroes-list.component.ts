import { Component, OnInit, ViewChild } from '@angular/core';
import { HeroesDataService } from '../heroes-data.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.css'],
})
export class HeroesListComponent implements OnInit {
  @ViewChild('f') addHeroForm: NgForm;
  heroesList = [];
  constructor(
    private heroesDataService: HeroesDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.heroesList = this.heroesDataService.heroesList;
  }

  deleteHeroHandler(id: string) {
    this.heroesDataService.deleteHero(id);
    this.heroesList = this.heroesDataService.heroesList;
  }

  navigateToHero(id: string) {
    this.router.navigate([`./heroes/hero/${id}`]);
  }

  onAdd() {
    this.heroesDataService.addHero({
      name: this.addHeroForm.value.addedHero,
      id: (+this.heroesDataService.heroesList.slice(-1)[0].id + 1).toString(),
    });
    this.heroesList = this.heroesDataService.heroesList;
    this.addHeroForm.reset();
  }
}