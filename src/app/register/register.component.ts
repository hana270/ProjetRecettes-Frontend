import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  public user = new User();
  myForm!: FormGroup;
  err!: any;
  loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }

  // Validation personnalisée pour vérifier que les mots de passe correspondent
  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onRegister() {
    if (this.myForm.invalid) {
      return;
    }

    console.log(this.user);
    this.loading = true;
    this.authService.registerUser(this.user).subscribe({
      next: (res) => {
        this.authService.setRegistredUser(this.user);
        this.loading = false;

        // Configuration de SweetAlert2 pour succès
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Vérification réussie',
          text: 'Votre email a été vérifié avec succès',
          showConfirmButton: true,
          confirmButtonText: 'OK',
          width: '32rem',
          padding: '2rem'
        }).then(() => {
          this.router.navigate(['/verifEmail']);
        });
      },
      error: (err: any) => {
        
        if (err.error.errorCode === 'USER_EMAIL_ALREADY_EXISTS') {
          this.err = 'Email already used';
          this.loading = false;
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Erreur',
            text: 'Cet email est déjà utilisé',
            showConfirmButton: true,
            confirmButtonText: 'OK',
            confirmButtonColor: '#e74c3c',
            width: '32rem',
            padding: '2rem'
          });
        }
      }
    });
  }
}
