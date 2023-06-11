import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/shared/menu/menu.component';
import { CadastroClientesComponent } from './components/cadastro-clientes/cadastro-clientes.component';
import { EstoqueComponent } from './components/estoque/estoque.component';

const routes: Routes = [

  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent},
  { path: 'index', component: LoginComponent},
  { path: 'home', component: HomeComponent},
  { path: 'menu', component: MenuComponent},
  { path: 'cadastroCli', component: CadastroClientesComponent},
  { path: 'estoque', component: EstoqueComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
