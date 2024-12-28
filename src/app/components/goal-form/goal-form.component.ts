import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgLabelTemplateDirective, NgOptionTemplateDirective, NgSelectComponent } from '@ng-select/ng-select';


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
 

  months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  constructor(private fb: FormBuilder) {
    this.goalForm = this.fb.group({
      goalMonth: ['January', Validators.required],
      goalText: ['', [Validators.required, Validators.maxLength(this.wordLimit * 6)]]
    });

    this.goalForm.get('goalText')?.valueChanges.subscribe(() => {
      this.checkWordLimit();
    });
  }

  checkWordLimit() {
    console.log('Checking word limit...');
    const goalText = this.goalForm.get('goalText')?.value || '';
    this.wordCount = goalText.split(/\s+/).filter((word:any) => word.length > 0).length;
  }

  onSubmit() {
    if (this.goalForm.valid && this.wordCount <= this.wordLimit) {
      const goal = this.goalForm.value;
      console.log('Goal submitted:', goal);
      this.goalForm.reset();
      this.wordCount = 0;
    }
  }
}
