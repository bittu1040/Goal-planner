import { Component, inject } from '@angular/core';
import { DataService } from '../../services/data.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-timeline',
  imports: [],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss',
})
export class TimelineComponent {
  Math = Math;
  dataService = inject(DataService);

  downloadGoals(format: string) {
    // Collect user input
    const userName = prompt('Please enter your name:');
    const linkedinProfile = prompt('Please enter your LinkedIn profile URL:');

    if (!userName || !linkedinProfile) {
      alert('Name and LinkedIn profile are required!');
      return;
    }

    // Dynamically add a header with user details
    const element = document.querySelector(
      '.timeline-container'
    ) as HTMLElement;

    // Create a header section with user details
    const header = document.createElement('div');
    header.style.marginBottom = '20px';
    header.style.textAlign = 'center';
    header.style.borderBottom = '1px solid #ccc';
    header.style.paddingBottom = '10px';
    header.innerHTML = `
    <h2>${userName}</h2>
    <p><strong>LinkedIn:</strong> <a href="${linkedinProfile}" target="_blank">${linkedinProfile}</a></p>
  `;

    // Prepend the header to the timeline-container
    element.prepend(header);

    // Generate the canvas and download
    html2canvas(element).then((canvas) => {
      if (format === 'png') {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'goals.png';
        link.click();
      } else if (format === 'pdf') {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = (canvas.height * pageWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, pageHeight);
        pdf.save('goals.pdf');
      }
      // Remove the temporary header after download
      header.remove();
    });
  }
}
