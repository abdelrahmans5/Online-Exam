import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthSideComponent } from './auth-side/auth-side.component';

@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet, AuthSideComponent],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.css',
})
export class AuthLayoutComponent {

}
