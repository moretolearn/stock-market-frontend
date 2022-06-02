import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { StockmarketService } from 'src/app/services/stockmarket.service';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss']
})
export class AddCompanyComponent implements OnInit {

  companyForm !: FormGroup;
  constructor(
    private formBuilder : FormBuilder,
    private smService : StockmarketService,
    private dialogRef : MatDialogRef<AddCompanyComponent>) { }



  ngOnInit(): void {
    this.companyForm=this.formBuilder.group({
      companyName : ['',Validators.required],
      description : ['',Validators.required],
      ceo : ['',Validators.required],
      turnover : ['',[Validators.required, Validators.pattern("^[0-9]*$")]],
      website : ['',Validators.required],
      exchange : ['', Validators.required]

    })

  }

  addCompany(){
    if(this.companyForm.valid){
      this.smService.add(this.companyForm.value)
      .subscribe({
        next:(res)=>{
          alert("Company Registered");

          this.companyForm.reset();
          this.dialogRef.close();

        },
        error:()=>{
          alert("Error occured while adding the Company")
        }

      })
    }

  }



}
