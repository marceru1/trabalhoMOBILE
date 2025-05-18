import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton,IonLabel, IonInput,IonItem,IonList,IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
@Component({
  selector: 'app-criar',
  templateUrl: './criar.page.html',
  styleUrls: ['./criar.page.scss'],
  standalone: true,
  imports: [IonButton,IonLabel, IonInput,IonItem,IonList,IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class CriarPage implements OnInit {

  formData = {
    nome : "",
    cpf : "",
    senha : "",
  };

  constructor(public route : Router) { }

  goToLogin(){
    this.route.navigate(['login']);
   }

   ngOnInit() {
  }
  
  criarConta() {

    fetch("http://localhost/biblioteca/cadastroUsuarios.php" , {
      method: 'POST',
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(this.formData)
    })
    .then(response => response.text())
    .then(data => {
      console.log("Resposta do servidor: " , data);
    })
    .catch(error =>{
      console.error("Erro " , error);
    });
   }
}
