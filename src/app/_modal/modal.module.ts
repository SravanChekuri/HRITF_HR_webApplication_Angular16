import { NgModule } from '@angular/core';
import { ModalComponent } from './modal.component';
import { A11yModule } from '@angular/cdk/a11y'

@NgModule({
    imports: [A11yModule],
    declarations: [ModalComponent],
    exports: [ModalComponent]
})

export class ModalModule { 
    
}