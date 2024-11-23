import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
})
export class NavigationBarComponent {
  constructor(private sessionService: SessionService, private router: Router) {}

  logout() {
    this.sessionService.endSession();
    this.router.navigate(['login']);
  }

  isUserLoggedIn(): boolean {
    return this.sessionService.isUserLoggedIn();
  }

  isAdmin(): boolean {
    return this.sessionService.isAdmin();
  }

  isUser(): boolean {
    return this.sessionService.isUser();
  }


  getUserFirstName(): string {
    return this.sessionService.userFirstName;
  }

  getUserLastName(): string {
    return this.sessionService.userLastName;
  }

  onLogoClick() {
    this.router.navigateByUrl('home');
  }
}
