import {
  Component,
  inject,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-modal-options',
  standalone: true,
  imports: [NgbModalModule],
  templateUrl: './small-modal.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./small-modal.component.css'],
})
export class NgbdModalOptions {
  private modalService = inject(NgbModal);

  openSm(content: TemplateRef<any>) {
    this.modalService.open(content, { size: 'sm' });
  }
}
