import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-goal-form',
  imports: [FormsModule],
  templateUrl: './goal-form.component.html',
  styleUrl: './goal-form.component.scss'
})
export class GoalFormComponent {

  goalText = '';

  addGoal() {
    if (this.goalText.trim()) {
      console.log('New goal:', this.goalText);
      this.goalText = '';
    }
  }
}
