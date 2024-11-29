import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http'; 
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [CommonModule, FormsModule,HttpClientModule, RouterModule],
  providers: [UsersService],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css'
})
export class UserEditComponent  implements OnInit {
  user: User | undefined;

  constructor(
    private userService: UsersService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.userService.getUsers().subscribe(users => {
      this.user = users.find(t => t.id === id);
    });
  }

  editUser(): void {
    if (this.user) {
      this.userService.updateUser(this.user).subscribe(() => {
        this.router.navigate(['/list']); // Redirigir después de editar
      });
    }
  }

  validateNumber(event: KeyboardEvent) {
    const inputChar = String.fromCharCode(event.charCode);
    // Permitir solo números
    if (!/^[0-9]*$/.test(inputChar)) {
      event.preventDefault();
    }
  }
}