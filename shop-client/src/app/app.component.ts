import { Component } from '@angular/core';
import { SessionService } from './services/session.service';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'shop-client';

  constructor(private sessionService: SessionService) {}

  isAuthenticated(): boolean {
    return this.sessionService.isUserLoggedIn();
  }

  ngOnInit(): void {
    initFlowbite();
  }
}
