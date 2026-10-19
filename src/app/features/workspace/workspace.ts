import { ChangeDetectorRef, Component, inject, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { WorkspaceService } from '../services/workspace.service';
import { Subject, takeUntil } from 'rxjs';

interface PhotoPreview {
  id: number;
  name: string;
  contentType: string;
  data?: string;          // base64 (abhi response me aa rahi hai)
  size: number;
  description: string | null;
  createdAt: string;
}
@Component({
  imports: [],
  selector: 'app-workspace',
  styleUrl: './workspace.css',
  templateUrl: './workspace.html',
})

export class Workspace implements OnChanges, OnDestroy {

  @Input() apiEndpoint:string|null = null;
  @Input() loading = false;

  private workspaceService = inject(WorkspaceService);
  private cdr = inject(ChangeDetectorRef);

  readonly maxFileSize = 2 * 1024 * 1024;
  photos: PhotoPreview[] = [];
  validationMessages: string[] = [];
  isDragging = false;

  private subject$ = new Subject<void>();

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['apiEndpoint']){
      console.log("api endpoint", this.apiEndpoint);

      if(this.apiEndpoint!=null){
        this.getAllPhotos();
      }
    }
  }

  public getAllPhotos(): void{
    this.loading = true;
    const apibody = {
      endpoint: this.apiEndpoint || ''
    }
    this.workspaceService.getPhotos(apibody).pipe(takeUntil(this.subject$)).subscribe({
      next : (res)=>{
        if(res?.success){
          this.photos = [...res.data ?? []];
        }
        
        this.loading = false;
        this.cdr.markForCheck();
      },
      error : ()=>{
        this.loading = false;
         this.cdr.markForCheck();
      }
    })
  }

  onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.addFiles(Array.from(input.files));
    }
    input.value = '';
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;
    if (event.dataTransfer?.files) {
      this.addFiles(Array.from(event.dataTransfer.files));
    }
  }

  addFiles(files: File[]): void {

  }

  removePhoto(photoId: number): void {

  }

  ngOnDestroy(): void {
    this.subject$.next();
    this.subject$.complete();
  }

  photoSrc(photo: PhotoPreview): string {
  return `data:${photo.contentType};base64,${photo.data}`;
}

  private isSupportedImage(file: File): boolean {
    const extension = file.name.split('.').pop()?.toLowerCase();
    const hasAllowedExtension = ['png', 'jpg', 'jpeg'].includes(extension ?? '');
    const hasAllowedType = !file.type || ['image/png', 'image/jpeg', 'image/jpg'].includes(file.type.toLowerCase());
    return hasAllowedExtension && hasAllowedType;
  }
}
