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
  //Some dummy formula data to test with
  {name: "name1", costCode: 1},
  {name: "name2", costCode: 2}
];

const PROJECT_LIST: ProjectElement[] = [
  //Some dummy project data to test with
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
  //dataSource is the current list of formulas being worked with. Should corispond to the current project
  dataSource: FormulaElement[];
  //Project list is the list of all projects. Should be fetched once from the server.
  projectList: ProjectElement[];
  selectedProject: ProjectElement;
  selectedValue: string;
  additionalColumnNames: string[];
  additionalColumnCount: number;

  ngOnInit() {
    //Set the dummy data
    this.dataSource = ELEMENT_DATA;
    this.projectList = PROJECT_LIST;

    //Select the first option by default and update the list
    this.selectedValue = this.projectList[0].name;
    this.updateProject();
  }

  updateProject() {
    //Called when selecting a new project from the drop down
    //Updates the number of columns and the lables.
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
        this.dataSource = JSON.parse(JSON.stringify(ELEMENT_DATA))
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

  updateFormulaData(){
    //When connected to backend, will update the resources with the new
    //information typed from the user.
    console.log(this.dataSource)
  }

  editData($event){
    //Called when an editable field is focused
    //Trims the whitespace that can be generated on some browsers when editing
    //Also moves the curser to the end and fixes the reverse-text issue
    let text: string = $event.target.textContent;
    text = text.trim();
    $event.target.textContent = text;
    
    //Move the cursor to the end of the document.
    let range = document.createRange();
    range.setStart($event.target, 1);
    range.collapse(true);
    let sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }

  cleanData($event){
    //Called when an editable element loses focus (blur).
    //Should remove newlines and trim whitespace from the ends.
    let text: string = $event.target.textContent;
    text = text.replace(/(\r\n|\n|\r)/gm, "");
    text = text.trim();
    if(text.length > 256){
      text = text.substr(0, 256);
    }
    $event.target.textContent = text;
  }

  cleanIntData($event){
    //Called when an editable element loses focus (blur).
    //Used in place of cleanData() when the input needs to be an integer
    let text: string = $event.target.textContent;
    text = text.replace(/(\r\n|\n|\r)/gm, "");
    text = text.trim();
    if(text.length > 256){
      text = text.substr(0, 256);
    }
    if(this.isNumeric(text) && parseInt(text).toString() != "NaN"){
      $event.target.textContent = parseInt(text).toString();
    }
    else{
      //Text can't be convertered to int and is invalid.
      $event.target.textContent = "";
      alert("Error: Data must be an integer");
    }
  }

  isNumeric(input){
    //Helper function for cleanIntData
    //Returns true if the given string is an integer, else returns false
    return !isNaN(input);
  }
}
