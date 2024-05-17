import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {AdministradorModel} from "../../../models/administrador.model";
import {NgIf, NgOptimizedImage} from "@angular/common";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgOptimizedImage,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: [null, [Validators.required, Validators.maxLength(20)]],
      password: [null, [Validators.required, Validators.maxLength(20)]],
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const {username, password} = this.loginForm.value;
      const administrator = new AdministradorModel(username, password);
      this.authService.iniciarSesion(administrator).subscribe({
        next: (res) => { this.router.navigate(['/administradores']) },
        error: (error) => { if (!error.error.ok) Swal.fire({title: 'Error', text: error.error.msg, icon: 'error'}) }
      });
    }
  }

}
