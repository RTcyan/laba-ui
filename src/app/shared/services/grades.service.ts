import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Grade } from "../models/grade";
import { Observable } from "rxjs";
import { Dictionary } from "../models/dictionary";
import { WithId } from "../models/types";

@Injectable({ providedIn: 'root' })
export class GradesService {
  constructor(private http: HttpClient) {}

  public getGrades(): Observable<Grade[]> {
    return this.http.get<Grade[]>('api/grade/all');
  }

  public createNew(grade: WithId<Grade, 'gradeType' | 'gradeTeacher'>): Observable<Grade> {
    return this.http.post<Grade>('api/grade', grade);
  }

  public deleteTeacher(id: string): Observable<void> {
    return this.http.delete<void>(`api/grade/${id}`);
  }

  public getAllGradesTypes(): Observable<Dictionary[]> {
    return this.http.get<Dictionary[]>('api/gradeType/all');
  }
}