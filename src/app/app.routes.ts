import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { StudentsComponent } from './students/students.component';
import { TeachersComponent } from './teachers/teachers.component';
import { GradesComponent } from './grades/grades.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'students',
        component: StudentsComponent,
      },
      {
        path: 'teachers',
        component: TeachersComponent,
      },
      {
        path: 'grades',
        component: GradesComponent,
      }
    ],
  }
];
