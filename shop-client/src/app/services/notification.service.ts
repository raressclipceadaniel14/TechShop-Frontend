import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  message: string | null = null;

  showNotification(message: string, duration: number = 5000): void {
    this.message = message;
    setTimeout(() => {
      this.message = null;
    }, duration);
  }
}
