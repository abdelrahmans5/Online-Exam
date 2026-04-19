import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  readonly diplomas = [
    {
      title: 'Flutter Development',
      description: 'Discover Flutter and build modern mobile apps quickly.',
      theme: 'theme-flutter',
    },
    {
      title: 'AI and ML Development',
      description: 'Explore machine learning, neural networks, and NLP foundations.',
      theme: 'theme-ai',
    },
    {
      title: 'Back-End Web Development',
      description: 'Build scalable APIs and professional backend systems.',
      theme: 'theme-backend',
    },
    {
      title: 'Data Analysis',
      description: 'Become a professional data analyst with hands-on projects.',
      theme: 'theme-data',
    },
    {
      title: 'Software Testing',
      description: 'Master quality assurance and test automation workflows.',
      theme: 'theme-testing',
    },
    {
      title: 'Cyber Security',
      description: 'Protect systems and networks using practical security skills.',
      theme: 'theme-security',
    },
  ];
}
