import { Component } from '@angular/core';
import { Workspace } from '../workspace/workspace';
import { RouterModule } from '@angular/router';

@Component({
  imports: [Workspace, RouterModule],
  selector: 'app-bucket-storage',
  styleUrl: './bucket-storage.css',
  templateUrl: './bucket-storage.html',
})
export class BucketStorage {}
