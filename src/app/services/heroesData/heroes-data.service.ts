import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HeroesDataService {
  constructor() {}

  heroesList = [
    { name: 'hero 1', id: '1' },
    { name: 'hero 2', id: '2' },
    { name: 'hero 3', id: '3' },
    { name: 'hero 4', id: '4' },
    { name: 'hero 5', id: '5' },
    { name: 'hero 6', id: '6' },
  ];

  addHero(hero: { name: string; id: string }) {
    this.heroesList = [...this.heroesList, hero];
    console.log(hero);
  }

  deleteHero(id: string) {
    this.heroesList = this.heroesList.filter((hero) => hero.id !== id);
  }

  editHero(editedHero: { name: string; id: string }) {
    this.heroesList.map((hero) => {
      if (hero.id == editedHero.id) {
        hero.name = editedHero.name;
      }
    });
  }
}
