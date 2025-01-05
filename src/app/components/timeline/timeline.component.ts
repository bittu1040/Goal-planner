import { Component, computed, inject, signal } from '@angular/core';
import { DataService } from '../../services/data.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { FormsModule } from '@angular/forms';
import { Goal } from '../../models/goal.model';

@Component({
  selector: 'app-timeline',
  imports: [FormsModule],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss',
})
export class TimelineComponent {
  Math = Math;
  dataService = inject(DataService);

  showActive = signal(true);
  showArchived = signal(true);
  goals = this.dataService.goals;

  filteredGoals = computed(() => 
    this.goals().filter(goal => 
      (goal.goalState === 'active' && this.showActive()) || 
      (goal.goalState === 'archived' && this.showArchived())
    )
  );

  onActionClick(goal: Goal): void {
    if (goal.goalState === 'active') {
      const confirmArchive = window.confirm(
        'Are you sure you want to archive this goal?'
      );
      if (confirmArchive) {
        this.dataService.archiveGoal(goal);
      }
    } else {
      const confirmRemove = window.confirm(
        'This goal is already archived. Are you sure you want to remove it?'
      );
      if (confirmRemove) {
        this.dataService.removeGoal(goal);
        window.alert('The goal has been removed.');
      }
    }
  }


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
