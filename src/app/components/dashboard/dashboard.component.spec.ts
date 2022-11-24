import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { MessagesService } from '../../services/messages/messages.service';
import { HeroesDataService } from '../../services/heroesData/heroes-data.service';
import { Router } from '@angular/router';
import { appRoutes } from '../../app.module';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';

describe('DashboardComponent', () => {
  let dashboardComponent: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let heroesDataService: HeroesDataService;
  let messagesService: MessagesService;
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(appRoutes)],
      declarations: [DashboardComponent],
      providers: [MessagesService, HeroesDataService],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    dashboardComponent = fixture.componentInstance;
    heroesDataService = fixture.debugElement.injector.get(HeroesDataService);
    messagesService = fixture.debugElement.injector.get(MessagesService);
    fixture.detectChanges();
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    router.initialNavigation();
  });

  it('should create dashboard', () => {
    expect(dashboardComponent).toBeTruthy();
  });

  it('should store the last three elements of heroes list from the service in the topHeroes variable', () => {
    expect(dashboardComponent.topHeroes).toEqual(
      heroesDataService.getHeroesList().slice(-3)
    );
  });

  it('should call navigateToHero() when topHeroButton is clicked', fakeAsync(() => {
    //given
    spyOn(dashboardComponent, 'navigateToHero');
    const button: HTMLButtonElement =
      fixture.debugElement.nativeElement.querySelector('.topHeroButton');

    //when
    button.click();
    tick();

    //then
    expect(dashboardComponent.navigateToHero).toHaveBeenCalled();
  }));

  it("should navigate to hero's details when navigateToHero() is called", fakeAsync(() => {
    //when
    router.navigate(['/heroes/hero/1']).then(() => {
      expect(location.path()).toBe('/heroes/hero/1');
    });
  }));

  it('should add a message "fetched hero id="" " when navigateToHero() is called', () => {
    //given
    const initialLNumberOfMessages: number =
      messagesService.getMessages().length;

    //when
    dashboardComponent.navigateToHero('1');
    fixture.detectChanges();

    //then
    expect(
      messagesService.getMessages().indexOf('fetched hero id 1')
    ).not.toEqual(-1);

    expect(messagesService.getMessages().length).toEqual(
      initialLNumberOfMessages + 1
    );
  });
});
