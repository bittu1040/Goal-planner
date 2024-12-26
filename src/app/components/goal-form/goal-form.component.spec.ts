import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalFormComponent } from './goal-form.component';

describe('GoalFormComponent', () => {
  let component: GoalFormComponent;
  let fixture: ComponentFixture<GoalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoalFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
