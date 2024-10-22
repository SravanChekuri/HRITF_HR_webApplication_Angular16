import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormArray, Validators } from '@angular/forms';
import { LettertemplateService } from 'src/app/Services/Letters Services/Lettertemplate.service';
import Swal from 'sweetalert2';
 
@Component({
  selector: 'app-select-template',
  templateUrl: './select-template.component.html',
  styleUrls: ['./select-template.component.css']
})
 
export class SelectTemplateComponent implements OnInit {
  years: number[] = [];
 
  letterarray:string[]=[];

  suggestedEmployeeNumbers: string[][] = [];
  suggestionsVisible: boolean[] = [];
  lettersData: any = [];
  TemplateForm: FormGroup = new FormGroup({});
  loading: boolean = false;
  templateId: any;
  dropDown = true;
  filteredLettersData:any=this.lettersData;
  msg:any;
  userData: any;
  buttonHide:boolean = true;
 
  showRevisionModal:boolean = false;
  genarateLetterHide:any=true;

 
  revisionForm: FormGroup;
 
 
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
    this.revisionForm = this.formbuilder.group({
      revisionYear: ['', Validators.required]
    });
    this.populateYears();
  }
 
  letterTemplateName(event: any) {
    // alert(event.target.value)
    const selectedTemplate = event.target.value;
    // alert(selectedTemplate)
    this.buttonHide = selectedTemplate !== "Employement Letter";
    if (selectedTemplate === 'Revision Letter') {
      this.genarateLetterHide=false;
      this.showRevisionModal = !this.showRevisionModal;
    } else {
      this.showRevisionModal = false;
    }
    // this.cdr.detectChanges();
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
        // console.log(res);  
        this.buttonHide = true; 
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
          this.saveFile1(res, 'HRIT Factory '+ data1[0].EMP_NO +' '+ data1[0].TEMPLATE_NAME +'.rtf');
        }
        else{
          this.saveFile2(res, 'HRIT Factory Letters.zip');
        }
        this.TemplateForm.reset({employeeNumber: [], letterTemplate: ''});
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
 
onLetterTemplateChange(event: Event) {
  const selectedValue = (event.target as HTMLSelectElement).value;
  if (selectedValue === 'Revision Letter') {
    this.showRevisionModal = true;
  } else {
    this.showRevisionModal = false;
  }
}
 
closeRevisionModal() {
  this.showRevisionModal = false;
  this.genarateLetterHide=true;
  this.TemplateForm.reset({employeeNumber: [], letterTemplate: ''})
}

populateYears() {
  const currentYear = new Date().getFullYear();
    const startYear = currentYear - 10; // 10 years in the past
    const endYear = currentYear + 10;   // 10 years in the future

    for (let year = startYear; year <= endYear; year++) {
      this.years.push(year);
    }
    // console.log(this.years);
    
}

sendYear() {
  if (this.revisionForm.valid) {
    const currentYear = new Date().getFullYear();
    const selectedYear = this.revisionForm.get('revisionYear')?.value;
    // console.log("selectedYear:", selectedYear);
    const data1: any = [];
    this.TemplateForm.value['employeeNumber'].forEach((element: any) => {
      data1.push({
        TEMPLATE_NAME: this.TemplateForm.value['letterTemplate'],
        EMP_NO: element.employeeNumber,
        YEAR: selectedYear+'-06-01'
      });
    });
    // console.log("data=>", data1);
    this.services.sendTemplateDetails(data1).subscribe((res)=>{
      // console.log("res",res);
      Swal.fire({
        position:'top',
        icon:'success',
        title:'Success',
        text:'Letter Generated Successfully',
        timer:1500,
        showConfirmButton: false,
        width:400
      }).then(()=>{
        this.closeRevisionModal();
      });
      
      if(res.type == 'application/rtf'){
        this.saveFile1(res, 'HRIT Factory '+ data1[0].EMP_NO +' '+ data1[0].TEMPLATE_NAME + ' ' + currentYear +'.rtf');
      }
      else{
        this.saveFile2(res, 'HRIT Factory Letters.zip');
      }
      
    },(error)=>{
      // console.log("err",error);
      Swal.fire({
        position: 'top',
        icon: 'error',
        title: 'Oops...',
        text: `${error.error.error || error.error.message }`,
        width: 400,
      });
    })
  } else {
    // console.log("Form is invalid");
    Swal.fire({
      position: 'top',
      icon: 'error',
      title: 'Oops...',
      text: 'Please Enter the revision year',
      width: 400,
    });

  }
}

}
 
 