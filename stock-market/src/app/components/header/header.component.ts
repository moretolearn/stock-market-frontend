import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StockmarketService } from 'src/app/services/stockmarket.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private smService:StockmarketService,private router:Router) { }

  isLogin: boolean = false;

  ngOnInit(): void {
    this.smService.updatemenu.subscribe(next=>{
      console.log(next)
    })
  }

  logOut(){
    localStorage.clear();
    this.router.navigate(['/login'])
  }

}


