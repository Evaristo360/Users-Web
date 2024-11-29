import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  handleError(error: any): void {
    let message = error.error?.errors ?JSON.stringify(error.error?.errors) : 'Ha ocurrido un error inesperado.';

    if(error.status==404){
      message = "No se ha encontrado el registro"
    }
    this.openErrorDialog(message);
  }

  private openErrorDialog(message: string): void {
    const modal = document.getElementById('error-modal');
    const modalBody = modal?.querySelector('.modal-body');
    if (modal && modalBody) {
      modalBody.textContent = message;
      modal.classList.add('show');
      modal.style.display = 'block';
    }
  }
}