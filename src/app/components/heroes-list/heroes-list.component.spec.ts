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
  it('should display list of heros', () => {
    let compiled = fixture.nativeElement;
    heroesDataService.getHeroesList().forEach((hero) => {
      expect(compiled.querySelector('#heroes-list').textContent).toContain(
        hero.name
      );
    });
  });

  it('should call navigateToHero() when "heroTab" is clicked', fakeAsync(() => {
    spyOn(heroesListComponent, 'navigateToHero');
    let heroTab = fixture.debugElement.nativeElement.querySelector('.heroTab');
    heroTab.click();
    tick();
    expect(heroesListComponent.navigateToHero).toHaveBeenCalled();
  }));

  it('should navigate to heroes details page when navigateToHero() is called', fakeAsync(() => {
    router.navigate(['/heroes/hero/1']).then(() => {
      expect(location.path()).toBe('/heroes/hero/1');
    });
  }));

  it('should add message "fetched hero id="" " when navigateToHero() is called', () => {
    let initialNumberOfMessages = messagesService.getMessages().length;
    heroesListComponent.navigateToHero('1');
    fixture.detectChanges();
    expect(messagesService.getMessages().length).toEqual(
      initialNumberOfMessages + 1
    );
    expect(
      messagesService.getMessages().indexOf('fetched hero id 1')
    ).not.toEqual(-1);
  });

  it('should call onAdd() when "add hero" button is clicked', fakeAsync(() => {
    spyOn(heroesListComponent, 'onAdd');
    let button =
      fixture.debugElement.nativeElement.querySelector('#button-addon2');
    button.click();
    tick();
    expect(heroesListComponent.onAdd).toHaveBeenCalled();
  }));

  it('should add a new hero to the service when onAdd() is called', () => {
    let initialNumberOfHeros = heroesDataService.getHeroesList().length;
    heroesListComponent.onAdd();
    fixture.detectChanges();
    expect(heroesDataService.getHeroesList().length).toEqual(
      initialNumberOfHeros + 1
    );
  });

  it('should reset form when onAdd() is called', () => {
    const spy = spyOn(heroesListComponent.addHeroForm, 'reset');
    heroesListComponent.addHeroForm.form.controls['addedHero'].setValue('test');
    heroesListComponent.onAdd();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

  it('should add a new message to the service when onAdd() is called', () => {
    let initialNumberOfMessages = messagesService.getMessages().length;
    heroesListComponent.navigateToHero('1');
    fixture.detectChanges();
    expect(messagesService.getMessages().length).toEqual(
      initialNumberOfMessages + 1
    );
  });

  it('should call onDelete() when "delete" button is clicked', fakeAsync(() => {
    spyOn(heroesListComponent, 'onDelete');
    let deleteIcon =
      fixture.debugElement.nativeElement.querySelector('#deleteHeroButton');
    deleteIcon.click();
    tick();
    expect(heroesListComponent.onDelete).toHaveBeenCalled();
  }));

  it('should delete a hero from the service when onDelete() is called', () => {
    spyOn(heroesDataService, 'getHeroesList').and.returnValue([
      { name: 'test', id: '1' },
    ]);
    let initialNumberOfMessages = messagesService.getMessages().length;
    heroesListComponent.onDelete('1');
    fixture.detectChanges();
    expect(heroesDataService.getHeroesList().length).toEqual(
      initialNumberOfMessages - 1
    );
  });
  it('should add a message "" to the service when onDelete() is called', () => {
    let initialNumberOfMessages = messagesService.getMessages().length;
    heroesListComponent.onDelete('1');
    fixture.detectChanges();
    expect(messagesService.getMessages().length).toEqual(
      initialNumberOfMessages + 1
    );
    expect(
      messagesService.getMessages().indexOf('deleted hero id 1')
    ).not.toEqual(-1);
  });

  it('should disable the save button if input is empty', () => {
    heroesListComponent.addHeroForm.form.controls['addedHero'].setValue('');
    let button =
      fixture.debugElement.nativeElement.querySelector('#button-addon2');
    fixture.detectChanges();
    expect(button.disabled).toBeTruthy();
    expect(heroesListComponent.addHeroForm.valid).toBeFalsy();
  });

  it('should enable save button if input is not empty and not equal to initial name', () => {
    let button =
      fixture.debugElement.nativeElement.querySelector('#button-addon2');

    if (
      heroesListComponent.addHeroForm.form.controls['addedHero'].value !== ''
    ) {
      fixture.detectChanges();
      expect(button.disabled).toBeFalsy();
      expect(heroesListComponent.addHeroForm.valid).toBeTruthy();
    }
  });
});
