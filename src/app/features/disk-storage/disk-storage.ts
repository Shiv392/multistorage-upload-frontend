import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';
import { Workspace } from '../workspace/workspace';
import { Controller } from '../../utils/Controller';



@Component({
  imports: [CommonModule, Workspace],
  selector: 'app-disk-storage',
  styleUrl: './disk-storage.css',
  templateUrl: './disk-storage.html',
})
export class DiskStorage{

  public controller = inject(Controller);

}
