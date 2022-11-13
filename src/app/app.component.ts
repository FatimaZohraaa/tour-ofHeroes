import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'tour-of-heroes';

  constructor(private router: Router) {}
  dashboardNavigate() {
    this.router.navigate(['/']);
  }

  heroesListNavigate() {
    this.router.navigate(['/heroes']);
  }
}
