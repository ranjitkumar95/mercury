// Core
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";

@Injectable({ providedIn: "root" })
export class CitGlobalConstantService {

    baseUrl: string = environment.domain;
    CustomerList: string = this.baseUrl + "OfferToolApi/Customer/list";
    customerDetails: String = this.baseUrl + "OfferToolApi/Customer/details";
    shipTo: String = this.baseUrl + "OfferToolApi/Customer/shipto";
    materialList: string = this.baseUrl + "OfferToolApi/list"
    characteristics: string = this.baseUrl + "OfferToolApi/characteristics"
    pricing: string = this.baseUrl + "OfferToolApi/pricing"
}