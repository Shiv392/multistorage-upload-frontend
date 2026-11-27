import { Component, inject } from '@angular/core';
import { Workspace } from '../../workspace/workspace';
import { Controller } from '../../../utils/Controller';

@Component({
  imports: [Workspace],
  selector: 'app-bucket-client',
  styleUrl: './bucket-client.css',
  templateUrl: './bucket-client.html',
})
export class BucketClient {
  public controller = inject(Controller);
}
