import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton, IonLabel, IonInput, IonItem,
  IonList, IonContent, IonHeader, IonTitle, IonToolbar
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonButton, IonLabel, IonInput, IonItem,
    IonList, IonContent, IonHeader, IonTitle,
    IonToolbar, CommonModule, FormsModule
  ]
})
export class LoginPage implements OnInit {

  loginData = {
    cpf: '',
    senha: ''
  };

  constructor(private router: Router) {}

  ngOnInit() {}

  fazerLogin() {
    fetch("http://localhost/biblioteca/loginUsuario.php", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.loginData)
    })
    .then(response => response.json())
    .then(data => {
      console.log("Resposta do servidor:", data);

      if (data.sucesso) {
        // Redireciona para a página principal, ou dashboard
        this.router.navigate(['produtos']);
      } else {
        alert("CPF ou senha inválidos.");
      }
    })
    .catch(error => {
      console.error("Erro ao fazer login:", error);
    });
  }

  irParaCadastro() {
    this.router.navigate(['criar']);
  }
}
