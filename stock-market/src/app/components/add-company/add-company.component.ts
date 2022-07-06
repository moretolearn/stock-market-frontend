import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StockmarketService } from 'src/app/services/stockmarket.service';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss']
})
export class AddCompanyComponent implements OnInit {

  buttonName: string = "Save";
  companyForm !: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editCompanyData: any,
    private smService: StockmarketService,
    private dialogRef: MatDialogRef<AddCompanyComponent>) { }



  ngOnInit(): void {
    this.companyForm = this.formBuilder.group({
      companyName: ['', Validators.required],
      description: ['', Validators.required],
      ceo: ['', Validators.required],
      turnover: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      website: ['', Validators.required],
      exchange: ['', Validators.required]

    })

    if (this.editCompanyData) {
      this.buttonName = "Update";
      this.companyForm.controls['companyName'].setValue(this.editCompanyData.companyName);
      this.companyForm.controls['description'].setValue(this.editCompanyData.description);
      this.companyForm.controls['ceo'].setValue(this.editCompanyData.ceo);
      this.companyForm.controls['turnover'].setValue(this.editCompanyData.turnover);
      this.companyForm.controls['website'].setValue(this.editCompanyData.website);
      this.companyForm.controls['exchange'].setValue(this.editCompanyData.exchange);

    }
  }

  addCompany() {
    if (!this.editCompanyData) {
      if (this.companyForm.valid) {
        this.smService.add(this.companyForm.value)
          .subscribe({
            next: (res) => {
              // alert("Company Registered");
              this.companyForm.reset();
              this.dialogRef.close('save');
              this.smService.openDialog(res.message!,'green')
            },
            error: () => {
              // alert("Error occured while adding the Company")
            }

          })
      }
    }
    else {
      this.updateCompany();
    }
  }

  updateCompany() {
    this.smService.updateCompany(this.companyForm.value, this.editCompanyData.companyCode)
      .subscribe({
        next: (res) => {
          // alert("Company updated");
          this.companyForm.reset();
          this.dialogRef.close('update');
          this.smService.openDialog(res.message,'blue')
        },
        error: () => {
          // alert("Error occured while updating the Company")
        }

      })
  }


}
