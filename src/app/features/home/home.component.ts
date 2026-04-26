import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  readonly diplomas = [
    {
      id: 'frontend',
      title: 'Flutter Development',
      description: 'Discover Flutter and build modern mobile apps quickly.',
      theme: 'theme-flutter',
    },
    {
      id: 'ai',
      title: 'AI and ML Development',
      description: 'Explore machine learning, neural networks, and NLP foundations.',
      theme: 'theme-ai',
    },
    {
      id: 'backend',
      title: 'Back-End Web Development',
      description: 'Build scalable APIs and professional backend systems.',
      theme: 'theme-backend',
    },
    {
      id: 'data',
      title: 'Data Analysis',
      description: 'Become a professional data analyst with hands-on projects.',
      theme: 'theme-data',
    },
    {
      id: 'qa',
      title: 'Software Testing',
      description: 'Master quality assurance and test automation workflows.',
      theme: 'theme-testing',
    },
    {
      id: 'security',
      title: 'Cyber Security',
      description: 'Protect systems and networks using practical security skills.',
      theme: 'theme-security',
    },
  ];
}
