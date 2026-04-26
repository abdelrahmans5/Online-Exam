import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-exam-questions',
    imports: [FormsModule, RouterLink],
    templateUrl: './exam-questions.component.html',
    styleUrl: './exam-questions.component.css',
})
export class ExamQuestionsComponent {
    private readonly route = inject(ActivatedRoute);
    private readonly router = inject(Router);

    readonly examId = this.route.snapshot.paramMap.get('examId') ?? 'css';
    selectedAnswer = '';
    currentQuestionIndex = 1;
    totalQuestions = 25;
    timerDisplay = '05:13';
    timerProgress = 84;

    readonly question = {
        text: 'What does CSS stand for?',
        options: ['Creative Style Sheet', 'Cascading Style Sheet', 'Colorful Style Sheet', 'Computer Style Sheet'],
    };

    get progressWidth(): string {
        return `${Math.round((this.currentQuestionIndex / this.totalQuestions) * 100)}%`;
    }

    submitAndNext(): void {
        if (!this.selectedAnswer) {
            return;
        }

        this.router.navigate(['/exams', this.examId, 'results']);
    }
}
