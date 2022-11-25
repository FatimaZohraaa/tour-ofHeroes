import { Injectable } from '@angular/core';
import { startWith, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeroesDataService {
  constructor() {}

  heroesList: { name: string; id: string }[] = [
    { name: 'hero 1', id: '1' },
    { name: 'hero 2', id: '2' },
    { name: 'hero 3', id: '3' },
  ];

  /**
   * Returns the list of heroes
   * @returns {list} - List of heroes
   */
  getHeroesList() {
    return this.heroesList;
  }

  heroeslistSubject = new Subject<{ name: string; id: string }[]>();

  /**
   * Adds a new hero to the list of heroes
   * @param {object} hero  - object containing the new hero details
   */

  addHero(hero: { name: string; id: string }) {
    this.heroesList = [...this.heroesList, hero];
    this.heroeslistSubject.next(this.heroesList);
  }

  /**
   * Deletes hero with selected id from the list of heroes
   * @param {string} id - id of the hero to delete
   */

  deleteHero(id: string) {
    this.heroesList = this.heroesList.filter((hero) => hero.id !== id);
    this.heroeslistSubject.next(this.heroesList);
  }

  /**
   * Updates the details of the hero in the list of heroes
   * @param {object} editedHero - object containing updated details of the edited hero
   */

  editHero(editedHero: { name: string; id: string }) {
    this.heroesList.map((hero) => {
      if (hero.id == editedHero.id) {
        hero.name = editedHero.name;
      }
    });
  }
}
