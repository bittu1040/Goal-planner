import { computed, Injectable, signal } from '@angular/core';
import { Goal } from './src/app/models/goal.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private readonly STORAGE_KEY = 'goals';
  private goalsSignal = signal<Goal[]>(this.loadInitialGoals());

  private readonly THEME_KEY = 'isDarkTheme';
  private themeSignal = signal<boolean>(this.loadInitialTheme());

  goals = computed(() => this.goalsSignal());
  theme = computed(() => this.themeSignal());

  private loadInitialGoals(): Goal[] {
    const storedGoals = localStorage.getItem(this.STORAGE_KEY);
    return storedGoals ? JSON.parse(storedGoals) : [];
  }

  private loadInitialTheme(): boolean {
    const storedTheme = localStorage.getItem(this.THEME_KEY);
    return storedTheme ? JSON.parse(storedTheme) : false;
  }

  private updateLocalStorage(goals: Goal[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(goals));
    this.goalsSignal.set(goals);
  }

  updateTheme(isDark: boolean): void {
    localStorage.setItem(this.THEME_KEY, JSON.stringify(isDark));
    this.themeSignal.set(isDark);
  }

  addGoal(goal: Goal): void {
    const currentGoals = this.goalsSignal();
    const newGoals = [...currentGoals, goal];
    this.updateLocalStorage(newGoals);
  }

  archiveGoal(goalToArchive: Goal): void {
    const currentGoals = this.goalsSignal();
    const updatedGoals = currentGoals.map(goal => 
      goal === goalToArchive ? { ...goal, goalState: 'archived' as 'archived' } : goal
    );
    this.updateLocalStorage(updatedGoals);
  }

  arctiveGoal(goalToArchive: Goal): void {
    const currentGoals = this.goalsSignal();
    const updatedGoals = currentGoals.map(goal => 
      goal === goalToArchive ? { ...goal, goalState: 'active' as 'active' } : goal
    );
    this.updateLocalStorage(updatedGoals);
  }
  
  removeGoal(goalToRemove: Goal): void {
    const currentGoals = this.goalsSignal();
    const updatedGoals = currentGoals.filter(goal => goal !== goalToRemove);
    this.updateLocalStorage(updatedGoals);
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
