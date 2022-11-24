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
import { AbstractControl, FormControl, FormsModule } from '@angular/forms';

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

  it('should disable the save button if input is equal to initial name', fakeAsync(() => {
    //given
    const saveButton: HTMLButtonElement =
      fixture.nativeElement.querySelector('#saveButton');

    //when
    detailsComponent.editHeroForm.form.controls['heroName'].setValue(
      detailsComponent.heroDetails.name
    );
    fixture.detectChanges();

    //then
    expect(saveButton.disabled).toBeTruthy();
  }));

  it('should disable the save button if input is empty', () => {
    //given
    const saveButton: HTMLButtonElement =
      fixture.nativeElement.querySelector('#saveButton');

    //when
    detailsComponent.editHeroForm.form.controls['heroName'].setValue('');
    fixture.detectChanges();

    //then
    expect(saveButton.disabled).toBeTruthy();
    expect(detailsComponent.editHeroForm.valid).toBeFalsy();
  });

  it('should enable save button if input is not empty and not equal to initial value', () => {
    //given
    const saveButton: HTMLButtonElement =
      fixture.nativeElement.querySelector('#saveButton');

    //when
    detailsComponent.editHeroForm.form.controls['heroName'].setValue('abcd');
    fixture.detectChanges();

    //then
    expect(saveButton.disabled).toBeFalsy();
    expect(detailsComponent.editHeroForm.valid).toBeTruthy();
  });

  it('should call onEdit() when "save" button is clicked', fakeAsync(() => {
    //given
    const button: HTMLButtonElement =
      fixture.nativeElement.querySelector('#saveButton');
    //when
    detailsComponent.editHeroForm.form.controls['heroName'].setValue('hero');
    fixture.detectChanges();
    spyOn(detailsComponent, 'onEdit');
    button.click();
    tick();

    //then
    expect(detailsComponent.onEdit).toHaveBeenCalled();
  }));

  it('should edit hero on the service when onEdit() is called', () => {
    //given
    detailsComponent.editHeroForm.value.heroName = 'hero 1 v2';
    detailsComponent.detailsId = '1';
    const editedHero: { name: string; id: string } = heroesDataService
      .getHeroesList()
      .find((hero) => (hero.id = detailsComponent.detailsId));

    //when
    detailsComponent.onEdit();
    fixture.detectChanges();

    //then
    expect(editedHero.name).toEqual(
      detailsComponent.editHeroForm.value.heroName
    );
  });

  it('should add a message "updated hero id="" " when onEdit() is called', () => {
    //given
    const initialLNumberOfMessages: number =
      messagesService.getMessages().length;
    detailsComponent.detailsId = '5';

    //when
    detailsComponent.onEdit();
    fixture.detectChanges();

    //then
    expect(
      messagesService.getMessages().indexOf('updated hero id 5')
    ).not.toEqual(-1);
    expect(messagesService.getMessages().length).toEqual(
      initialLNumberOfMessages + 1
    );
  });

  it('should call navigateBack() "back" button is clicked', fakeAsync(() => {
    //given
    const button: HTMLButtonElement = fixture.nativeElement.querySelector(
      '#navigateBackButton'
    );
    spyOn(detailsComponent, 'navigateBack');

    //when
    button.click();
    tick();

    //then
    expect(detailsComponent.navigateBack).toHaveBeenCalled();
  }));

  it('should navigate back when navigateBack() is called', () => {});
});
