import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';

@Component({
  imports: [MenuModule, RouterLink, RouterLinkActive],
  selector: 'app-sidemenu',
  styleUrl: './sidemenu.css',
  templateUrl: './sidemenu.html',
})
export class Sidemenu {
  readonly menuItems: MenuItem[] = [
    {
      label: 'Server upload',
      icon: 'pi pi-server',
      routerLink: ['/upload/disk-storage'],
    },
    {
      label: 'Database upload',
      icon: 'pi pi-database',
      routerLink: ['/upload/db-storage'],
    },
    {
      label: 'AWS S3 Bucket upload',
      icon: 'pi pi-cloud-upload',
      routerLink: ['/upload/bucket-storage'],
    },
  ];
}
