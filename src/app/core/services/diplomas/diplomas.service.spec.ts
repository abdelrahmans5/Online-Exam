import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

import { DiplomasService } from './diplomas.service';

describe('DiplomasService', () => {
  let service: DiplomasService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()],
    });
    service = TestBed.inject(DiplomasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
