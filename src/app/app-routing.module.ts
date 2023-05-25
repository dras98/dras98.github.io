import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './common/error-page/error-page.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path : '', redirectTo: 'home', pathMatch: 'full' },
  { path : 'home', component: HomeComponent },
  // { path : 'results', component: ResultsComponent },
  { path: '**', component: ErrorPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
