import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-home-page',
  imports: [
    SidebarComponent,
    NgIf,
    RouterModule
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  userLoggedIn: boolean = localStorage.getItem('token') == null ? false : true;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    if (!this.userLoggedIn) {
      this.router.navigate(['/login']);
    }
  }
}
