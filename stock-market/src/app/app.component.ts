
import { Component } from '@angular/core';
import { NgxUiLoaderConfig, NgxUiLoaderService } from 'ngx-ui-loader';
import { StockmarketService } from './services/stockmarket.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title ='stock market';
  constructor(public ngxUiLoaderService:StockmarketService) {;
  }

}
