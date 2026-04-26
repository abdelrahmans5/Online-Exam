import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
    selector: 'app-exams',
    imports: [RouterLink],
    templateUrl: './exams.component.html',
    styleUrl: './exams.component.css',
})
export class ExamsComponent {
    private readonly route = inject(ActivatedRoute);

    readonly diplomaId = computed(() => this.route.snapshot.paramMap.get('diplomaId') ?? 'frontend');

    readonly exams = [
        {
            id: 'html',
            title: 'HTML Exam',
            description:
                'Build the backbone of the web with HTML, the fundamental markup language behind every website and web application.',
            icon: 'HTML',
            accent: 'accent-html',
        },
        {
            id: 'css',
            title: 'CSS Exam',
            description:
                'Unlock the power of Cascading Style Sheets and learn to transform plain markup into visually stunning, responsive pages.',
            icon: 'CSS',
            accent: 'accent-css',
        },
        {
            id: 'javascript',
            title: 'JavaScript Exam',
            description:
                'Bring your web pages to life with JavaScript and the core skills used for interactive, dynamic front-end development.',
            icon: 'JS',
            accent: 'accent-js',
        },
        {
            id: 'react',
            title: 'React Exam',
            description:
                'Dive into React, the component-based library for building modern interfaces, managing state, and composing reusable UIs.',
            icon: '⚛',
            accent: 'accent-react',
        },
        {
            id: 'angular',
            title: 'Angular Exam',
            description:
                'Master Angular, Google\'s framework for building large-scale single-page applications with architecture and dependency injection.',
            icon: 'A',
            accent: 'accent-angular',
        },
        {
            id: 'vue',
            title: 'Vue Exam',
            description:
                'Discover Vue.js, the progressive framework known for flexibility, intuitive APIs, and a gentle learning curve.',
            icon: 'V',
            accent: 'accent-vue',
        },
    ];
}
