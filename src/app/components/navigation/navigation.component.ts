import { NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-navigation',
  imports: [NgbCollapseModule, NgClass],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent implements OnInit {

  dataService = inject(DataService);

  isCollapsed = true;
  isDarkTheme = this.dataService.theme(); // Default to light theme

  ngOnInit() {
    this.applyTheme();
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    this.dataService.updateTheme(this.isDarkTheme);
    this.applyTheme();
  }

  private applyTheme() {
    this.isDarkTheme ? document.body.classList.add('dark-theme') : document.body.classList.remove('dark-theme');
  }
}
