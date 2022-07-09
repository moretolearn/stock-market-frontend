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

  loginForm!: FormGroup;
  registerForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private smService: StockmarketService,
    private router: Router) { }

  ngOnInit(): void {
    localStorage.clear();
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    })

    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      roles: ['', Validators.required]
    })
  }

  login() {
    if (this.loginForm.valid) {
      this.smService.getTokenFromBackEnd(this.loginForm.value).subscribe({
        next: (res) => {
          console.log(res)
          if (res.access_token) {
            localStorage.setItem('token', res.access_token)
            this.router.navigate(['/companies'])
            this.smService.updatemenu.next()

            // console.log(res)
            this.smService.getRoles()
          }
        },
      })
    }
  }

  register() {
    this.registerForm.value.roles = [{ name: this.registerForm.value.roles }]
    console.log(this.registerForm.value)
    if (this.registerForm.valid) {
      this.smService.registration(this.registerForm.value).subscribe({
        next: (res) => {
          this.smService.openDialog(res.message, 'green')
          console.log(res)
        },
      })
    }
  }

  isForm = false;

  bactToSignin() {
    this.isForm = false;
  }

  goToSingup() {
    this.isForm = true;
  }

  roles = [
    { value: 'ROLE_ADMIN', viewValue: 'ADMIN' },
    { value: 'ROLE_USER', viewValue: 'USER' }
  ]
}
