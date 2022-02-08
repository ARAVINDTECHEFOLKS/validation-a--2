import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatabaseComponent } from '../app/database/database.component';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { FormValidateComponent } from './form-validate/form-validate.component';
const routes: Routes = [
  { path: '', component: FormValidateComponent },
  { path: 'database', component: DatabaseComponent },
  { path: 'form', component: FormValidateComponent },
];
@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
