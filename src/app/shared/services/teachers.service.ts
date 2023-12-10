import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Teacher } from "../models/teacher";
import { WithId } from "../models/types";

@Injectable({ providedIn: 'root' })
export class TeachersService {
  constructor(
    private http: HttpClient
  ) {}

  public getAllTeachers(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>('api/teacher/all');
  }

  public createNewTeacher(teacher: WithId<Teacher, 'discipline'>): Observable<Teacher> {
    return this.http.post<Teacher>('api/teacher', teacher);
  }

  public deleteTeacher(id: string): Observable<void> {
    return this.http.delete<void>(`api/teacher/${id}`);
  }
}