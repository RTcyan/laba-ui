import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Student } from "../models/student";

@Injectable({ providedIn: 'root' })
export class StudentsSerivce {
  constructor(
    private http: HttpClient
  ) {}

  public getAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>('api/student/all');
  }
}