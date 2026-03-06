import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatenewPassComponent } from './createnew-pass.component';

describe('CreatenewPassComponent', () => {
  let component: CreatenewPassComponent;
  let fixture: ComponentFixture<CreatenewPassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatenewPassComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatenewPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
