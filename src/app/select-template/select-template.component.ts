import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormArray, Validators } from '@angular/forms';
import { LettertemplateService } from '../services/Lettertemplate.service';
import Swal from 'sweetalert2';
 
@Component({
  selector: 'app-select-template',
  templateUrl: './select-template.component.html',
  styleUrls: ['./select-template.component.css']
})
 
export class SelectTemplateComponent implements OnInit {
 
//  letterType: any;
 letterarray:string[]=[];
 suggestedEmployeeNumbers: string[][] = [];
 suggestionsVisible: boolean[] = [];
 lettersData: any = [
    // { name:'Appointment Letter',id: 1 },
    // { name:'Offer Letter',id: 2 },
    // { name:'Confirmation Letter',id: 3 },
    // { name:'Revision Letter',id: 4 },
    // { name:'Termination Letter',id: 5 },
    // { name:'Employement Letter',id: 6 },
    // { name:'Relieving Letter',id: 7 }
  ];
  TemplateForm: FormGroup = new FormGroup({});
  loading: boolean = false;
  templateId: any;
  dropDown = true;
  filteredLettersData:any=this.lettersData;
  msg:any;
  userData: any;
  buttonHide:boolean = true;

 
  constructor(
              private formbuilder: FormBuilder,
              private services: LettertemplateService,
            ) { 
              const userData1 = localStorage.getItem('loginData');
              if (userData1) {
                  this.userData = JSON.parse(userData1);
              }
            }
 
 
  ngOnInit(): void {
    this.FormInitialization();
  }
 
  letterTemplateName(event: any) {
    const selectedTemplate = event.target.value;
    this.buttonHide = selectedTemplate !== "Employement Letter";
  }

 
  FormInitialization() {
    this.TemplateForm = this.formbuilder.group({
      employeeNumber: this.formbuilder.array([this.createEmployeeNumberFormGroup()]),
      letterTemplate: ['', Validators.required]
    });
  }
 
  createEmployeeNumberFormGroup(): FormGroup {
    return this.formbuilder.group({
      employeeNumber: ['', Validators.required]
    });
  }
   get employeeNumber(): FormArray {
    return this.TemplateForm.get('employeeNumber') as FormArray;
  }
 
  addEmployeeNumber(): void {
    this.employeeNumber.push(this.createEmployeeNumberFormGroup());
    this.suggestionsVisible.push(false);
    this.suggestedEmployeeNumbers.push([]);
  }
 
  removeEmployeeNumber(index: number): void {
    this.employeeNumber.removeAt(index);
    this.suggestionsVisible.splice(index, 1);
    this.suggestedEmployeeNumbers.splice(index, 1);
  }
 
  private saveFile1(data: Blob, filename: string) {
    const blob = new Blob([data], { type: 'application/rtf' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }

  private saveFile2(data: Blob, filename: string) {
    const blob = new Blob([data], { type: 'application/zip' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }

  letterData() {
    this.loading = true;
     // Convert employee numbers to uppercase
    const modifiedEmployeeNumbers = this.TemplateForm.value['employeeNumber'].map(
    (group: { employeeNumber: string }) => ({
      employeeNumber: group.employeeNumber.toUpperCase()
    })
  );
  const LetterData = {
    TEMPLATE_NAME: this.TemplateForm.value['letterTemplate'],
    EMP_NO: modifiedEmployeeNumbers.map((group: { employeeNumber: any; }) => group.employeeNumber),
  };
    if (!LetterData.EMP_NO) {
      // console.error("No employee numbers found");
      this.loading = false;
      Swal.fire({
        position:'top',
        icon: 'error',
        title: 'Error',
        text: 'Employee number not found!',
        width:400
      });
      return;
    }
    // console.log("LetterData", LetterData);
     const data1:any =[];
     this.TemplateForm.value['employeeNumber'].forEach((element:any) => {
          data1.push({
          TEMPLATE_NAME:this.TemplateForm.value['letterTemplate'],
          EMP_NO:element.employeeNumber
         })
     });
    //  console.log('data1',data1);
    this.services.sendTemplateDetails(data1).subscribe((res:any) => {
        console.log(res);
        this.loading = false;
        Swal.fire({
          position:'top',
          icon:'success',
          title:'Success',
          text:'Letter Generated Successfully',
          timer:1500,
          showConfirmButton: false,
          width:400
        });

        if(res.type == 'application/rtf'){
          this.saveFile1(res, 'HRIT Factory'+ res +' '+  +'.rtf');
        }
        else{
          this.saveFile2(res, 'HRIT Factory Letters.zip');
        }
        this.TemplateForm.reset();
      },(error) => {
        this.loading = false;
        if (error.error instanceof Blob) {
          // console.log('error--->', error);
          const reader = new FileReader();
          reader.onload = (e: any) => {
            try {
              const errorMsg = JSON.parse(e.target.result);
              // console.error('Error occurred:', errorMsg.error);
              this.msg=errorMsg.error;
              Swal.fire({
                position:'top',
                icon: 'error',
                title: 'Error',
                // text: error.error?.error || error.statusText || 'An error occurred!',
                text:`${errorMsg.error}`
              });
              this.handleErrorMessage(errorMsg);
            } catch (err) {
              // console.error('Error parsing JSON from Blob:', err);
              this.handleErrorMessage('An error occurred while parsing the error response.');
            }
          };
          reader.onerror = () => {
            // console.error('Error reading Blob');
            this.handleErrorMessage('An error occurred while reading the error response.');
          };
          reader.readAsText(error.error);
        } else {
          // console.error('Error occurred:', error);
          this.handleErrorMessage(error);
        }
      });
  }
 
  handleErrorMessage(errorMsg: any) {
    this.loading = false;
    if (errorMsg.error) {
      this.msg = errorMsg.error;
    } else if (errorMsg.message) {
      this.msg = errorMsg.message;
    } else {
      this.msg = 'An error occurred!';
    }
  }
 
  onEmployeeNumberChange(event: Event,index: number): void {
    const input = (event.target as HTMLInputElement).value;
    // console.log("input",input);
    this.getEmpNumLetterNames(input,index)
  }
 
  getEmpNumLetterNames(input:any,index:number){
    if (input != "") {
      this.services.empNumsLetternames(input).subscribe((res: any) => {
        this.letterarray = [];
        this.suggestedEmployeeNumbers[index] = res.map((item: { EMP_NO: string }) => item.EMP_NO);
        this.suggestionsVisible[index] = this.suggestedEmployeeNumbers[index].length > 0;
        if (res.length > 0) {
          this.letterarray = res[0].LetterNames;
        }
      }, error => {
        this.suggestedEmployeeNumbers[index] = [];
        this.suggestionsVisible[index] = false;
      });
    } else {
      this.letterarray = [];
      this.suggestedEmployeeNumbers[index] = [];
      this.suggestionsVisible[index] = false;
    }
  }

  selectSuggestion(suggestion: string, index: number): void {
    this.employeeNumber.at(index).patchValue({ employeeNumber: suggestion });
    this.suggestionsVisible[index] = false;
  }

 
getRoleClass(role: string): string {
  return this.userData.ROLE === 'Admin' ? 'align-btn2' : 'align-btn1';
}

 
}
 