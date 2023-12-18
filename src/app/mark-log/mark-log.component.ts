import { ScheduleSerivce } from './../shared/services/schedule.service';
import { MarkLogService } from './../shared/services/mark-log.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MarkLogItem } from '../shared/models/mark-log-item';
import { WithId } from '../shared/models/types';
import { ScheduleItem } from '../shared/models/schedule-item';
import { Student } from '../shared/models/student';
import { StudentsSerivce } from '../shared/services/students.service';
import { mergeMap, tap } from 'rxjs';

@Component({
  selector: 'app-mark-log',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    FormsModule,
    MatNativeDateModule,
    MatButtonModule,
  ],
  templateUrl: './mark-log.component.html',
  styleUrl: './mark-log.component.scss'
})
export class MarkLogComponent {
  public newMarkLogItem: WithId<MarkLogItem, 'scheduleItem' | 'student'> = {}

  public markLogItems: MarkLogItem[] = [];
  
  public scheduleItems: ScheduleItem[] = [];

  public students: Student[] = [];

  public marks = [2,3,4,5];

  public constructor(
    public markLogService: MarkLogService,
    public scheduleSerivce: ScheduleSerivce,
    public studentService: StudentsSerivce,
  ) {
    this.markLogService.getAll().subscribe((markLogItems) => {
      this.markLogItems = markLogItems;
    });
    this.scheduleSerivce.getAll().subscribe((scheduleItems) => {
      this.scheduleItems = scheduleItems;
    });
    this.studentService.getAllStudents().subscribe((students) => {
      this.students = students;
    });
  }

  public onCreateButtonClick(): void {
    this.markLogService.createNew(this.newMarkLogItem).pipe(
      tap(() => {
        this.newMarkLogItem = {};
      }),
      mergeMap(() => this.markLogService.getAll()),
      tap((markLogItems) => {
        this.markLogItems = markLogItems;
      })
    ).subscribe();
  }

  public onDeleteButtonClick(id : string): void {
    this.markLogService.delete(id).pipe(
      mergeMap(() => this.markLogService.getAll()),
      tap((markLogItems) => {
        this.markLogItems = markLogItems;
      })
    ).subscribe();
  }
}
