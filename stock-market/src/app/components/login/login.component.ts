import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StockmarketService } from 'src/app/services/stockmarket.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!:FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private smService: StockmarketService,
    private router:Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    })


  }

  login(){
    if(this.loginForm.valid){
      this.smService.getTokenFromBackEnd(this.loginForm.value).subscribe({
        next: (res) => {
          if(res.jwtToken){
          localStorage.setItem('token',res.jwtToken)
          this.router.navigate(['/companies'])
          this.smService.updatemenu.next()

          // console.log(res)
          // this.smService.getRoles()
          }
        },
      })
    }
  }
}
