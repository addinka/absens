import { Component, OnInit, Injector } from '@angular/core';
import { BaseModal, ModalService } from 'carbon-components-angular';

@Component({
  selector: 'app-request-detail-approval',
  templateUrl: './request-detail-approval.component.html',
  styleUrls: ['./request-detail-approval.component.scss']
})
export class RequestDetailApprovalComponent extends BaseModal implements OnInit {

  modalText: string;
  letterPressed: boolean = false;
  constructor(protected injector: Injector, public modalService: ModalService) {
    super();
    this.modalText = 'lol';
  }

  public documentIcon = "../../assets/icons/letter_duty.svg";
  public sendIcon = "../../assets/icons/mail-all.svg"
  has: boolean = true;
  ngOnInit() {

  }
  openLetter(){
    this.letterPressed = true;
    console.log(this.letterPressed);
  }
}
