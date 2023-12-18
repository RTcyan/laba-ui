import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Student } from "../models/student";
import { WithId } from "../models/types";

@Injectable({ providedIn: 'root' })
export class StudentsSerivce {
  constructor(
    private http: HttpClient
  ) {}

  public getAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>('api/student/all');
  }

  public createNew(student: WithId<Student, 'grade'>): Observable<Student> {
    return this.http.post<Student>('api/student', student);
  }

  public delete(id: string): Observable<void> {
    return this.http.delete<void>(`api/student/${id}`);
  }
}