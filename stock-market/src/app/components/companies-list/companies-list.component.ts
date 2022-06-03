import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Company } from 'src/app/models/company.model';
import { StockmarketService } from 'src/app/services/stockmarket.service';
import { AddCompanyComponent } from '../add-company/add-company.component';

@Component({
  selector: 'app-companies-list',
  templateUrl: './companies-list.component.html',
  styleUrls: ['./companies-list.component.scss']
})
export class CompaniesListComponent implements OnInit {

  companyDataSource = new MatTableDataSource<any>();


  @ViewChild(MatSort) matSort: MatSort;
  @ViewChild(MatPaginator) matPaginator: MatPaginator


  displayedColumns: string[] = ['companyCode', 'companyName', 'ceo', 'turnover', 'website', 'exchange', 'description', 'actions'];

  constructor(
    private smService: StockmarketService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getCompaniesList()
  }

  public getCompaniesList() {
    this.smService.getAll().subscribe(res => {
      // console.log(res)
      this.companyDataSource.data = res.result;
      this.companyDataSource.sort = this.matSort;
      this.companyDataSource.paginator = this.matPaginator;
    })
  }

  public deleteCompany(row: any) {

    this.smService.delete(row.companyCode).subscribe({
      next: (res) => {
        console.log(res)
        this.getCompaniesList()
      },
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.companyDataSource.filter = filterValue.trim().toLowerCase();

    if (this.companyDataSource.paginator) {
      this.companyDataSource.paginator.firstPage();
    }
  }

  getCompanyDetails(company: Company) {

    console.log(company)

    this.router.navigate(['/companies-detalis'], { state: company })
  }


  addDialog() {
    this.dialog.open(AddCompanyComponent, {
      width: '30%'
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.getCompaniesList();
      }
    });
  }

  updateCompany(row : any){
    this.dialog.open(AddCompanyComponent,{
      width:'30%',
      data : row
    }).afterClosed().subscribe(val =>{
      if(val==='update'){
        this.getCompaniesList();
      }
  })
  }
}
