import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Cabinet } from "../models/cabinet";

@Injectable({ providedIn: 'root' })
export class CabinetesService {
  constructor(private http: HttpClient) { }

  public getAll(): Observable<Cabinet[]> {
    return this.http.get<Cabinet[]>('api/cabinet/all');
  }
}