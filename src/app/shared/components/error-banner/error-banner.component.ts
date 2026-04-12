import { Component, input } from '@angular/core';

@Component({
    selector: 'app-error-banner',
    imports: [],
    templateUrl: './error-banner.component.html',
    styleUrl: './error-banner.component.css',
})
export class ErrorBannerComponent {
    show = input<boolean>(false);
    message = input<string>('Something went wrong');
}
