import { Component,  OnInit, OnDestroy } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ResourceService } from '../../service/resource.service';
import { ProjectSelectorService } from '../../service/project-selector.service';
import { Resource } from '../../resource';
import { Project } from '../../project';
import { Router } from '@angular/router';
import { switchMap, flatMap, takeUntil } from 'rxjs/operators';
import { Subscription, Subject } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css']
})

export class ResourceComponent implements  OnInit, OnDestroy {

  tableHeader: string[] = ['RESOURCE NAME', 'RESOURCE CODE', 'RESOURCE DATA'];
  table: Resource[];
  search: Resource[];
  addingRow = true;
  closeResult: string;
  csvContent: string;
  currProject: Project;
  public currProjObs: Subscription;
  private ngUnsubscribe = new Subject();
  constructor(private modalService: NgbModal,
              private resourceService: ResourceService,
              private projectSelectorService: ProjectSelectorService,
              private router: Router) {}

  ngOnInit() {
    console.log('on init (resource page) called');

    this.currProjObs = this.projectSelectorService.currentProjectObs()
    .pipe(flatMap ( project => {
      console.log('flat map');
      return this.resourceService.getProjectResources(project.projectId);
    }))
    .subscribe(
      resResource => {
        this.table = resResource;
        this.search = this.table;
        console.log(this.search);
      },
      error => {
        if ( error.status === 401 ) {
          alert('You are not logged in or session timed out');
          this.router.navigateByUrl('/login');
        }
      }
    );

    this.projectSelectorService.updateCurrentProject();


  }

  ngOnDestroy() {
    console.log('unsub');
    this.currProjObs.unsubscribe();
  }

  filterSearch(searchString: any) {
    this.search = this.table.filter(s => s.resourceName.toLowerCase().includes(searchString.value.toLowerCase()));
  }

  setAddRow(val: boolean) {
    this.addingRow = val;
  }

  addRow(addRowElem: any) {
    // TODO
    // console.log(resourceNameInput.value);
    // console.log(resourceCodeInput.value);

    // use service to add row
    console.log(addRowElem);

    this.setAddRow(false);
  }

  openColumnModal( content: any ) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;

    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  importCsv(inputFile: HTMLInputElement) {
    const files = inputFile.files;
    if (files && files.length) {
      const fileToRead = files[0];
      const fileReader = new FileReader();
      fileReader.onload = this.onFileLoad;
      fileReader.readAsText(fileToRead, 'UTF-8');
   }
  }

  onFileLoad(fileLoadedEvent) {
    const textFromFileLoaded = fileLoadedEvent.target.result;
    this.csvContent = textFromFileLoaded;
    console.log( this.csvContent );

    const arrContent = this.csvContent.split('\n');
    const title = arrContent[0].split(',');
    const values = [];
    for (let i = 1; i < arrContent.length; i++) {
      values.push(arrContent[i].split(','));
    }

    console.log(title);
    console.log(values);

    // TODO: reset all resources and add resource here

  }

  addColumn(colName: HTMLInputElement) {
    console.log(typeof colName.value);
  }



}
