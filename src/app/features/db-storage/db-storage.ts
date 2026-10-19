import { Component, inject } from '@angular/core';
import { Workspace } from '../workspace/workspace';
import { Controller } from '../../utils/Controller';

@Component({
  imports: [Workspace],
  selector: 'app-db-storage',
  styleUrl: './db-storage.css',
  templateUrl: './db-storage.html',
})
export class DbStorage {

  public controller = inject(Controller);
}
