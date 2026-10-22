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
      this.validationMessages = [];

  for (const file of files) {
    if (!this.isSupportedImage(file)) {
      this.validationMessages.push(`${file.name}: only PNG or JPG is allowed`);
      continue;
    }
    if (file.size > this.maxFileSize) {
      this.validationMessages.push(`${file.name}: must be 2 MB or smaller`);
      continue;
    }
    this.uploadFile(file);
  }
  this.cdr.markForCheck();
  }

  private uploadFile(file: File): void {
  this.loading = true;
  const apibody = {
    endpoint : this.apiEndpoint || '',
    file : file
  }
  this.workspaceService.uploadPhoto(apibody).pipe(takeUntil(this.subject$)).subscribe({
    next: (res) => {
      if (res?.success && res.data) {
        const saved: PhotoPreview = {
          ...res.data,
          previewUrl: URL.createObjectURL(file),   // bytes wapas nahi aate, local preview dikhao
        };
        this.photos = [saved, ...this.photos];      // naya sabse upar
      } else {
        this.validationMessages = [...this.validationMessages, `${file.name}: ${res?.message ?? 'upload failed'}`];
      }
      this.loading = false;
      this.cdr.markForCheck();
    },
    error: (err) => {
      const msg = err?.error?.message ?? 'upload failed';
      this.validationMessages = [...this.validationMessages, `${file.name}: ${msg}`];
      this.loading = false;
      this.cdr.markForCheck();
    },
  });
}

  removePhoto(photoId: number): void {
    if(!photoId) return;

    const index = this.photos.findIndex(ele=> ele.id == photoId);

    this.loading = true;
    const apibody = {
      endpoint : this.apiEndpoint || '',
      id : photoId
    }

    this.workspaceService.removePhoto(apibody).pipe(takeUntil(this.subject$))
    .subscribe({
      next: (res:{success : boolean, message : string})=>{
        this.getAllPhotos();
      },
      error : ()=>{
        this.loading = false;
      }
    })
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
