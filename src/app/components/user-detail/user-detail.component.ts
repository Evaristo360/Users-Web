import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  providers: [UsersService],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent  implements OnInit {
  user: User | undefined;
  userLoaded = false;

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.cargarTarea();
  }

  cargarTarea(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.usersService.getUser(+id).subscribe(data => {
        console.log('User info:', data);
        if (data) {
          this.user = data;
          this.userLoaded = true;
        } else {
          console.error('User not found, redirect to /list');
          this.router.navigate(['/list']);
        }
      }, error => {
        console.error('Error load user:', error);
        this.router.navigate(['/list']);
      });
    } else {
      console.error('User id not found in path, redirecting to /list');
      this.router.navigate(['/list']);
    }
  }

}
