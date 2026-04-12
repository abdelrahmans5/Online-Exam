import { Component, input } from '@angular/core';

@Component({
    selector: 'app-auth-stepper',
    imports: [],
    templateUrl: './auth-stepper.component.html',
    styleUrl: './auth-stepper.component.css',
})
export class AuthStepperComponent {
    steps = input<number>(4);
    activeStep = input<number>(1);

    get stepIndexes(): number[] {
        return Array.from({ length: this.steps() }, (_, index) => index + 1);
    }
}
