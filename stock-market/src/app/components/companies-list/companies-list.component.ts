import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { StockmarketService } from 'src/app/services/stockmarket.service';

@Component({
  selector: 'app-companies-list',
  templateUrl: './companies-list.component.html',
  styleUrls: ['./companies-list.component.scss']
})
export class CompaniesListComponent implements OnInit {

  companyDataSource = new MatTableDataSource<any>();

  displayedColumns: string[] = ['companyCode', 'companyName', 'ceo', 'turnover'];

  constructor(private smService:StockmarketService) { }

  ngOnInit(): void {
this.getCompaniesList()
  }

  public getCompaniesList(){
    this.smService.getAll().subscribe(res=>{
      console.log(res)
      this.companyDataSource.data = res.result;
    })
  }



}
