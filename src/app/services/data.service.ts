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

  removeGoalByIndex(index: number) {
    try {
      this.goals.update(goals => {
        const updatedGoals = goals.filter((_, i) => i !== index);
        localStorage.setItem('goals', JSON.stringify(updatedGoals));
        return updatedGoals;
      });
    } catch (error) {
      console.error('Error removing goal:', error);
    }
  }

  filterGoals(filter: string) {
    // this.goals.update(goals => {
    //   const filteredGoals = goals.filter(goal => goal.goalState === filter);
    //   return filteredGoals;
    // });
  }

}
