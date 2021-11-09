// Core
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";

@Injectable({ providedIn: "root" })
export class CitGlobalConstantService {

    baseUrl: string = environment.domain;
    OfferSummeryList:string=this.baseUrl+"";
}