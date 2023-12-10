import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TeachersService } from '../shared/services/teachers.service';
import { Teacher } from '../shared/models/teacher';
import { DisciplinesService } from '../shared/services/desciplines.service';
import { Dictionary } from '../shared/models/dictionary';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { WithId } from '../shared/models/types';
import { mergeMap } from 'rxjs';

@Component({
  selector: 'app-teachers',
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
  templateUrl: './teachers.component.html',
  styleUrl: './teachers.component.scss'
})
export class TeachersComponent {
  public teachers: Teacher[] = [];

  public disciplines: Dictionary[] = [];

  public newTeacher: WithId<Teacher, 'discipline'> = {};

  constructor(
    public teachersService: TeachersService,
    public disciplinesService: DisciplinesService,
  ) {
    this.teachersService.getAllTeachers().subscribe((teachers) => {
      this.teachers = teachers;
    });
    this.disciplinesService.getAllDisciplines().subscribe((disciplines) => {
      this.disciplines = disciplines;
    });
  }

  public onCreateButtonClick() {
    this.teachersService.createNewTeacher(this.newTeacher).pipe(
      mergeMap(() => this.teachersService.getAllTeachers()),
    ).subscribe((teachers) => {
      this.teachers = teachers;
    });
  }

  public onDeleteButtonClick(id: string) {
    this.teachersService.deleteTeacher(id).pipe(
      mergeMap(() => this.teachersService.getAllTeachers()),
    ).subscribe((teachers) => {
      this.teachers = teachers;
    });
  }
}
