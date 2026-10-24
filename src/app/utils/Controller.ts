import { Injectable } from "@angular/core";

@Injectable({
    providedIn : "root"
})
export class Controller{
    public readonly dbUpload : string = '/api/v1/db-storage/photos'
    public readonly serverUpload : string = '/api/v1/server-storage/photos'
    public readonly bucketUpload : string = '/api/v1/db-storage/photos'
}