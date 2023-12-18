import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Student } from "../models/student";
import { WithId } from "../models/types";
import { ScheduleItem } from "../models/schedule-item";

@Injectable({ providedIn: 'root' })
export class ScheduleSerivce {
  constructor(
    private http: HttpClient
  ) {}

  public getAll(): Observable<ScheduleItem[]> {
    return this.http.get<ScheduleItem[]>('api/schedule/all');
  }

  public createNew(schedule: WithId<ScheduleItem, 'grade' | 'cabinet' | 'discipline' | 'teacher'>): Observable<ScheduleItem> {
    return this.http.post<ScheduleItem>('api/schedule', schedule);
  }

  public delete(id: string): Observable<void> {
    return this.http.delete<void>(`api/schedule/${id}`);
  }
}