import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/models/company.model';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss']
})
export class CompanyDetailsComponent implements OnInit {

  company: Company;

  constructor() { }

  ngOnInit(): void {

  }

  getCompany(value: any) {
    console.log(value)
    this.company = value
  }

}
