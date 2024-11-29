import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  providers: [UsersService],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.css'
})
export class UserCreateComponent {
  newUser: User = { id: 0, name: '', email: '', age: null }; // Estado inicial

  constructor(private usersService: UsersService, private router: Router) { }

  createUser(): void {
    if (this.newUser.name.trim() === '' || this.newUser.email.trim() === '' || this.newUser.age === null || this.newUser.age < 0 || this.newUser.age > 120) {
      console.error('Form invalid');
      return; // Stop execution if the form is invalid
    }

    this.usersService.addUser(this.newUser).subscribe(
      () => {
        this.router.navigate(['/list']);
      },
      error => {
        console.error('Error creating user:', error);
      }
    );
  }

  validateNumber(event: KeyboardEvent) {
    const inputChar = String.fromCharCode(event.charCode);
    // Permitir solo números
    if (!/^[0-9]*$/.test(inputChar)) {
      event.preventDefault();
    }
  }
}
