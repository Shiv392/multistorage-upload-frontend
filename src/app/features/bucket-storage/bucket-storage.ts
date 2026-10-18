import { Component } from '@angular/core';
import { Workspace } from '../workspace/workspace';

@Component({
  imports: [Workspace],
  selector: 'app-bucket-storage',
  styleUrl: './bucket-storage.css',
  templateUrl: './bucket-storage.html',
})
export class BucketStorage {}
