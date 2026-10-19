import { Injectable } from "@angular/core";

@Injectable({
    providedIn :"root"
})
export class Environment{
    public readonly domainURL :string =  "http://localhost:8080";
}