import { Component } from '@angular/core';
import { Project } from './component/project/project'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'korera';
  currentProject: Project;
}
