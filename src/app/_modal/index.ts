// import { Injectable } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ModalModule } from './modal.module';

platformBrowserDynamic()
  .bootstrapModule(ModalModule)
  .catch((err) => console.error(err));
// @Injectable({ providedIn: 'root' })
// export class ModalService {
//   private modals: any[] = [];

//   // refresh(){
//   //   this.add(modal:any)
//   // }
//   add(modal: any) {
//     console.log('modal', modal);
//     console.log('modal.....', modal.id);
//     // alert('modal' + modal);
//     // alert('modal' + modal.element);
//     this.modals.push(modal);
//     // console.log("modals--->",this.modals);
//   }

//   remove(id: string) {
//     this.modals = this.modals.filter((x) => x.id !== id);
//   }

//   open(id: string) {
//     // console.log('id', id);
//     const modal = this.modals.find((x) => x.id === id);
//     // console.log("modal",modal)
//     modal.open();
//   }

//   close(id: string) {
//     const modal = this.modals.find((x) => x.id === id);
//     modal.close();
//   }
// }
