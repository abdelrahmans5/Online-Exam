import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { BlankLayoutComponent } from './blank-layout.component';

describe('BlankLayoutComponent', () => {
  let component: BlankLayoutComponent;
  let fixture: ComponentFixture<BlankLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlankLayoutComponent],
      providers: [provideRouter([])],
    })
      .compileComponents();

    fixture = TestBed.createComponent(BlankLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
