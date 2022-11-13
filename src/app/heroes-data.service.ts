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
  ];

  addHero(hero: { name: string; id: string }) {
    this.heroesList = [...this.heroesList, hero];
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
