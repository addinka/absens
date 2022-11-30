import { Component, OnInit, Injector } from '@angular/core';
import { BaseModal } from 'carbon-components-angular';

@Component({
  selector: 'app-letter-of-duty',
  templateUrl: './letter-of-duty.component.html',
  styleUrls: ['./letter-of-duty.component.scss']
})
export class LetterOfDutyComponent extends BaseModal implements OnInit {

  modalText: string;
  constructor(protected injector: Injector) {
    super();
    this.modalText = 'lol';
  }
  public documentIcon = "../../assets/icons/letter_duty.svg"
  has: boolean = true;
  ngOnInit() {

  }

}
