import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ModalService {
  private modals: any[] = [];

  add(modal: any) {
    // add modal to array of active modals
    // console.log("modals:",modal)
    this.modals.push(modal);
    // alert('modals:' + this.modals);
  }

  remove(id: string) {
    // remove modal from array of active modals
    this.modals = this.modals.filter((x) => x.id !== id);
  }

  open(id: string) {
    // open modal specified by id
    // alert('model serivice.ts file')
    const modal = this.modals.find((x) => x.id === id);
    modal.open();
  }

  close(id: string) {
    // close modal specified by id
    const modal = this.modals.find((x) => x.id === id);
    modal.close();
  }
}
