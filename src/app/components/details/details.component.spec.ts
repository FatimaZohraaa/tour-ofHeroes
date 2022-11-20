import { DetailsComponent } from './details.component';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { MessagesService } from '../../services/messages/messages.service';
import { HeroesDataService } from '../../services/heroesData/heroes-data.service';

import { Router } from '@angular/router';
import { appRoutes } from '../../app.module';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';

describe('DetailsComponent', () => {
  let detailsComponent: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;
  let heroesDataService: HeroesDataService;
  let messagesService: MessagesService;
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(appRoutes), FormsModule],
      providers: [MessagesService, HeroesDataService],
      declarations: [DetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsComponent);
    detailsComponent = fixture.componentInstance;
    heroesDataService = fixture.debugElement.injector.get(HeroesDataService);
    messagesService = fixture.debugElement.injector.get(MessagesService);

    fixture.detectChanges();

    router = TestBed.get(Router);
    location = TestBed.get(Location);
    router.initialNavigation();
  });

  it('should create dashboard', () => {
    expect(detailsComponent).toBeTruthy();
  });

  it('should display the name of hero in title/input', () => {
    let heroName = detailsComponent.editHeroForm.form.controls['heroName'];
    let editInput =
      fixture.debugElement.nativeElement.querySelector('#editHeroInput');
    let heroNameDisplay =
      fixture.debugElement.nativeElement.querySelector('#heroNameDisplay');

    expect(editInput.value).toEqual(heroName.value);
    expect(heroNameDisplay.textContent).toContain(heroName.value);
    expect(detailsComponent.editedName).toEqual(heroName.value);
  });

  it('should display id of hero', () => {
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#detailsHeroId').textContent).toContain(
      detailsComponent.detailsId
    );
  });

  it('should disable the save button if input is equal to initial name', fakeAsync(() => {
    detailsComponent.editHeroForm.form.controls['heroName'].setValue(
      detailsComponent.heroDetails.name
    );
    let saveButton = fixture.nativeElement.querySelector('#saveButton');
    fixture.detectChanges();
    expect(saveButton.disabled).toBeTruthy();
  }));

  it('should disable the save button if input is empty', () => {
    detailsComponent.editHeroForm.form.controls['heroName'].setValue('');
    let saveButton = fixture.nativeElement.querySelector('#saveButton');
    fixture.detectChanges();
    expect(saveButton.disabled).toBeTruthy();
    expect(detailsComponent.editHeroForm.valid).toBeFalsy();
  });

  it('should display message "Please Enter a valid Name !" when input is empty', () => {
    detailsComponent.editHeroForm.form.controls['heroName'].setValue('');
    fixture.detectChanges();
    let validNameSpan = fixture.nativeElement.querySelector(
      '#enterValidNameSpan'
    );
    fixture.detectChanges();
    expect(validNameSpan.textContent).toContain('Please Enter a valid Name !');
  });

  it('should not display message "Please Enter a valid Name !" when input is not empty', () => {
    detailsComponent.editHeroForm.form.controls['heroName'].setValue('test');
    fixture.detectChanges();
    let validNameSpan = fixture.nativeElement.querySelector(
      '#enterValidNameSpan'
    );
    fixture.detectChanges();
    expect(validNameSpan).toBeFalsy();
  });

  it('should enable save button if input is not empty and not equal to initial name', () => {
    let saveButton = fixture.nativeElement.querySelector('#saveButton');
    if (
      detailsComponent.editHeroForm.form.controls['heroName'].value !== '' &&
      detailsComponent.editHeroForm.form.controls['heroName'].value !==
        detailsComponent.heroDetails.name
    ) {
      fixture.detectChanges();
      expect(saveButton.disabled).toBeFalsy();
      expect(detailsComponent.editHeroForm.valid).toBeTruthy();
    }
  });

  it('should call onEdit() when "save" button is clicked', fakeAsync(() => {
    detailsComponent.editHeroForm.form.controls['heroName'].setValue('hero');
    fixture.detectChanges();
    spyOn(detailsComponent, 'onEdit');
    let button = fixture.nativeElement.querySelector('#saveButton');
    button.click();
    tick();
    expect(detailsComponent.onEdit).toHaveBeenCalled();
  }));

  it('should edit hero on the service when onEdit() is called', () => {
    detailsComponent.editHeroForm.value.heroName = 'hero 1 v2';
    detailsComponent.detailsId = '1';
    fixture.detectChanges();
    detailsComponent.onEdit();
    fixture.detectChanges();
    let editedHero = heroesDataService
      .getHeroesList()
      .find((hero) => (hero.id = detailsComponent.detailsId));
    expect(editedHero.name).toEqual(
      detailsComponent.editHeroForm.value.heroName
    );
  });

  it('should add a message "updated hero id="" " when onEdit() is called', () => {
    let initialLNumberOfMessages = messagesService.getMessages().length;
    detailsComponent.detailsId = '5';
    detailsComponent.onEdit();
    fixture.detectChanges();
    expect(
      messagesService.getMessages().indexOf('updated hero id 5')
    ).not.toEqual(-1);
    expect(messagesService.getMessages().length).toEqual(
      initialLNumberOfMessages + 1
    );
  });

  it('should call navigateBack() "back" button is clicked', fakeAsync(() => {
    spyOn(detailsComponent, 'navigateBack');
    let button = fixture.nativeElement.querySelector('#navigateBackButton');
    button.click();
    tick();
    expect(detailsComponent.navigateBack).toHaveBeenCalled();
  }));

  it('should navigate back when navigateBack() is called', () => {});
});
