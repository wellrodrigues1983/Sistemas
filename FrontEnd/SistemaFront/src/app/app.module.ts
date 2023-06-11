import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './components/shared/menu/menu.component';
import { LoginService } from './components/login/login.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CadastroClientesComponent } from './components/cadastro-clientes/cadastro-clientes.component';
import { EstoqueComponent } from './components/estoque/estoque.component';
import { CpfCnpjPipe } from './pipes/cpfCnpj.pipe';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MenuComponent,
    CadastroClientesComponent,
    EstoqueComponent,
    CpfCnpjPipe

  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    FontAwesomeModule,



  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
