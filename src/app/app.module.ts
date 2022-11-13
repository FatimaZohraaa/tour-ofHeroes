import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroesListComponent } from './heroes-list/heroes-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DetailsComponent } from './details/details.component';

import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';

const appRoutes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'heroes', component: HeroesListComponent },
  { path: 'heroes/hero/:id', component: DetailsComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HeroesListComponent,
    DashboardComponent,
    DetailsComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, RouterModule.forRoot(appRoutes)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
