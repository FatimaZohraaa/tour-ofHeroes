import { Component, OnInit, ViewChild } from '@angular/core';
import { HeroesDataService } from 'src/app/services/heroesData/heroes-data.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MessagesService } from 'src/app/services/messages/messages.service';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.css'],
})
export class HeroesListComponent implements OnInit {
  @ViewChild('f') addHeroForm: NgForm;
  heroesList = [];
  newId: string;

  constructor(
    private heroesDataService: HeroesDataService,
    private router: Router,
    private messagesService: MessagesService
  ) {}

  ngOnInit(): void {
    this.heroesList = this.heroesDataService.getHeroesList();
  }

  onDelete(id: string) {
    this.heroesDataService.deleteHero(id);
    this.messagesService.addMessage(`deleted hero id ${id}`);
    this.heroesList = this.heroesDataService.getHeroesList();
  }

  navigateToHero(id: string) {
    this.router.navigate([`./heroes/hero/${id}`]);
    this.messagesService.addMessage(`fetched hero id ${id}`);
  }

  onAdd() {
    if (this.heroesDataService.getHeroesList().length == 0) {
      this.newId = '1';
    } else {
      this.newId = (
        +this.heroesDataService.getHeroesList().slice(-1)[0].id + 1
      ).toString();
    }
    this.heroesDataService.addHero({
      name: this.addHeroForm.value.addedHero,
      id: this.newId,
    });
    this.heroesList = this.heroesDataService.getHeroesList();
    this.addHeroForm.reset();
    this.messagesService.addMessage(
      `added hero with id ${+this.heroesDataService.getHeroesList().slice(-1)[0]
        .id}`
    );
  }
}
