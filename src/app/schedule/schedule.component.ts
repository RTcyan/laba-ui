import { DisciplinesService } from './../shared/services/desciplines.service';
import { TeachersService } from './../shared/services/teachers.service';
import { CabinetesService } from './../shared/services/cabinetes.service';
import { ScheduleSerivce } from './../shared/services/schedule.service';
import { Component } from '@angular/core';
import { ScheduleItem } from '../shared/models/schedule-item';
import { WithId } from '../shared/models/types';
import { Dictionary } from '../shared/models/dictionary';
import { Teacher } from '../shared/models/teacher';
import { Grade } from '../shared/models/grade';
import { GradesService } from '../shared/services/grades.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { mergeMap, tap } from 'rxjs';
import { MatInputModule } from '@angular/material/input';
import { Cabinet } from '../shared/models/cabinet';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatButtonModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.scss'
})
export class ScheduleComponent {
  public newScheduleItem: WithId<ScheduleItem, 'grade' | 'cabinet' | 'discipline' | 'teacher'> = {}

  public scheduleItems: ScheduleItem[] = [];
  
  public cabinetes: Cabinet[] = [];

  public disciplines: Dictionary[] = [];

  public teachers: Teacher[] = [];

  public grades: Grade[] = [];

  public constructor(
    public scheduleSerivce: ScheduleSerivce,
    public cabinetesService: CabinetesService,
    public teachersService: TeachersService,
    public gradeService: GradesService,
    public disciplinesService: DisciplinesService,
  ) {
    this.scheduleSerivce.getAll().subscribe((scheduleItems) => {
      this.scheduleItems = scheduleItems;
    });
    this.cabinetesService.getAll().subscribe((cabinetes) => {
      this.cabinetes = cabinetes;
    });
    this.teachersService.getAllTeachers().subscribe((teachers) => {
      this.teachers = teachers;
    });
    this.gradeService.getGrades().subscribe((grades) => {
      this.grades = grades;
    });
    this.disciplinesService.getAllDisciplines().subscribe((disciplines) => {
      this.disciplines = disciplines;
    });
  }

  public onDateTimeChange(dateTime: string): void {
    console.log(dateTime);
    this.newScheduleItem.dateTime = new Date(dateTime);
    console.log(this.newScheduleItem.dateTime);
  }

  public get scheduleDateTime(): string | undefined {
    //yyyy-MM-ddThh:mm
    const dt = this.newScheduleItem.dateTime;
    if (!dt) {
      return undefined;
    }
    const month = dt.getMonth() >= 10 ? dt.getMonth() : `0${dt.getMonth()}`;
    const day = dt.getDay() >= 10 ? dt.getDay() : `0${dt.getDay()}`;
    const hours = dt.getHours() >= 10 ? dt.getHours() : `0${dt.getHours()}`;
    const minutes = dt.getMinutes() >= 10 ? dt.getMinutes() : `0${dt.getMinutes()}`;
    return `${dt.getFullYear()}-${month}-${day}T${hours}:${minutes}`;
  }

  public onCreateButtonClick(): void {
    this.scheduleSerivce.createNew(this.newScheduleItem).pipe(
      tap(() => {
        this.newScheduleItem = {};
      }),
      mergeMap(() => this.scheduleSerivce.getAll()),
      tap((scheduleItems) => {
        this.scheduleItems = scheduleItems;
      })
    ).subscribe();
  }

  public onDeleteButtonClick(id : string): void {
    this.scheduleSerivce.delete(id).pipe(
      mergeMap(() => this.scheduleSerivce.getAll()),
      tap((scheduleItems) => {
        this.scheduleItems = scheduleItems;
      })
    ).subscribe();
  }
}
