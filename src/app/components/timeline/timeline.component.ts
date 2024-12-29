import { Component, inject } from '@angular/core';
import { DataService } from '../../services/data.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


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
    const element = document.querySelector('.timeline-container') as HTMLElement;
    if (format === 'png') {
      html2canvas(element).then(canvas => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'goals.png';
        link.click();
      });
    } else if (format === 'pdf') {
      html2canvas(element).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
        pdf.save('goals.pdf');
      });
    }
  }

}
