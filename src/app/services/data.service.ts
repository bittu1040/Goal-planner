import { computed, Injectable, signal } from '@angular/core';
import { Goal } from '../models/goal.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private readonly STORAGE_KEY = 'goals';
  private goalsSignal = signal<Goal[]>(this.loadInitialGoals());

  goals = computed(() => this.goalsSignal());

  private loadInitialGoals(): Goal[] {
    const storedGoals = localStorage.getItem(this.STORAGE_KEY);
    return storedGoals ? JSON.parse(storedGoals) : [];
  }

  addGoal(goal: Goal): void {
    const currentGoals = this.goalsSignal();
    const newGoals = [...currentGoals, goal];
    this.goalsSignal.set(newGoals);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(newGoals));
  }


  removeGoalByIndex(index: number) {
    // try {
    //   this.goals.update(goals => {
    //     const updatedGoals = goals.filter((_, i) => i !== index);
    //     localStorage.setItem('goals', JSON.stringify(updatedGoals));
    //     return updatedGoals;
    //   });
    // } catch (error) {
    //   console.error('Error removing goal:', error);
    // }
  }

  filterGoals(filter: string) {
    // this.goals.update(goals => {
    //   const filteredGoals = goals.filter(goal => goal.goalState === filter);
    //   return filteredGoals;
    // });
  }

}
