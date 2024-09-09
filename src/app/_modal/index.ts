import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ModalService {
  private modals: any[] = [];
  

  add(modal: any) {
    // console.log('modal', modal);
    // alert('modal' + modal);
    // setTimeout(() => {
      this.modals.push(modal);
    // }, 3000);
    // console.log("modals--->",this.modals);
  }

  remove(id: string) {
    this.modals = this.modals.filter((x) => x.id !== id);
  }

  open(id: string) {
    // console.log('id', id);
    const modal = this.modals.find((x) => x.id === id);
    // console.log("modal",modal)
    modal.open();
  }

  close(id: string) {
    const modal = this.modals.find((x) => x.id === id);
    modal.close();
  }
}
