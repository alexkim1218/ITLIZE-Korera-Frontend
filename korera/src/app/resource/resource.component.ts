import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css']
})
export class ResourceComponent implements OnInit {
  table = [
    {code: '12345', name: 'Resource 1'},
    {code: '12346', name: 'Resource 2'}
  ];
  search = this.table.filter(s => s.name.includes(''));
  addingRow = true;
  closeResult: string;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  filterSearch(searchString) {
    this.search = this.table.filter(s => s.name.toLowerCase().includes(searchString.value.toLowerCase()));
  }

  setAddRow(val: boolean) {
    this.addingRow = val;
  }

  addRow(resourceNameInput, resourceCodeInput) {
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
