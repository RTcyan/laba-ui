import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { WithId } from "../models/types";
import { MarkLogItem } from "../models/mark-log-item";

@Injectable({ providedIn: 'root' })
export class MarkLogService {
  constructor(
    private http: HttpClient
  ) {}

  public getAll(): Observable<MarkLogItem[]> {
    return this.http.get<MarkLogItem[]>('api/markLog/all');
  }

  public createNew(schedule: WithId<MarkLogItem, 'scheduleItem' | 'student'>): Observable<MarkLogItem> {
    return this.http.post<MarkLogItem>('api/markLog', schedule);
  }

  public delete(id: string): Observable<void> {
    return this.http.delete<void>(`api/markLog/${id}`);
  }
}