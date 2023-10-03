import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingsComponent } from 'src/app/bookings/bookings.component';
import { UsersComponent } from 'src/app/users/users.component';
import { CategoriesComponent } from './bookings/categories/categories.component';
import { LocationsComponent } from './bookings/locations/locations.component';

const routes: Routes = [
  { path: '', component: BookingsComponent },
  { path: 'bookings',  children: [
    { path: '',             component: BookingsComponent },
    { path: 'categories' ,  component: CategoriesComponent},
    { path: 'locations' ,   component: LocationsComponent},
  ]}, 
  { path: 'users', component: UsersComponent }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
