
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LettertemplateService } from '../services/Lettertemplate.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-search-generate-letter',
    templateUrl: './search-generate-letter.component.html',
    styleUrls: ['./search-generate-letter.component.css']
})

export class SearchGenerateLetterComponent implements OnInit {

    employees: any;

    employeeExists: any;

    searchElement: any;

    filterData: any;

    totalEmployee: any;

    letterData: any[] = [];

    serialNumber: number = 1;

    userData: any;

    currentPage: number = 1;

    itemsPerPage: number = 10;

    displayedLetters: any[] = [];

    loading: boolean = false;

    isSearched: boolean = false;

    constructor(
                private router: Router,
                private template: LettertemplateService
            ) {

            const userData1 = localStorage.getItem('loginData');

            if (userData1) {
                this.userData = JSON.parse(userData1);
            }
    }


    ngOnInit(): void {

        this.getData();

    }

    routr() {

        this.router.navigate(['/SelectTemplate']);
    }

    // sendSearchData() {
    //     // console.log("search", this.searchElement);
    // }

    getData() {

        this.loading = true;

        this.template.viewTemplateDetails().subscribe((res: any[]) => {

            this.loading = false;

            this.totalEmployee = res.length;

            this.letterData = res.map((data, index) => ({
                ...data,
                serial: index + 1
            }));

            this.filterData = [...this.letterData]; // Ensure filterData starts with all data

            // this.updateDisplayedLetters(); // Update displayed letters after fetching data

        });
    }



    view(emp_no: any, tempId: any,name:any) {

        this.template.viewLetter(emp_no, tempId,name);

    }

    filer(event: any) {

        const f = event.target.value.toLowerCase();

        this.isSearched = true;

        if (f === '') {

            this.filterData = [...this.letterData]; // Reset to all data if search input is empty
            
            this.isSearched = false;

        } else {

            this.filterData = this.letterData.filter((emp: any) =>

                emp.EMP_NO.toLowerCase().includes(f)

            );
        }

        this.updateDisplayedLetters(); // Update displayed letters based on filtered data
    }


    

    deleteLetter(EMP_ID: any, templateId: any) {

        this.template.deleteLetter(EMP_ID, templateId).subscribe((res) => {

            Swal.fire({
                position:'top',
                icon:'success',
                text:'Letter Deleted Successfully',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {

                this.getData();
                this.searchElement = ''; 
                this.filer({ target: { value: '' } }); 
            });
        });
    }

    updateDisplayedLetters() {

        const startIndex = (this.currentPage - 1) * this.itemsPerPage;

        const endIndex = startIndex + this.itemsPerPage;

        this.displayedLetters = this.filterData.slice(startIndex, endIndex);

    }


    getRoleClass(role: string): string {
        return this.userData.ROLE === 'Admin' ? 'align-btn2' : 'align-btn1';
      }

}
