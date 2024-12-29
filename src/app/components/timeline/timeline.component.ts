import { Component, inject } from '@angular/core';
import { DataService } from '../../services/data.service';



@Component({
  selector: 'app-timeline',
  imports: [],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss'
})
export class TimelineComponent {
  Math= Math;
  dataService= inject(DataService);
  constructor() { }
  ngOnInit() {
  }

  downloadGoals(format: string) { 
  }

}
