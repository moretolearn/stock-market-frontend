import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StockmarketService } from 'src/app/services/stockmarket.service';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.scss']
})
export class AddStockComponent implements OnInit {

  buttonName : string ="Save";
  stockForm !: FormGroup;
  constructor(
    private formBuilder : FormBuilder,
    @Inject(MAT_DIALOG_DATA) public updateStockData:any,
    private smService : StockmarketService,
    private dialogRef : MatDialogRef<AddStockComponent>) { }



  ngOnInit(): void {
    this.stockForm=this.formBuilder.group({
      stockName : ['',Validators.required],
      description : ['',Validators.required],
      price : ['',[Validators.required, Validators.pattern("^[0-9]*$")]],
      startDate : ['',Validators.required],
      endDate : ['', Validators.required]

    })

    if(this.updateStockData){
      this.buttonName="Update";
      this.stockForm.controls['stockName'].setValue(this.updateStockData.stockName);
      this.stockForm.controls['description'].setValue(this.updateStockData.description);
      this.stockForm.controls['price'].setValue(this.updateStockData.price);
      this.stockForm.controls['startDate'].setValue(this.updateStockData.startDate);
      this.stockForm.controls['endDate'].setValue(this.updateStockData.endDate);

    }
  }

  addStock(){
    if(!this.updateStockData){
      if(this.stockForm.valid){
        this.smService.addStock(55,this.stockForm.value)
        .subscribe({
          next:(res)=>{
            alert("Stock Registered");
            this.stockForm.reset();
            this.dialogRef.close('save');
          },
          error:()=>{
            alert("Error occured while adding the Stock")
          }

        })
      }
    }
      else{
        this.updateStock();
      }
    }

  updateStock(){
    this.smService.updateStock(this.stockForm.value,55, this.updateStockData.stockCode)
    .subscribe({
      next:(res)=>{
        alert("Stock updated");
        this.stockForm.reset();
        this.dialogRef.close('update');
      },
      error:()=>{
        alert("Error occured while updating the Stock")
      }

    })
  }
}
