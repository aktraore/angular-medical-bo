import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { AuthService } from '../../../core/services/auth.service';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { BadgeModule } from 'primeng/badge';
import { TopBarComponent } from './top-bar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    ButtonModule, 
    SidebarModule, 
    MenuModule,
    OverlayPanelModule,
    BadgeModule,
    TopBarComponent
  ],
  template: `
    <div class="dashboard-container">
      <app-top-bar class="top-bar" (toggleSidebar)="toggleSidebar()"></app-top-bar>
      
      <div class="content-wrapper">
        <div class="sidebar" [class.collapsed]="sidebarCollapsed">
          <div class="menu-container">
            <div *ngFor="let item of menuItems" class="menu-item" [routerLink]="[item.routerLink]" routerLinkActive="active">
              <i [class]="item.icon"></i>
              <span *ngIf="!sidebarCollapsed">{{item.label}}</span>
            </div>
          </div>
        </div>
        
        <div class="main-content" [class.sidebar-collapsed]="sidebarCollapsed">
          <div class="content-container">
            <router-outlet></router-outlet>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      height: 100vh;
      display: flex;
      flex-direction: column;
    }
    .top-bar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
    }
    .content-wrapper {
      display: flex;
      flex: 1;
      margin-top: 60px;
    }
    .sidebar {
      width: 250px;
      background: #2477BF;
      color: #ffffff;
      transition: width 0.3s;
      height: calc(100vh - 60px);
      position: fixed;
      left: 0;
    }
    .sidebar.collapsed {
      width: 60px;
    }
    .menu-container {
      padding: 1rem 0;
    }
    .menu-item {
      padding: 0.75rem 1rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
      transition: background-color 0.3s;
      white-space: nowrap;
    }
    .menu-item:hover {
      background-color: #5FAAD9;
    }
    .menu-item.active {
      background-color: #82C0D9;
    }
    .menu-item i {
      font-size: 1.2rem;
      min-width: 1.2rem;
    }
    .main-content {
      margin-left: 250px;
      transition: margin-left 0.3s;
    }
    .main-content.sidebar-collapsed {
      margin-left: 60px;
    }
    .content-container {
      padding: 1rem;
      background-color: #F2F2F2;
      min-height: calc(100vh - 60px);
    }
  `]
})
export class DashboardComponent {
  sidebarCollapsed = false;
  
  menuItems: MenuItem[] = [
    {
      label: 'Appointments',
      icon: 'pi pi-calendar',
      routerLink: 'appointments'
    },
    {
      label: 'Patients',
      icon: 'pi pi-users',
      routerLink: 'patients'
    },
    {
      label: 'Practitioners',
      icon: 'pi pi-user',
      routerLink: 'practitioners'
    },
    {
      label: 'Establishments',
      icon: 'pi pi-building',
      routerLink: 'establishments'
    },
    {
      label: 'Settings',
      icon: 'pi pi-cog',
      routerLink: 'settings'
    }
  ];

  constructor(private authService: AuthService) {}

  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }
}