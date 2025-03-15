import { Component } from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'FrontEnd';
  isHomePage: boolean = false; 

}

