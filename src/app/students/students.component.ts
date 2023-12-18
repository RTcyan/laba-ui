import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { WithId } from '../shared/models/types';
import { Student } from '../shared/models/student';
import { StudentsSerivce } from '../shared/services/students.service';
import { Grade } from '../shared/models/grade';
import { GradesService } from '../shared/services/grades.service';
import { mergeMap, tap } from 'rxjs';

@Component({
  selector: 'app-students',
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
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent {
  public students: Student[] = [];

  public grades: Grade[] = [];

  public newStudent: WithId<Student, 'grade'> = {};

  public constructor(
    public strudentService: StudentsSerivce,
    public gradeService: GradesService,
  ) {
    this.strudentService.getAllStudents().subscribe((students) => {
      this.students = students;
    });
    this.gradeService.getGrades().subscribe((grades) => {
      this.grades = grades;
    });
  }

  public onCreateButtonClick(): void {
    this.strudentService.createNew(this.newStudent).pipe(
      tap(() => {
        this.newStudent = {};
      }),
      mergeMap(() => this.strudentService.getAllStudents()),
      tap((students) => {
        this.students = students;
      })
    ).subscribe();
  }

  public onDeleteButtonClick(id : string): void {
    this.strudentService.delete(id).pipe(
      mergeMap(() => this.strudentService.getAllStudents()),
      tap((students) => {
        this.students = students;
      })
    ).subscribe();
  }
}
