import { Component,  OnInit, OnDestroy } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ResourceService } from '../../service/resource.service';
import { ProjectSelectorService } from '../../service/project-selector.service';
import { Resource } from '../../resource';
import { Project } from '../../project';
import { Router } from '@angular/router';
import { flatMap } from 'rxjs/operators';
import { Subscription, Subject } from 'rxjs';
import { NgForm } from '@angular/forms';
import { FnParam } from '@angular/compiler/src/output/output_ast';
import { ValueTransformer } from '@angular/compiler/src/util';

@Component({
  selector: 'app-resource-new',
  templateUrl: './resource-new.component.html',
  styleUrls: ['./resource-new.component.css']
})
export class ResourceNewComponent implements OnInit, OnDestroy {

  currProjObs: Subscription;
  currProject: Project;
  table: Resource[];
  resources: Resource[];

  // FOR FILTERED SEARCH
  search = this.table;
  tableHeader: string[] = ['RESOURCE NAME', 'RESOURCE CODE'];

  page = 1;
  pageSize = 4;
  collectionSize: number;

  // FOR ADDING ROW
  addingRow = true;

  // FOR ADD COLUMN
  closeResult: string;

  // FOR IMPORTING CSV
  csvContent: string;

  constructor(private modalService: NgbModal,
              private resourceService: ResourceService,
              private projectSelectorService: ProjectSelectorService,
              private router: Router) { }

  ngOnInit() {
    console.log('on init (resource page) called');

    this.currProjObs = this.projectSelectorService.currentProjectObs()
    .pipe(flatMap ( project => {
      console.log('flat map');
      this.currProject = project;
      console.log('CURRENT PROJECT');
      console.table(this.currProject);

      if (this.currProject.extraCols) {
        const extraColsList: string[] = this.currProject.extraCols.split(',');
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < extraColsList.length; i++) {
          this.tableHeader.push(extraColsList[i]);
        }
      }

      return this.resourceService.getProjectResources(project.projectId);
    }))
    .subscribe(
      resResource => {
        this.table = resResource;
        this.search = this.table;

        this.collectionSize = this.search.length;

        // for table view
        this.updateResourceTable();
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

  parsedcols(res: Resource): string[] {
    if (this.currProject.extraCols === '') {
      return null;
    } else if (res.extraColsVal === '') {
      const emptyCols: string[] = [];
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.currProject.extraCols.split(',').length; i++) {
        emptyCols.push('');
      }
      return emptyCols;
    }
    return res.extraColsVal.split(',');
  }

  // FILTERED SEARCH
  filterSearch(searchString: any) {
    this.search = this.table.filter(s => s.resourceName.toLowerCase().includes(searchString.value.toLowerCase()));
    this.updateResourceTable();
    this.collectionSize = this.search.length;
  }

  updateResourceTable() {
    console.log('UPDATE RESOURCE TABLE CALLED');
    console.log(this.page);
    this.resources = this.search
        .map((resource, i) => ({id: i + 1, ...resource}))
        .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  get resourcesList(): Resource[] {
    if (this.search) {
      return this.search.map((resource, i) => ({id: i + 1, ...resource}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
    }
    return [];
  }

  // ADD COLUMN METHODS
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

  addColumn(colName: HTMLInputElement) {
    this.resourceService.addColumn(this.currProject.projectId , colName.value, 'text').subscribe(resp => {
      console.log(resp);
      // this.tableHeader.push(colName.value);
    });
  }

  // IMPORT CSV
  addCsvToDatabase(title: string[], values: any[]) {

    // TODO: reset all resources and add resource here
    console.log('INSIDE ADD CSV TO DATABASE');
    this.resourceService.resetProjectResources(this.currProject.projectId).subscribe();
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < values.length; i++) {
      // parse extra cols
      let extraCols = '';
      for ( let j = 2; j < values[i].length; j++) {
        if ( j === 2) {
          extraCols += values[i][j];
        } else {
          extraCols += ',' + values[i][j];
        }
      }

      const res: Resource = ({
        resourceId: 0,
        resourceName: values[i][1],
        resourceCode: values[i][0],
        extraColsVal: extraCols,
      });
      this.resourceService.addRow(this.currProject.projectId, res).subscribe();

    }
  }

  importCsv(inputFile: HTMLInputElement) {
    const files = inputFile.files;
    if (files && files.length) {
      const fileToRead = files[0];
      const fileReader = new FileReader();
      fileReader.onload = (e) => { this.onFileLoad(e); };
      fileReader.readAsText(fileToRead, 'UTF-8');
   }
  }

  onFileLoad(fileLoadedEvent) {
    const textFromFileLoaded = fileLoadedEvent.target.result;
    this.csvContent = textFromFileLoaded;
    // console.log( this.csvContent );

    const arrContent = this.csvContent.split('\n');

    const title = arrContent[0].split(',');
    const values = [];
    for (let i = 1; i < arrContent.length; i++) {
      values.push(arrContent[i].split(','));
    }


    // this.resourceService.deleteAllResources().subscribe(
    //   res => {
    //     // update project table (extra cols)
    //     this.resourceService.resetColumn(this.currProject.projectId).subscribe();
    //     for (let i = 2; i < title.length; i++) {
    //       // note: need to handle if type is not text (in the future)
    //       this.resourceService.addColumn(this.currProject.projectId , title[i], 'text').subscribe();
    //     }
    // });

    this.resourceService.resetProjectResources(this.currProject.projectId).subscribe();
    this.resourceService.resetColumn(this.currProject.projectId).subscribe();
    for (let i = 2; i < title.length; i++) {
      // note: need to handle if type is not text (in the future)
      this.resourceService.addColumn(this.currProject.projectId , title[i], 'text').subscribe();
    }


    // update resource table
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < values.length; i++) {
      // parse extra cols
      let extraCols = '';
      for ( let j = 2; j < values[i].length; j++) {
        if ( j === 2) {
          extraCols += values[i][j];
        } else {
          extraCols += ',' + values[i][j];
        }
      }

      const res: Resource = ({
        resourceId: 0,
        resourceName: values[i][1],
        resourceCode: parseInt(values[i][0].replace(/\s/g, ''), 10),
        extraColsVal: extraCols,
      });
      this.resourceService.addRow(this.currProject.projectId, res).subscribe();
    }
  }


}
