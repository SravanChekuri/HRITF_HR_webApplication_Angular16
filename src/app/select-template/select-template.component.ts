import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormArray, Validators } from '@angular/forms';
import { LettertemplateService } from '../services/Lettertemplate.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-select-template',
  templateUrl: './select-template.component.html',
  styleUrls: ['./select-template.component.css']
})
 
export class SelectTemplateComponent implements OnInit {
 
  letterType: any;
 
 letterarray:string[]=[];
 
 suggestedEmployeeNumbers: string[] = [];
 
 suggestionsVisible: boolean = false;
 
lettersData: any = [
   
    // { name:'Appointment Letter',id: 1 },
    // { name:'Offer Letter',id: 2 },
    // { name:'Confirmation Letter',id: 3 },
    // { name:'Revision Letter',id: 4 },
    // { name:'Termination Letter',id: 5 },
    // { name:'Verification Letter',id: 6 },
    // { name:'Relieving Letter',id: 7 }
 
  ];
 
  TemplateForm: FormGroup = new FormGroup({});
 
  loading: boolean = false;
 
  templateId: any;
 
  dropDown = true;
 
  filteredLettersData:any=this.lettersData;
 
  msg:any;
 
  empNumLetterName: any;
 
  constructor(
              private formbuilder: FormBuilder,
              private services: LettertemplateService,
              private router:Router
            ) { }
 
 
  ngOnInit(): void {
 
    this.FormInitialization();
 
 
  }
 
  // onLetterTypeChange(event: any) {
 
  //   this.letterType = event.target.value;
 
  //   console.log(this.letterType);
  //   if (this.letterType === 'Confirmation Letter') {
 
  //     this.dropDown = false;
 
  //   }
 
  //   this.services.getLetterId(this.letterType).subscribe((res) => {
  //     console.log("res", res);
  //     this.templateId = res.TEMPLATE_ID;
 
  //     this.TemplateForm.patchValue({
 
  //       TemplateId: res.TEMPLATE_ID
 
  //     });
 
  //   });
  // }
 
  FormInitialization() {
 
    this.TemplateForm = this.formbuilder.group({
      // TemplateId: ['', Validators.required],
     
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
 
  }
 
  removeEmployeeNumber(index: number): void {
 
    this.employeeNumber.removeAt(index);
 
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
     
    this.services.sendTemplateDetails(data1).subscribe(
 
      (res:any) => {
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
        }).then(() => {
 
          this.router.navigate(['/searchGenerateLetter']);
 
          const fileURL = URL.createObjectURL(res);
          // console.log("url", fileURL);
          // window.open(fileURL, '_blank');
        });
      },
      (error) => {
 
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
   
    this.getEmpNumLetterNames(input)
 
    // if (input.startsWith('C') || input.startsWith('c')) {
 
    //   this.filteredLettersData = this.lettersData.filter((letter: { name: string; }) => letter.name === 'Appointment Letter' || letter.name=== 'Offer Letter');
 
    // } else if (input.startsWith('E') || input.startsWith('e')) {
 
    //   this.filteredLettersData = this.lettersData.filter((letter: { name: string; }) => letter.name !== 'Appointment Letter' &&  letter.name !=='Offer Letter' );
 
    // } else {
 
    //   this.filteredLettersData = this.lettersData;
    // }
  }
 
 
  getEmpNumLetterNames(input:any){
 
    if (input!=""){
 
    this.services.empNumsLetternames(input).subscribe((res:any)=>{
 
      this.letterarray = [];
 
      this.suggestedEmployeeNumbers = [];
 
      // this.empNumLetterName=res;
 
    //  console.log("res",res);
 
     this.suggestedEmployeeNumbers = res.map((item: { EMP_NO: string }) => item.EMP_NO);
   
    //  console.log("hbdkbkawd:",this.suggestedEmployeeNumbers);
     
 
     for (let i of res){
      // console.log(i);
      this.letterarray=i.LetterNames;
      break;
     
     }
 
    // console.log(this.letterarray);
    this.suggestionsVisible = this.suggestedEmployeeNumbers.length > 0;    
    },error=>{
      // console.error("Error:", error);
      this.suggestedEmployeeNumbers = [];
      this.suggestionsVisible = false;
    })
  }
  else{
    this.letterarray=[];
    this.suggestedEmployeeNumbers = [];
    this.suggestionsVisible = false;  
  }
}
 
selectSuggestion(suggestion: string, index: number): void {
  this.employeeNumber.at(index).patchValue({ employeeNumber: suggestion });
  this.suggestionsVisible = false;
}
 
 
 
}
 