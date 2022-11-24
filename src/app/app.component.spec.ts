import {
  TestBed,
  fakeAsync,
  tick,
  ComponentFixture,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { appRoutes } from './app.module';
import { MessagesService } from './services/messages/messages.service';

describe('AppComponent', () => {
  let location: Location;
  let router: Router;
  let fixture: ComponentFixture<AppComponent>;
  let appComponent: AppComponent;
  let messagesService: MessagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(appRoutes)],
      declarations: [AppComponent],
      providers: [MessagesService],
    });

    fixture = TestBed.createComponent(AppComponent);
    appComponent = fixture.componentInstance;
    messagesService = fixture.debugElement.injector.get(MessagesService);
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    router.initialNavigation();
  });

  it('should create the app', () => {
    expect(appComponent).toBeTruthy();
  });

  it('should receive messages from messages service ', () => {
    fixture.detectChanges();
    expect(messagesService.getMessages()).toEqual(appComponent.messages);
  });

  it('should call dashboardNavigate() when "dashboard" button is clicked', fakeAsync(() => {
    //given
    spyOn(appComponent, 'dashboardNavigate');
    const button: HTMLButtonElement =
      fixture.debugElement.nativeElement.querySelector('#dashboardButton');

    //when
    button.click();
    tick();

    //then
    expect(appComponent.dashboardNavigate).toHaveBeenCalled();
  }));

  it('should navigate to "./"', fakeAsync(() => {
    //when
    router.navigate(['/']).then(() => {
      expect(location.path()).toBe('/');
    });
  }));

  it('should add a message to messages service when dashboardNavigate() is called', () => {
    //given
    const initialNumberOfMessages: number =
      messagesService.getMessages().length;
    //when
    appComponent.dashboardNavigate();
    fixture.detectChanges();

    //then
    expect(
      messagesService.getMessages().indexOf('fetched dashboard')
    ).not.toEqual(-1);
    expect(messagesService.getMessages().length).toEqual(
      initialNumberOfMessages + 1
    );
  });

  it('should call heroesListNavigate() when "heroes" button is clicked  ', fakeAsync(() => {
    //given
    spyOn(appComponent, 'heroesListNavigate');
    const button: HTMLButtonElement =
      fixture.debugElement.nativeElement.querySelector('#heroesButton');

    //when
    button.click();
    tick();

    //then
    expect(appComponent.heroesListNavigate).toHaveBeenCalled();
  }));

  it('should navigate to "./heroes"', fakeAsync(() => {
    //when
    router.navigate(['/heroes']).then(() => {
      expect(location.path()).toBe('/heroes');
    });
  }));

  it('should add a message to the messages service when heroesListNavigate() is called  ', () => {
    //given
    const initialNumberOfMessages: number =
      messagesService.getMessages().length;

    //when
    appComponent.heroesListNavigate();
    fixture.detectChanges();

    //then
    expect(messagesService.getMessages().indexOf('fetched heroes')).not.toEqual(
      -1
    );
    expect(messagesService.getMessages().length).toEqual(
      initialNumberOfMessages + 1
    );
  });

  it('should call clearMessages() when "clear all" button is clicked', fakeAsync(() => {
    //given
    spyOn(appComponent, 'clearMessages');
    const button: HTMLButtonElement =
      fixture.debugElement.nativeElement.querySelector('#clearAllButton');

    //when
    button.click();
    tick();

    //then
    expect(appComponent.clearMessages).toHaveBeenCalled();
  }));

  it('should clear all messages from messages service when clearAll() is called', () => {
    //when
    appComponent.clearMessages();
    fixture.detectChanges();

    //then
    expect(appComponent.messages.length).toEqual(0);
  });

  it('should clear messages from the view when the clearMessages() is called', fakeAsync(() => {
    //given
    const compiled: HTMLElement = fixture.debugElement.nativeElement;

    //when
    appComponent.clearMessages();
    fixture.detectChanges();

    //then
    expect(appComponent.messages).toEqual([]);
    expect(compiled.querySelector('ul').textContent).toEqual('');
  }));
});
