import { NgModule } from '@angular/core';
import { ModalComponent } from './modal.component';
import { A11yModule } from '@angular/cdk/a11y';
import { ModalService } from './modal.servcie';

@NgModule({
  imports: [A11yModule],
  declarations: [ModalComponent],
  exports: [ModalComponent],
  providers: [],
  bootstrap: [ModalComponent],
})
export class ModalModule {}
