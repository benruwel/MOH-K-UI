import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { AboutComponent } from '../about/about.component';
import { Routes } from '@angular/router';



 /* {
      path: 'courses',
      component: CoursesComponent
  },*/
 /**/


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }
   
  ngOnInit(): void {
  }

}


