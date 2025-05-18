import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton, IonLabel, IonInput, IonItem,
  IonList, IonContent, IonHeader, IonTitle,
  IonToolbar, IonTextarea
} from '@ionic/angular/standalone';
@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
  standalone: true,
  imports: [  IonButton, IonLabel, IonInput, IonItem,
  IonList,IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ProdutosPage implements OnInit {

produto = {
    nome: '',
    descricao: '',
    preco: 0,
    categoria: '',
    imagem: '' 
  };
imagemSelecionada: File | null = null;

produtos: any[] = [];

  constructor() {}

  ngOnInit() {
     this.buscarProdutos();
  }
  selecionarImagem(event: any) {
  this.imagemSelecionada = event.target.files[0];
}
salvarProduto() {
  if (!this.imagemSelecionada) {
    alert('Selecione uma imagem.');
    return;
  }

  const formData = new FormData();
  formData.append('nome', this.produto.nome);
  formData.append('descricao', this.produto.descricao);
  formData.append('preco', this.produto.preco.toString());
  formData.append('categoria', this.produto.categoria);
  formData.append('imagem', this.imagemSelecionada); 

  fetch('http://localhost/biblioteca/inserirProduto.php', {
    method: 'POST',
    body: formData
  })
    .then(res => res.text())
    .then(data => {
      console.log('Servidor:', data);
      alert('Produto cadastrado com sucesso!');
      this.produto = { nome: '', descricao: '', preco: 0, categoria: '', imagem: '' };
      this.imagemSelecionada = null;
    })
    .catch(err => {
      console.error('Erro:', err);
      alert('Erro ao cadastrar produto.');
    });
}

  // salvarProduto() {
  //   fetch('http://localhost/biblioteca/inserirProduto.php', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(this.produto)
  //   })
  //   .then(res => res.text())
  //   .then(data => {
  //     console.log('Servidor:', data);
  //     alert('Produto cadastrado com sucesso!');
  //     this.produto = { nome: '', descricao: '', preco: 0, categoria: '', imagem: '' };
  //   })
  //   .catch(err => {
  //     console.error('Erro:', err);
  //     alert('Erro ao cadastrar produto.');
  //   });
  // }

  buscarProdutos() {
  fetch('http://localhost/biblioteca/inserirProduto.php', {
    method: 'GET'
  })
  .then(res => res.json())
  .then(data => {
    console.log('Produtos recebidos:', data);
    this.produtos = data;
  })
  .catch(err => {
    console.error('Erro ao buscar produtos:', err);
    alert('Erro ao carregar produtos.');
  });
}





}
