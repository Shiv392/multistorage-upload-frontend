import { Component, inject } from '@angular/core';
import { Workspace } from '../../workspace/workspace';
import { Controller } from '../../../utils/Controller';

@Component({
  imports: [Workspace],
  selector: 'app-bucket-server',
  styleUrl: './bucket-server.css',
  templateUrl: './bucket-server.html',
})
export class BucketServer {
  public controller = inject(Controller);
}
