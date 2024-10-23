import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { BadgeModule } from 'primeng/badge';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [CommonModule, ButtonModule, OverlayPanelModule, BadgeModule, MenuModule],
  template: `
    <div class="top-bar">
      <div class="left-section">
        <button pButton 
          type="button" 
          icon="pi pi-bars" 
          class="p-button-text p-button-rounded"
          (click)="onToggleSidebar()">
        </button>
        <div class="app-brand">
          <h1>Keneya Sira</h1>
        </div>
      </div>
      <div class="actions">
        <button pButton 
          type="button" 
          icon="pi pi-bell" 
          class="p-button-text p-button-rounded action-button"
          pBadge
          value="2"
          (click)="op1.toggle($event)">
        </button>
        <p-overlayPanel #op1>
          <div class="notifications-panel">
            <h3>Notifications</h3>
            <div class="notification-item">
              <p>New appointment request</p>
              <small>2 minutes ago</small>
            </div>
            <div class="notification-item">
              <p>Patient update required</p>
              <small>1 hour ago</small>
            </div>
          </div>
        </p-overlayPanel>

        <button pButton 
          type="button" 
          icon="pi pi-question-circle" 
          class="p-button-text p-button-rounded action-button"
          (click)="op2.toggle($event)">
        </button>
        <p-overlayPanel #op2>
          <div class="help-panel">
            <h3>Help & Resources</h3>
            <ul class="help-links">
              <li><a href="#">Getting Started</a></li>
              <li><a href="#">User Guide</a></li>
              <li><a href="#">FAQs</a></li>
              <li><a href="#">Contact Support</a></li>
            </ul>
          </div>
        </p-overlayPanel>

        <button pButton 
          type="button" 
          icon="pi pi-user" 
          class="p-button-text p-button-rounded action-button"
          (click)="op3.toggle($event)">
        </button>
        <p-overlayPanel #op3>
          <div class="user-panel">
            <div class="user-info mb-3">
              <img [src]="'https://via.placeholder.com/40'" class="user-avatar" alt="User avatar">
              <div class="user-details">
                <h4>{{currentUser?.firstName}} {{currentUser?.lastName}}</h4>
                <small>{{currentUser?.email}}</small>
              </div>
            </div>
            <div class="user-menu">
              <button pButton 
                type="button" 
                label="Profile" 
                icon="pi pi-user" 
                class="p-button-text w-full mb-2"
                (click)="navigateToProfile(); op3.hide()">
              </button>
              <button pButton 
                type="button" 
                label="Settings" 
                icon="pi pi-cog" 
                class="p-button-text w-full mb-2"
                (click)="navigateToSettings(); op3.hide()">
              </button>
              <hr class="my-2">
              <button pButton 
                type="button" 
                label="Logout" 
                icon="pi pi-sign-out" 
                class="p-button-text p-button-danger w-full"
                (click)="logout(); op3.hide()">
              </button>
            </div>
          </div>
        </p-overlayPanel>
      </div>
    </div>
  `,
  styles: [`
    .top-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.5rem 1rem;
      background: #ffffff;
      border-bottom: 1px solid #efefef;
      height: 60px;
    }
    .left-section {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    .app-brand h1 {
      margin: 0;
      font-size: 1.5rem;
      color: #2477BF;
    }
    .actions {
      display: flex;
      gap: 0.5rem;
      align-items: center;
    }
    :host ::ng-deep .action-button.p-button.p-button-text {
      color: #2477BF !important;
    }
    :host ::ng-deep .action-button.p-button.p-button-text:hover {
      background: rgba(36, 119, 191, 0.1) !important;
    }
    :host ::ng-deep .p-badge {
      background: #2477BF !important;
    }
    .notifications-panel {
      width: 300px;
      padding: 0.5rem;
    }
    .notifications-panel h3 {
      margin: 0 0 1rem 0;
      font-size: 1.1rem;
      color: #2477BF;
    }
    .notification-item {
      padding: 0.5rem;
      border-bottom: 1px solid #efefef;
    }
    .notification-item p {
      margin: 0;
      font-size: 0.9rem;
      color: #495057;
    }
    .notification-item small {
      color: #666;
    }
    .help-panel {
      width: 250px;
      padding: 0.5rem;
    }
    .help-panel h3 {
      margin: 0 0 1rem 0;
      font-size: 1.1rem;
      color: #2477BF;
    }
    .help-links {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .help-links li {
      padding: 0.5rem 0;
    }
    .help-links a {
      color: #2477BF;
      text-decoration: none;
    }
    .help-links a:hover {
      text-decoration: underline;
    }
    .user-panel {
      width: 280px;
      padding: 1rem;
    }
    .user-info {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    .user-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
    .user-details h4 {
      margin: 0;
      font-size: 1rem;
      color: #2477BF;
    }
    .user-details small {
      color: #666;
    }
    .user-menu {
      margin-top: 0.5rem;
    }
    .w-full {
      width: 100%;
    }
    .mb-2 {
      margin-bottom: 0.5rem;
    }
    .my-2 {
      margin: 0.5rem 0;
    }
    hr {
      border: none;
      border-top: 1px solid #efefef;
    }
    :host ::ng-deep .p-button.p-button-danger {
      color: #ff4444 !important;
    }
    :host ::ng-deep .p-button.p-button-danger:hover {
      background: rgba(255, 68, 68, 0.1) !important;
    }
  `]
})
export class TopBarComponent implements OnInit {
  @Output() toggleSidebar = new EventEmitter<void>();
  currentUser: User | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  onToggleSidebar() {
    this.toggleSidebar.emit();
  }

  navigateToProfile() {
    this.router.navigate(['/dashboard/settings/profile']);
  }

  navigateToSettings() {
    this.router.navigate(['/dashboard/settings']);
  }

  logout() {
    this.authService.logout();
  }
}