import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { CountrypageComponent } from './countrypage/countrypage.component';
import { AnimalpageComponent } from './animalpage/animalpage.component';


const routes: Routes = [
  { path: '', component: HomepageComponent},
  { path: 'countries/:isocode', component: CountrypageComponent},
  { path: 'animals/:name', component: AnimalpageComponent},
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
