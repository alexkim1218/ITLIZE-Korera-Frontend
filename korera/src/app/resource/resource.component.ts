import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ResourceService } from './resource.service';
import { Resource } from '../resource';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css']
})
export class ResourceComponent implements OnInit {

  table: Resource[];
  // table = [
  //   {code: '12345', name: 'Resource 1'},
  //   {code: '12346', name: 'Resource 2'},
  //   {code: '12345', name: 'Resource 3'},
  //   {code: '12346', name: 'Resource 4'},
  //   {code: '12345', name: 'Resource 5'},
  //   {code: '12346', name: 'Resource 6'},
  //   {code: '12345', name: 'Resource 7'},
  //   {code: '12346', name: 'Resource 8'},
  //   {code: '12345', name: 'Resource 9'},
  //   {code: '12345', name: 'Resource 5'}
  // ];
  search: Resource[];
  addingRow = true;
  closeResult: string;

  constructor(private modalService: NgbModal,
              private resourceService: ResourceService) { }

  ngOnInit() {
    this.resourceService.getAllResources().subscribe(resp => {
      // access the body directly, which is typed as `Config`.
      this.table = resp;
      this.search = this.table.filter(s => s.resourceName.includes(''));

      console.log(this.table);
    });
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
}
