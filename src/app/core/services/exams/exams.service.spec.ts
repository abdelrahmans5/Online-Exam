import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { ExamsService } from './exams.service';

describe('ExamsService', () => {
  let service: ExamsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ExamsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
