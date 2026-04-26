import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
    selector: 'app-exam-results',
    imports: [RouterLink],
    templateUrl: './exam-results.component.html',
    styleUrl: './exam-results.component.css',
})
export class ExamResultsComponent {
    private readonly route = inject(ActivatedRoute);

    readonly examId = this.route.snapshot.paramMap.get('examId') ?? 'css';

    readonly score = {
        correct: 20,
        wrong: 5,
        total: 25,
    };

    readonly answers = [
        {
            question: 'What does CSS stand for?',
            correct: 'Cascading Style Sheets',
            selected: 'Computer Style Sheets',
            isCorrect: false,
        },
        {
            question: 'What does CSS stand for?',
            correct: 'Cascading Style Sheets',
            selected: 'Cascading Style Sheets',
            isCorrect: true,
        },
        {
            question: 'What does CSS stand for?',
            correct: 'Cascading Style Sheets',
            selected: 'Computer Style Sheets',
            isCorrect: false,
        },
        {
            question: 'What does CSS stand for?',
            correct: 'Cascading Style Sheets',
            selected: 'Cascading Style Sheets',
            isCorrect: true,
        },
    ];

    get scorePercent(): number {
        return Math.round((this.score.correct / this.score.total) * 100);
    }

    get progressWidth(): string {
        return `${Math.round((this.score.correct / this.score.total) * 100)}%`;
    }
}
