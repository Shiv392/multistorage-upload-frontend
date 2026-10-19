import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { Environment } from "../../utils/Environment";

@Injectable({
    providedIn : "root"
})

export class WorkspaceService{

    private http = inject(HttpClient);
    private environment = inject(Environment);

    public getPhotos(apibody:{endpoint: string}) : Observable<any>{
        const url = this.environment.domainURL+apibody.endpoint;
        return this.http.get<any>(url)
        .pipe(
            catchError((error : HttpErrorResponse)=>{
                return throwError(()=> error.error)
            })
        )
    }

    public uploadPhoto(apibody: {endpoint: string, file: File, description?: string}): Observable<any>{
        const url = this.environment.domainURL+apibody.endpoint;
        const formData = new FormData();
        formData.append("file", apibody.file);
        if(apibody.description) formData.append("description", apibody.description);

        return this.http.post<any>(url, formData)
        .pipe(
            catchError((error : HttpErrorResponse)=>{
                return throwError(()=> error.error)
            })
        )
    }
}