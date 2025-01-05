export interface Goal {
    goalTitle?: string;
    goalMonth: string;
    goalText: string;
    goalState: 'active' | 'archived';
  }