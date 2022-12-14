import { IterableDiffers } from '@angular/core';
import { NgForm } from '@angular/forms';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { HeroesListComponent } from './heroes-list.component';
import { Router } from '@angular/router';
import { appRoutes } from '../../app.module';
import { Location } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { MessagesService } from '../../services/messages/messages.service';
import { HeroesDataService } from '../../services/heroesData/heroes-data.service';

describe('HeroesListComponent', () => {
  let heroesListComponent: HeroesListComponent;
  let fixture: ComponentFixture<HeroesListComponent>;
  let router: Router;
  let location: Location;
  let heroesDataService: HeroesDataService;
  let messagesService: MessagesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeroesListComponent],
      providers: [MessagesService, HeroesDataService],
      imports: [FormsModule, RouterTestingModule.withRoutes(appRoutes)],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroesListComponent);
    heroesListComponent = fixture.componentInstance;
    fixture.detectChanges();

    router = TestBed.get(Router);
    location = TestBed.get(Location);
    router.initialNavigation();

    heroesDataService = fixture.debugElement.injector.get(HeroesDataService);
    messagesService = fixture.debugElement.injector.get(MessagesService);
  });

  it('should create heroesListComponent', () => {
    expect(heroesListComponent).toBeTruthy();
  });

  it('should receive heroesList from the service', () => {
    expect(heroesListComponent.heroesList).toEqual(
      heroesDataService.getHeroesList()
    );
  });

  it('should call navigateToHero() when "heroTab" is clicked', fakeAsync(() => {
    //given
    spyOn(heroesListComponent, 'navigateToHero');
    const heroTab: HTMLButtonElement =
      fixture.debugElement.nativeElement.querySelector('.heroTab');

    //when
    heroTab.click();
    tick();

    //then
    expect(heroesListComponent.navigateToHero).toHaveBeenCalled();
  }));

  it('should navigate to heroes details page when navigateToHero() is called', fakeAsync(() => {
    //when
    router.navigate(['/heroes/hero/1']).then(() => {
      expect(location.path()).toBe('/heroes/hero/1');
    });
  }));

  it('should add message "fetched hero id="" " when navigateToHero() is called', () => {
    //given
    const initialNumberOfMessages: number =
      messagesService.getMessages().length;

    //when
    heroesListComponent.navigateToHero('1');
    fixture.detectChanges();

    //then
    expect(messagesService.getMessages().length).toEqual(
      initialNumberOfMessages + 1
    );
    expect(
      messagesService.getMessages().indexOf('fetched hero id 1')
    ).not.toEqual(-1);
  });

  it('should call onAdd() when "add hero" button is clicked', fakeAsync(() => {
    //given
    spyOn(heroesListComponent, 'onAdd');
    const button: HTMLButtonElement =
      fixture.debugElement.nativeElement.querySelector('#button-addon2');

    //when
    button.click();
    tick();

    //then
    expect(heroesListComponent.onAdd).toHaveBeenCalled();
  }));

  it('should add a new hero to the service when onAdd() is called', () => {
    //given
    const initialNumberOfHeros: number =
      heroesDataService.getHeroesList().length;

    //when
    heroesListComponent.onAdd();
    fixture.detectChanges();

    //then
    expect(heroesDataService.getHeroesList().length).toEqual(
      initialNumberOfHeros + 1
    );
  });

  it('should reset form when onAdd() is called', () => {
    //given
    const spy = spyOn(heroesListComponent.addHeroForm, 'reset');

    //when
    heroesListComponent.addHeroForm.form.controls['addedHero'].setValue('test');
    heroesListComponent.onAdd();
    fixture.detectChanges();

    //then
    expect(spy).toHaveBeenCalled();
  });

  it('should add a new message to the service when onAdd() is called', () => {
    //given
    const initialNumberOfMessages: number =
      messagesService.getMessages().length;

    //when
    heroesListComponent.navigateToHero('1');
    fixture.detectChanges();

    //then
    expect(messagesService.getMessages().length).toEqual(
      initialNumberOfMessages + 1
    );
  });

  it('should call onDelete() when "delete" button is clicked', fakeAsync(() => {
    //given
    spyOn(heroesListComponent, 'onDelete');
    const deleteIcon: HTMLButtonElement =
      fixture.debugElement.nativeElement.querySelector('#deleteHeroButton');

    //when
    deleteIcon.click();
    tick();

    //then
    expect(heroesListComponent.onDelete).toHaveBeenCalled();
  }));

  it('should delete a hero from the service when onDelete() is called', () => {
    //given
    spyOn(heroesDataService, 'getHeroesList').and.returnValue([
      { name: 'test', id: '1' },
    ]);
    const initialNumberOfMessages: number =
      messagesService.getMessages().length;

    //when
    heroesListComponent.onDelete('1');
    fixture.detectChanges();

    //then
    expect(heroesDataService.getHeroesList().length).toEqual(
      initialNumberOfMessages - 1
    );
  });
  it('should add a message "" to the service when onDelete() is called', () => {
    //given
    const initialNumberOfMessages: number =
      messagesService.getMessages().length;

    //when
    heroesListComponent.onDelete('1');
    fixture.detectChanges();

    //then
    expect(messagesService.getMessages().length).toEqual(
      initialNumberOfMessages + 1
    );
    expect(
      messagesService.getMessages().indexOf('deleted hero id 1')
    ).not.toEqual(-1);
  });

  it('should disable the save button if input is empty', () => {
    //given
    const button: HTMLButtonElement =
      fixture.debugElement.nativeElement.querySelector('#button-addon2');

    //when
    heroesListComponent.addHeroForm.form.controls['addedHero'].setValue('');
    fixture.detectChanges();

    //then
    expect(button.disabled).toBeTruthy();
    expect(heroesListComponent.addHeroForm.valid).toBeFalsy();
  });

  it('should enable save button if input is not empty and not equal to initial name', () => {
    //given
    const button: HTMLButtonElement =
      fixture.debugElement.nativeElement.querySelector('#button-addon2');

    //when
    heroesListComponent.addHeroForm.form.controls['addedHero'].setValue('abc');
    fixture.detectChanges();

    //then
    expect(button.disabled).toBeFalsy();
    expect(heroesListComponent.addHeroForm.valid).toBeTruthy();
  });
});
