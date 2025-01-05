import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-goal-form',
  imports: [ReactiveFormsModule],
  templateUrl: './goal-form.component.html',
  styleUrl: './goal-form.component.scss'
})
export class GoalFormComponent {

  goalForm: FormGroup;
  wordCount: number = 0;
  wordLimit: number = 50;
  dataService= inject(DataService);
 

  months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  constructor(private fb: FormBuilder) {
    this.goalForm = this.fb.group({
      goalMonth: ['January', Validators.required],
      goalTitle: ['JavaScript', Validators.required],
      goalText: ['Revise ES6', [Validators.required, Validators.maxLength(this.wordLimit * 6)]],
      goalState: ['active', Validators.required]
    });

    this.goalForm.get('goalText')?.valueChanges.subscribe(() => {
      this.checkWordLimit();
    });
  }

  checkWordLimit() {
    const goalText = this.goalForm.get('goalText')?.value || '';
    this.wordCount = goalText.split(/\s+/).filter((word:any) => word.length > 0).length;
  }

  onSubmit() {
    if (this.goalForm.valid && this.wordCount <= this.wordLimit) {
      const goal = this.goalForm.value;
      this.dataService.addGoal(goal);
      this.wordCount = 0;
      this.goalForm.get('goalText')?.setValue('');
      this.goalForm.get('goalTitle')?.setValue('');
     }
  }
}
