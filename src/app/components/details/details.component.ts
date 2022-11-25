import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeroesDataService } from 'src/app/services/heroesData/heroes-data.service';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { MessagesService } from 'src/app/services/messages/messages.service';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  @ViewChild('f') editHeroForm: NgForm;

  constructor(
    private activatedRoute: ActivatedRoute,
    private heroesDataService: HeroesDataService,
    private location: Location,
    private messagesService: MessagesService
  ) {}

  public detailsId: string;
  public heroDetails: { name: string; id: string };
  public editedName: string;

  /**
   * when the component is initialized
   * gets the id of the selected hero from the URL
   * gets the hero details from the list of heroes
   * stores the name of the hero in a variable
   */
  ngOnInit(): void {
    this.detailsId = this.activatedRoute.snapshot.paramMap.get('id') || '1';
    this.heroDetails = this.heroesDataService
      .getHeroesList()
      .find((hero) => hero.id == this.detailsId);
    this.editedName = this.heroDetails.name;
  }

  /**
   * When the 'Back' button is clicked
   * Navigates back to the previous page
   */
  navigateBack() {
    this.location.back();
  }

  /**
   * When the 'Save' button is clicked
   * Edits the hero's details
   * Adds a message that "hero with id='' was updated" to the list of messages
   * Navigates back to the previous page
   */

  onEdit() {
    this.heroesDataService.editHero({
      name: this.editHeroForm.value.heroName,
      id: this.detailsId,
    });
    this.messagesService.addMessage(`updated hero id ${this.detailsId}`);
    this.navigateBack();
  }
}
