import { Component } from '@angular/core';
import { GoalFormComponent } from '../goal-form/goal-form.component';
import { TimelineComponent } from '../timeline/timeline.component';

@Component({
  selector: 'app-home',
  imports: [GoalFormComponent, TimelineComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
