import { Component } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-floating-menu',
  templateUrl: './floating-menu.component.html',
  styleUrl: './floating-menu.component.scss'
})
export class FloatingMenuComponent {

  constructor(private sessionService: SessionService, private router: Router){}

  isAdmin(){
    return this.sessionService.isAdmin();
  }

  logout(){
    this.sessionService.endSession();
    this.router.navigate(['login']);
  }
}
