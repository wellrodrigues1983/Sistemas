import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  faUsers = faUsers;
  faBoxOpen = faBoxOpen;

  isExpanded: boolean = false;
  isMouseOver: boolean = false;

  toggleMenu() {
    this.isExpanded = !this.isExpanded;
    console.log(this.isExpanded)
  }

  onMouseEnter() {
    this.isMouseOver = true;
    console.log(this.isMouseOver)
  }

  onMouseLeave() {
    this.isMouseOver = false;
    console.log(this.isMouseOver)
  }


  constructor(private router: Router) { }


  ngOnInit(): void {

  }

  public sair(){
    localStorage.clear();
    this.router.navigate(['login'])
    console.log("token: " + localStorage.getItem('token'));
    location.reload();
  }





}


