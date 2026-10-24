import { Component } from '@angular/core';
import { Workspace } from '../../workspace/workspace';

@Component({
  imports: [Workspace],
  selector: 'app-bucket-client',
  styleUrl: './bucket-client.css',
  templateUrl: './bucket-client.html',
})
export class BucketClient {}
