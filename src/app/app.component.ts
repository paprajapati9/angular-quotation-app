import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'web-project';
  activeTab = 'create-quotation';

  changeActiveTab(tab: string) {
    this.activeTab = tab;
  }
}
