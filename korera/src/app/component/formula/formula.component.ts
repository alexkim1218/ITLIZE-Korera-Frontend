import { Component, OnInit } from '@angular/core';


export interface FormulaElement {
  //Additional column data goes in the data array, in order
  name: string,
  costCode: number;
  addData?: string[];
}

export interface ProjectElement {
  //Additional columns go in the data array, in order.
  name: string;
  id: number;
  addCols?: string[];
}

const ELEMENT_DATA: FormulaElement[] = [
  {name: "name1", costCode: 1},
  {name: "name2", costCode: 2}
];

const PROJECT_LIST: ProjectElement[] = [
  {name: "Project 1", id: 1},
  {name: "Project 69", id: 69},
  {name: "Projekt 3", id: 3, addCols: ["additional col1"]},
  {name: "Project 4", id: 4},
  {name: "Project 7", id: 7, addCols: ["additional col1", "additional col2"]}
];

@Component({
  selector: 'app-formula',
  templateUrl: './formula.component.html',
  styleUrls: ['./formula.component.css']
})

export class FormulaComponent implements OnInit {
  dataSource: FormulaElement[];
  projectList: ProjectElement[];
  selectedProject: ProjectElement;
  titleText: string;
  selectedValue: string;
  additionalColumnNames: string[];
  additionalColumnCount: number;

  constructor() { 
    
  }

  ngOnInit() {
    //dataSource is the list of formula names and cost codes
    this.dataSource = ELEMENT_DATA;

    //projectList is the list of project names and IDs
    this.projectList = PROJECT_LIST;

    //Select the first option by default and update the list
    this.selectedValue = this.projectList[0].name;
    this.updateProject();

  }

  updateProject() {
    this.projectList.forEach((project) => {
      if(project.name == this.selectedValue){
        this.selectedProject = project;

        //Check for any additional columns
        if(project.hasOwnProperty('addCols')){
          this.additionalColumnNames = project.addCols;
          this.additionalColumnCount = this.additionalColumnNames.length;
        }
        else{
          this.additionalColumnNames = null;
          this.additionalColumnCount = null;
        }

        //Confirm that the dataSource can be updated dynamically
        this.dataSource = Array.from(ELEMENT_DATA);
        this.dataSource.push({name: this.selectedValue, costCode: this.selectedProject.id});

        //Actual formulaElements should have these already
        //For testing, append them manually if required
        if(this.additionalColumnCount != null){
          this.dataSource.forEach(element => {
            element.addData = [];
            for(let i=0; i < this.additionalColumnCount; i++){
              element.addData.push("additional data" + (i+1));
            }
          });
        }
      }
    });
  }

}
