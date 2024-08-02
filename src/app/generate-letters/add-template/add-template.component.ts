import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetEmployeesService } from '../../services/get-employees.service';
import Swal from 'sweetalert2';
import { LettertemplateService } from 'src/app/services/Lettertemplate.service';

@Component({
  selector: 'app-add-template',
  templateUrl: './add-template.component.html',
  styleUrls: ['./add-template.component.css'],
})


export class AddTemplateComponent implements OnInit {


  templateId: any;

  file: any;

  letterType: any;

  letterId: any;

  templateData: any;

  msg:any;

  lettersData: any = [

    { name:'Appointment Letter' },
    { name:'Offer Letter' },
    { name:'Confirmation Letter' },
    { name:'Revision Letter' },
    { name:'Termination Letter' },
    { name:'Verification Letter' },
    { name:'Relieving Letter' }

  ];

  loading:boolean=false;

  constructor(
              private service: GetEmployeesService, 
              private services: LettertemplateService
            ) {}

  ngOnInit() {

    this.displayTemplates();

  }

  onLetterTypeChange(event: any) {

    this.letterType = event.target.value;

    // console.log(this.letterType);
    this.lettersData.forEach((element: { name: any; id: any }) => {

      if (element.name === this.letterType) {

        this.letterId = element.id;

      }
    });
  }

  onFileChange(event: any) {

    const fileInput = event.target;
    // console.log('fileInput', fileInput);

    this.file = fileInput.files[0]; // Get the first selected file
    // console.log(this.file);
  }

  uploadFile() {

    // alert(this.letterType);

    if (!this.file || this.letterType===undefined) {
      Swal.fire({
        position:'top',
        icon: 'error',
        title:"Error",
        showConfirmButton: true,
        width:400,
        text: 'Please select a file/Letter type',
      });

      return;
    }

    const allowedTypes = ['application/rtf', 'text/rtf'];

    if (!allowedTypes.includes(this.file.type) && !this.file.name.endsWith('.rtf')) {
      Swal.fire({
        position:'top',
        icon: 'error',
        title:"Error",
        showConfirmButton: true,
        width:400,
        text: 'Only RTF files are allowed.',
      });

      return;
    }

    let formData = new FormData();

    formData.append('Filename', this.letterType);

    formData.append('File', this.file);

    formData.append('letterType', this.letterType);

    formData.append('letterId', this.letterId);

    // console.log('FormData:', formData);
    formData.forEach((value, key) => {
      // console.log('Form Data:', key, value);
    });

    this.service.loadTemplate(formData).subscribe((res) => {

      this.loading=false;

        // console.log('File is uploaded', res);
        // console.log('TemplateId:', res);
        this.templateId = res.data.TEMPLATE_ID;
        // console.log('temp id',this.templateId);
        
        if(res && res.message){
          this.msg=res.message;
        }
        Swal.fire({
          position:'top',
          icon: 'success',
          title:"Success",
          text:`${this.msg}`,
          showConfirmButton: false,
          width:400,
          timer: 1500,
        });
        // Refresh the template list
        this.displayTemplates();
      },
      (error) => {
        this.loading=false;
        // console.log(error);
        if(error.error && error.error.message){
          this.msg=error.error.message;
        }
        else if (error.error && error.error.error){
          this.msg=error.error.error;
        }
        Swal.fire({
          position:'top',
          icon: 'error',
          title:"Error",
          text:`${this.msg}`,
          showConfirmButton: true,
          width:400,
        });
        // console.log('Error uploading file', error);
      }
    );
  }

  // display(templateId: any) {
  //   this.service.download(this.templateId);
  // }

  displayTemplates() {

    this.loading=true;

    this.service.getTemplate().subscribe((res) => {

      this.loading=false;

      //  console.log('letterRes', res);
      this.templateData = res;
      //  console.log('this.templateData', this.templateData);
    },error=>{

      this.loading=false;
      // console.log(error);
    });
  }

  
  viewTemplate1(templateId: any,name:any) {

    this.service.viewTemplate(templateId,name);
    
  }


  deleteTemplate(tempalteId:any){
    this.loading=true;
    // console.log("temp Id",this.templateId);
    
    this.services.deleteTemplate(tempalteId).subscribe((res:any)=>{

      this.loading=false;

      Swal.fire({
        position:'top',
        icon:'success',
        text:'Letter Template Deleted Successfully',
        showConfirmButton: false,
        timer: 1500
    }).then(() => {

      this.displayTemplates(); 
  });

    },error =>{
      this.loading=false;
      console.log("error delete temp",error);
      
      Swal.fire({
        position:'top',
        icon:'error',
        text:`${error.error.error}`,
        width:400,
      })
    })
  }
}
