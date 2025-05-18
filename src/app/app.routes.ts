import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },

  {
    path: 'criar',
    loadComponent: () => import('./criar/criar.page').then( m => m.CriarPage)
  },
  {
    path: 'produtos',
    loadComponent: () => import('./produtos/produtos.page').then( m => m.ProdutosPage)
  },

];
