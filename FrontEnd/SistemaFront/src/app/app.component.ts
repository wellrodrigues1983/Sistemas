import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './services/login.service';
import * as $ from 'jquery';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faAnchor } from '@fortawesome/free-solid-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { faIdBadge } from '@fortawesome/free-solid-svg-icons';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Sistema';

  faBars = faBars;
  faAnchor = faAnchor;
  faHome = faHome;
  faUsers = faUsers;
  faGear = faGear;
  faIdBadge = faIdBadge;
  faPowerOff = faPowerOff;

  constructor (private loginService: LoginService, private router: Router )  {}

  mostrarMenu!: boolean;

  ngOnInit(): void {
    this.loginService.mostrarMenuEmitter.subscribe(
      mostrar => this.mostrarMenu = mostrar
    );

    /* if(this.mostrarMenu === undefined || this.mostrarMenu === null) {
      this.router.navigate(['/'])
    } */

    const mobileScreen = window.matchMedia("(max-width: 990px )");
$(document).ready(function () {
    $(".dashboard-nav-dropdown-toggle").click(function () {
        $(this).closest(".dashboard-nav-dropdown")
            .toggleClass("show")
            .find(".dashboard-nav-dropdown")
            .removeClass("show");
        $(this).parent()
            .siblings()
            .removeClass("show");
    });
    $(".menu-toggle").click(function () {
        if (mobileScreen.matches) {
            $(".dashboard-nav").toggleClass("mobile-show");
        } else {
            $(".dashboard").toggleClass("dashboard-compact");
        }
    });
});

  }


  destroyer(){
    localStorage.removeItem('token')
  }


  public sair(){
    localStorage.clear();
    this.router.navigate(['/'])
    console.log("token: " + localStorage.getItem('token'));
  }

}
