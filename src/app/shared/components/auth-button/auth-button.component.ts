import { Component, input } from '@angular/core';

@Component({
    selector: 'app-auth-button',
    imports: [],
    templateUrl: './auth-button.component.html',
    styleUrl: './auth-button.component.css',
})
export class AuthButtonComponent {
    type = input<'button' | 'submit'>('button');
    label = input.required<string>();
    disabled = input<boolean>(false);
    iconClass = input<string>('');
}
