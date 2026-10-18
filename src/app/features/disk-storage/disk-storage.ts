import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { Workspace } from '../workspace/workspace';



@Component({
  imports: [CommonModule, Workspace],
  selector: 'app-disk-storage',
  styleUrl: './disk-storage.css',
  templateUrl: './disk-storage.html',
})
export class DiskStorage{

}
