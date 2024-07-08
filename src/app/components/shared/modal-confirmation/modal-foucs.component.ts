import { Component, inject, Type } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-modal-confirm',
  standalone: true,
  templateUrl: './modal-foucs.component.html',
  styleUrl: './modal-foucs.component.css',
})
export class NgbdModalConfirm {
  modal = inject(NgbActiveModal);
}



