import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Dictionary } from "../models/dictionary";

@Injectable({ providedIn: 'root' })
export class DisciplinesService {
  constructor(private http: HttpClient) { }

  public getAllDisciplines(): Observable<Dictionary[]> {
    return this.http.get<Dictionary[]>('api/discipline/all');
  }
}