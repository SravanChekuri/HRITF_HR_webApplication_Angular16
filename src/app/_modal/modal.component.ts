import {
  Component,
  ViewEncapsulation,
  ElementRef,
  Input,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { ModalService } from './modal.servcie';

@Component({
  selector: 'jw-modal',
  templateUrl: 'modal.component.html',
  styleUrls: ['modal.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() id: string;
  private element: any;
  opened = false;

  constructor(private modalService: ModalService, private el: ElementRef) {
    this.element = el.nativeElement;
  }

  ngOnInit(): void {
    // ensure id attribute exists
    if (!this.id) {
      // console.error('modal must have an id');
      return;
    }
    // move element to bottom of page (just before </body>) so it can be displayed above everything else
    document.body.appendChild(this.element);
    // add self (this modal instance) to the modal service so it's accessible from controllers
    console.log('this', this);
    this.modalService.add(this);
  }

  // remove self from modal service when component is destroyed
  ngOnDestroy(): void {
    alert(1);
    this.modalService.remove(this.id);
    this.element.remove();
  }

  // open modal
  open(): void {
    this.opened = true;
    this.element.style.display = 'block';
  }

  // close modal
  close(): void {
    this.opened = false;
    this.element.style.display = 'none';
    document.body.classList.remove('jw-modal-open');
  }
}
