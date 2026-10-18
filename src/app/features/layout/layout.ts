import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Sidemenu } from '../sidemenu/sidemenu';
import { RouterModule } from '@angular/router';

@Component({
  imports: [CommonModule, Sidemenu, RouterModule],
  selector: 'app-layout',
  styleUrl: './layout.css',
  templateUrl: './layout.html',
})
export class Layout {}
