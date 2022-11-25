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

  public heroesList: { name: string; id: string }[] = [];
  private newId: string;

  constructor(
    private heroesDataService: HeroesDataService,
    private router: Router,
    private messagesService: MessagesService
  ) {}

  /**
   * When the component is initialized
   * Gets the heroes list from the heroesData service
   */
  ngOnInit(): void {
    this.heroesList = this.heroesDataService.getHeroesList();
    this.heroesDataService.heroeslistSubject.subscribe((testList) => {
      this.heroesList = testList;
    });
  }

  /**
   * When the 'Delete' icon is clicked
   * Deletes hero selected by id
   * Adds a message that " a hero with id:'' was deleted" to the list of messages
   * @param {string} id - id of the hero to delete
   */
  onDelete(id: string) {
    this.heroesDataService.deleteHero(id);
    this.messagesService.addMessage(`deleted hero id ${id}`);
    // this.heroesList = this.heroesDataService.getHeroesList();
  }

  /**
   * When a hero's tab is clicked
   * Navigates to the details page of the hero selected
   * Adds a message that "a hero with id='' was fetched" to the list of messages
   * @param {String} id - Id of the hero to navigate to
   */
  navigateToHero(id: string) {
    this.router.navigate([`./heroes/hero/${id}`]);
    this.messagesService.addMessage(`fetched hero id ${id}`);
  }

  /**
   * When the 'Add Hero' button is clicked
   * Adds the new hero's details to the list
   * Resets the form
   * Adds a message that " a new hero with id='' has been added" to the list of messages
   */
  onAdd() {
    if (this.heroesDataService.getHeroesList().length == 0) {
      this.newId = '1';
    } else {
      this.newId = (
        +this.heroesDataService.getHeroesList().slice(-1)[0].id + 1
      ).toString();
    }
    // this.heroesDataService.addHero({
    //   name: this.addHeroForm.value.addedHero,
    //   id: this.newId,
    // });

    this.heroesDataService.addHero({
      name: this.addHeroForm.value.addedHero,
      id: this.newId,
    });

    // this.heroesList = this.heroesDataService.getHeroesList();
    this.addHeroForm.reset();
    this.messagesService.addMessage(
      `added hero with id ${+this.heroesDataService.getHeroesList().slice(-1)[0]
        .id}`
    );
  }
}
