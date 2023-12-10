import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Grade } from '../shared/models/grade';
import { Dictionary } from '../shared/models/dictionary';
import { WithId } from '../shared/models/types';
import { GradesService } from '../shared/services/grades.service';
import { mergeMap } from 'rxjs';
import { Teacher } from '../shared/models/teacher';
import { TeachersService } from '../shared/services/teachers.service';

@Component({
  selector: 'app-grades',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatButtonModule,
  ],
  templateUrl: './grades.component.html',
  styleUrl: './grades.component.scss'
})
export class GradesComponent {
  public grades: Grade[] = [];

  public gradesTypes: Dictionary[] = [];

  public teachers: Teacher[] = [];

  public newGrade: WithId<Grade, 'gradeType' | 'gradeTeacher'> = {};

  constructor(
    public gradesService: GradesService,
    public teachersService: TeachersService,
  ) {
    this.gradesService.getGrades().subscribe((grades) => {
      this.grades = grades;
    });
    this.gradesService.getAllGradesTypes().subscribe((gradesTypes) => {
      this.gradesTypes = gradesTypes;
    });
    this.teachersService.getAllTeachers().subscribe((teachers) => {
      this.teachers = teachers;
    });
  }

  public onCreateButtonClick() {
    this.gradesService.createNew(this.newGrade).pipe(
      mergeMap(() => this.gradesService.getGrades()),
    ).subscribe((grades) => {
      this.grades = grades;
    });
  }

  public onDeleteButtonClick(id: string) {
    this.gradesService.deleteTeacher(id).pipe(
      mergeMap(() => this.gradesService.getGrades()),
    ).subscribe((grades) => {
      this.grades = grades;
    });
  }
}
