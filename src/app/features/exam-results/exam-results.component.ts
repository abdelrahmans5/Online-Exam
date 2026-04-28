import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DiplomasService } from '../../core/services/diplomas/diplomas.service';
import { SubmissionResult } from '../../core/models/question.interface';

@Component({
    selector: 'app-exam-results',
    imports: [RouterLink],
    templateUrl: './exam-results.component.html',
    styleUrl: './exam-results.component.css',
})
export class ExamResultsComponent implements OnInit {
    private readonly route = inject(ActivatedRoute);
    private readonly router = inject(Router);
    private readonly diplomasService = inject(DiplomasService);

    readonly examId = this.route.snapshot.paramMap.get('examId') ?? 'css';
    readonly diplomaId = this.route.snapshot.queryParamMap.get('diplomaId') ?? 'frontend';
    diplomaTitle = 'Diploma';

    score = {
        correct: 0,
        wrong: 0,
        total: 0,
    };

    answers: any[] = [];

    ngOnInit(): void {
        this.loadDiplomaTitle();
        this.loadResultsFromState();
    }

    private loadDiplomaTitle(): void {
        this.diplomasService.getDiplomasById(this.diplomaId).subscribe({
            next: (response) => {
                this.diplomaTitle = response.payload?.data?.[0]?.title ?? 'Diploma';
            },
            error: () => {
                this.diplomaTitle = 'Diploma';
            },
        });
    }

    private loadResultsFromState(): void {
        const navigation = this.router.getCurrentNavigation();
        if (navigation?.extras?.state?.result) {
            const result: SubmissionResult = navigation.extras.state.result;
            this.score.correct = result.correctAnswers;
            this.score.wrong = result.totalQuestions - result.correctAnswers;
            this.score.total = result.totalQuestions;

            this.answers = result.correctAnswersList || [];
        }
    }

    get scorePercent(): number {
        return this.score.total === 0 ? 0 : Math.round((this.score.correct / this.score.total) * 100);
    }

    get progressWidth(): string {
        return this.score.total === 0 ? '0%' : `${Math.round((this.score.correct / this.score.total) * 100)}%`;
    }
}
