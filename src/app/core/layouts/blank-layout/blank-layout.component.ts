import { Component, inject, signal, effect } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthStateService } from '../../services/auth-state.service';

@Component({
  selector: 'app-blank-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './blank-layout.component.html',
  styleUrl: './blank-layout.component.css',
})
export class BlankLayoutComponent {
  private authStateService = inject(AuthStateService);

  user = signal({
    firstName: 'Guest',
    email: 'user@example.com',
  });

  readonly mainLinks = [
    { label: 'Diplomas', route: '/home' },
    { label: 'Account Settings', route: '/account' },
  ];

  constructor() {
    // Update user signal when auth state changes
    effect(() => {
      const currentUser = this.authStateService.getUser();
      if (currentUser) {
        this.user.set({
          firstName: currentUser.firstName,
          email: currentUser.email,
        });
      }
    });
  }
}

