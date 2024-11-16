import { Injectable } from '@angular/core';
import { UserSession } from '../models/UserSession';
import { UserRoleEnum } from '../enums/UserRoleEnum';

const USER_KEY = 'usersession';
const TOKEN_KEY = 'usertoken';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  userSession: UserSession = null;
  constructor() {
    this.loadUser();
  }

  loadUser() {
    if (!this.userSession) {
      let cookie = this.getCookie(USER_KEY);
      if (cookie) {
        const user = JSON.parse(cookie);
        if (user) {
          this.userSession = user;
        }
      } else {
        cookie = this.getCookie(TOKEN_KEY);
        if (cookie) {
          this.userSession = new UserSession();
          this.userSession.token = cookie;
        }
      }
    }
  }

  updateUserSession(firstName: string, lastName: string, email: string) {
    if (this.userSession) {
      this.startSession(this.userSession);
    }
  }

  startSession(session: UserSession) {
    this.userSession = session;
    localStorage.setItem(USER_KEY, JSON.stringify(this.userSession));
    this.setCookie(USER_KEY, JSON.stringify(this.userSession));
  }

  endSession() {
    this.userSession = null;
    localStorage.removeItem(USER_KEY);
    this.deleteCookie(USER_KEY);
  }

  isUserLoggedIn(): boolean {
    return this.userSession != null;
  }

  isUser(): boolean {
    if (this.userRole != null) {
      return this.userRole == UserRoleEnum.User;
    } else {
      return false;
    }
  }

  isAdmin(): boolean {
    if (this.userRole != null) {
      return this.userRole == UserRoleEnum.Admin;
    } else {
      return false;
    }
  }

  setCookie(name: string, val: string) {
    const date = new Date();
    const value = val;

    // Set it expire in 1 day
    date.setTime(date.getTime() + 24 * 60 * 60 * 1000);

    // Set it
    document.cookie =
      name + '=' + value + '; expires=' + date.toUTCString() + '; path=/';
  }

  getCookie(name: string) {
    const value = '; ' + document.cookie;
    const parts = value.split('; ' + name + '=');

    if (parts.length === 2) {
      // @ts-ignore
      return parts.pop().split(';').shift();
    }
    return '';
  }

  deleteCookie(name: string) {
    const date = new Date();

    // Set it expire in -1 days
    date.setTime(date.getTime() + -1 * 24 * 60 * 60 * 1000);

    // Set it
    document.cookie = name + '=; expires=' + date.toUTCString() + '; path=/';
  }

  get userFirstName() {
    return this.userSession.firstName;
  }

  get userLastName() {
    return this.userSession.lastName;
  }

  get userRole() {
    if (this.userSession != null) {
      return this.userSession.roleId;
    }
    return null;
  }

  get userId() {
    if (this.userSession != null) {
      return this.userSession.id;
    }
    return null;
  }

  get userEmail() {
    if (this.userSession != null) {
      return this.userSession.email;
    }
    return null;
  }
}
