import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ResourceService } from '../../service/resource.service';
import { Resource } from '../../resource';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css']
})

export class ResourceComponent implements OnInit {

  table: Resource[];
  // table = [
  //   {code: '12345', resourceName: 'Resource 1'},
  //   {code: '12346', resourceName: 'Resource 2'},
  //   {code: '12345', resourceName: 'Resource 3'},
  //   {code: '12346', resourceName: 'Resource 4'},
  //   {code: '12345', resourceName: 'Resource 5'},
  //   {code: '12346', resourceName: 'Resource 6'},
  //   {code: '12345', resourceName: 'Resource 7'},
  //   {code: '12346', resourceName: 'Resource 8'},
  //   {code: '12345', resourceName: 'Resource 9'},
  //   {code: '12345', resourceName: 'Resource 5'}
  // ];
  search: Resource[];

  // search: [];
  addingRow = true;
  closeResult: string;
  csvContent: string;

  constructor(private modalService: NgbModal,
              private resourceService: ResourceService,
              private router: Router) { }

  ngOnInit() {
    this.resourceService.getAllResources().subscribe(
      resp => {
      // get resource table from database
      this.table = resp;
      this.search = this.table.filter(s => s.resourceName.includes(''));
      console.log(this.table);
      },
      error => {
        if ( error.status === 401 ) {
          alert('You are not logged in or session timed out');
          this.router.navigateByUrl('/login');
        }
        // console.log(error.error.status);
      }
    );
  }

  filterSearch(searchString: any) {
    this.search = this.table.filter(s => s.resourceName.toLowerCase().includes(searchString.value.toLowerCase()));
  }

  setAddRow(val: boolean) {
    this.addingRow = val;
  }

  addRow(resourceNameInput: any, resourceCodeInput: any) {
    // TODO
    console.log(resourceNameInput.value);
    console.log(resourceCodeInput.value);

    // use service to add row


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
    let values = [];
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
