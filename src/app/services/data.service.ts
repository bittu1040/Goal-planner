import { Injectable, signal } from '@angular/core';
import { Goal } from '../models/goal.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  goals = signal<Goal[]>([
    // { goalTitle: 'Goal 1', goalText: 'Description of Goal 1', goalMonth: 'Date 1' },
    // { goalTitle: 'Goal 2', goalText: 'Description of Goal 2', goalMonth: 'Date 2' },
    // { goalTitle: 'Goal 3', goalText: 'Description of Goal 3', goalMonth: 'Date 3' },
    // { goalTitle: 'Goal 4', goalText: 'Description of Goal 4', goalMonth: 'Date 4' },
    // { goalTitle: 'Goal 5', goalText: 'Description of Goal 5', goalMonth: 'Date 5' },
    // { goalTitle: 'Goal 6', goalText: 'Description of Goal 6', goalMonth: 'Date 6' }
  ]);

  constructor() { }

  getGoals() {
    return this.goals();
  }

  addGoal(goal: Goal) {
    this.goals.update(goals => [...goals, goal]);
    console.log(this.goals());
  }

  removeGoal(goal: Goal) {
    this.goals.update(goals => goals.filter(g => g.goalTitle !== goal.goalTitle));
  }


}
