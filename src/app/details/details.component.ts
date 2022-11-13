import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeroesDataService } from '../heroes-data.service';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { MessagesService } from '../messages.service';
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

  detailsId: string;
  heroDetails: { name: string; id: string };
  editedName: string;

  ngOnInit(): void {
    this.detailsId = this.activatedRoute.snapshot.paramMap.get('id');
    this.heroDetails = this.heroesDataService.heroesList.find(
      (hero) => hero.id == this.detailsId
    );
    this.editedName = this.heroDetails.name;
  }

  navigateBack() {
    this.location.back();
  }

  onEdit() {
    console.log(this.editHeroForm.value);
    this.heroesDataService.editHero({
      name: this.editHeroForm.value.heroName,
      id: this.detailsId,
    });
    this.messagesService.addMessage(`updated hero id ${this.detailsId}`);

    this.navigateBack();
  }
}
