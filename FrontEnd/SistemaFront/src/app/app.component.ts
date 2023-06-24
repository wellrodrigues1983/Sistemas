import { Component, HostListener } from '@angular/core';
import { LoginService } from './login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Sistema';


  //Para ouvir se a opção voltar do navegador foi clicada e recarregar a pagina
  @HostListener('window:popstate', ['$event'])
  onpopstate(event: any) {
    location.reload();
  }

  mostrarMenu?: boolean;

  item?: any;

  constructor(public auth: LoginService, private router: Router) { }


  ngOnInit(): void {

    this.updateMarginLeft()

    //Capturando o token
    this.item = window.localStorage.getItem('token')

    this.showMenu()

    console.log('Valor da sidebar' + this.sidebarWidth)



  }

  //Para exibir ou ocultar o menu
  public showMenu(): void {

    if (this.item == null) {
      this.auth.mostrarMenuEmitter.subscribe(
        mostrar => this.mostrarMenu = mostrar
      );

      if (this.mostrarMenu == null) {
        this.router.navigate(['login'])
      }
    }

    if (this.item != null) {
      this.mostrarMenu = true
    }

  }

  divSidebar = document.getElementById(".menuSidebar")


  sidebarWidth?: number = this.divSidebar?.offsetWidth;
  isMouseOverSidebar: boolean = false;

  updateMarginLeft() {
   /*  if (this.isMouseOverSidebar || this.sidebarWidth? > 0) {
      this.sidebarWidth = this.isMouseOverSidebar ? this.sidebarWidth : 0;
      const content: any = document.querySelector('conteudo');
      content.style.marginLeft = `${this.sidebarWidth}px`;

      console.log(content) */
    }



}
