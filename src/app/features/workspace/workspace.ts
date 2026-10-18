import { Component } from '@angular/core';


interface PhotoPreview {
  id: number;
  file: File;
  previewUrl: string;
}

@Component({
  imports: [],
  selector: 'app-workspace',
  styleUrl: './workspace.css',
  templateUrl: './workspace.html',
})


export class Workspace {
  readonly maxFileSize = 2 * 1024 * 1024;
  photos: PhotoPreview[] = [];
  validationMessages: string[] = [];
  isDragging = false;
  private nextPhotoId = 0;

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
    const messages: string[] = [];

    for (const file of files) {
      if (!this.isSupportedImage(file)) {
        messages.push(`${file.name}: choose a PNG or JPG image.`);
        continue;
      }

      if (file.size > this.maxFileSize) {
        messages.push(`${file.name}: the file exceeds the 2 MB limit.`);
        continue;
      }

      this.photos = [
        ...this.photos,
        {
          id: this.nextPhotoId++,
          file,
          previewUrl: URL.createObjectURL(file),
        },
      ];
    }

    this.validationMessages = messages;
  }

  removePhoto(photoId: number): void {
    const photo = this.photos.find(({ id }) => id === photoId);
    if (photo) {
      URL.revokeObjectURL(photo.previewUrl);
      this.photos = this.photos.filter(({ id }) => id !== photoId);
    }
  }

  ngOnDestroy(): void {
    for (const photo of this.photos) {
      URL.revokeObjectURL(photo.previewUrl);
    }
  }

  private isSupportedImage(file: File): boolean {
    const extension = file.name.split('.').pop()?.toLowerCase();
    const hasAllowedExtension = ['png', 'jpg', 'jpeg'].includes(extension ?? '');
    const hasAllowedType = !file.type || ['image/png', 'image/jpeg', 'image/jpg'].includes(file.type.toLowerCase());
    return hasAllowedExtension && hasAllowedType;
  }
}
