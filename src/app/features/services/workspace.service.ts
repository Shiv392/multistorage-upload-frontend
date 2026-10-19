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
}