import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DiplomasService } from '../../core/services/diplomas/diplomas.service';
import { ExamsService } from '../../core/services/exams/exams.service';
import { Exam } from '../../core/models/exams.interface';

@Component({
    selector: 'app-exams',
    imports: [RouterLink],
    templateUrl: './exams.component.html',
    styleUrl: './exams.component.css',
})
export class ExamsComponent implements OnInit {
    private readonly route = inject(ActivatedRoute);
    private readonly diplomasService = inject(DiplomasService);
    private readonly examsService = inject(ExamsService);

    readonly diplomaId = this.route.snapshot.paramMap.get('diplomaId') ?? 'diplomaIdNotFound';
    diplomaTitle = 'Diploma';
    diplomaDescription = '';
    diplomaImage = '';
    exams: Exam[] = [];

    ngOnInit(): void {
        this.loadDiplomaDetails();
        this.loadDiplomaExams();
    }

    private loadDiplomaDetails(): void {
        this.diplomasService.getDiplomasById(this.diplomaId).subscribe({
            next: (response) => {
                const diploma = response.payload?.data?.[0];
                this.diplomaTitle = diploma?.title ?? 'Diploma';
                this.diplomaDescription = diploma?.description ?? '';
                this.diplomaImage = diploma?.image ?? '';
            },
            error: (err) => {
                console.error('Failed to load diploma details', err);
                this.diplomaTitle = 'Diploma';
                this.diplomaDescription = '';
                this.diplomaImage = '';
            },
        });
    }


    private loadDiplomaExams(): void {
        this.examsService.getDiplomaExams(this.diplomaId).subscribe({
            next: (response) => {
                this.exams = response.payload?.data ?? [];
            },
            error: (err) => {
                console.error('Failed to load diploma exams', err);
                this.exams = [];
            },
        });
    }
}
