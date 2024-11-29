import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Corrected to styleUrls
})
export class AppComponent {
  title = 'userTest';

  @ViewChild('errorModal') modal!: ElementRef; // Added non-null assertion

  closeModal(): void {
    if (this.modal) { // Check if modal exists
      this.modal.nativeElement.classList.remove('show');
      this.modal.nativeElement.style.display = 'none';
    }
  }
}