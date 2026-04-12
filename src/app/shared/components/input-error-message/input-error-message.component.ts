import { Component, input } from '@angular/core';

@Component({
    selector: 'app-input-error-message',
    imports: [],
    templateUrl: './input-error-message.component.html',
    styleUrl: './input-error-message.component.css',
})
export class InputErrorMessageComponent {
    show = input<boolean>(false);
    message = input<string>('');
    centered = input<boolean>(false);
}
