import { Injectable, signal } from '@angular/core';
import { Goal } from '../models/goal.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  goals = signal<Goal[]>(this.loadInitialGoals());

  readonly goalsList = this.goals.asReadonly();


  constructor() {
    this.loadInitialGoals();
   }

  addGoal(goal: Goal) {
    this.goals.update((goals: Goal[]) =>{
      const updatedGoals = [...goals, goal];
      console.log(updatedGoals);
      localStorage.setItem('goals', JSON.stringify(updatedGoals));
      return updatedGoals;
    });
  }


  private loadInitialGoals(): Goal[] {
    try {
      const savedGoals = localStorage.getItem('goals');
      return savedGoals ? JSON.parse(savedGoals) : [];
    } catch (error) {
      console.error('Error loading goals:', error);
      return [];
    }
  }

  removeGoal(goalTitle: any) {
    try {
      this.goals.update(goals => {
        const updatedGoals = goals.filter(g => g.goalTitle !== goalTitle);
        localStorage.setItem('goals', JSON.stringify(updatedGoals));
        return updatedGoals;
      });
    } catch (error) {
      console.error('Error removing goal:', error);
    }
  }


}
