import { Injectable } from "@angular/core";

@Injectable({
    providedIn : "root"
})
export class Controller{
    public readonly dbUpload : string = '/api/v1/db-storage/photos'
    public readonly serverUpload : string = '/api/v1/server-storage/photos'
    public readonly bucketUpload : string = '/api/v1/db-storage/photos';
    public readonly serverBucketUpload: string = "/api/v1/bucket-storage/server-bucket/photo";
    public readonly clientBucketUpload: string = "/api/v1/bucket-storage/client-bucket/photo";

}