import { Component } from '@angular/core';
import { Workspace } from '../workspace/workspace';

@Component({
  imports: [Workspace],
  selector: 'app-db-storage',
  styleUrl: './db-storage.css',
  templateUrl: './db-storage.html',
})
export class DbStorage {}
