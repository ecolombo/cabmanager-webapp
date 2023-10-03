import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { AddproductComponent } from './addproduct/addproduct.component';
import { BookingsComponent } from './bookings.component';
import { BookingsService } from 'src/app/services/bookings.service';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoriesComponent } from './categories/categories.component';
import { CategoriesService } from 'src/app/services/categories.service';
import { AddcategoryComponent } from './addcategory/addcategory.component';
import { LocationsComponent } from './locations/locations.component';
import { AddlocationComponent } from './addlocation/addlocation.component';
// import { AddcategoryComponent } from './addcategory/addcategory.component';


@NgModule({
  declarations: [
    BookingsComponent,
    CategoriesComponent,
    AddcategoryComponent,
    LocationsComponent,
    AddlocationComponent 
    //,
    //AddproductComponent,
    //ViewproductComponent,
    //DetailsproductComponent,
    //AddcategoryComponent
  ],
  imports: [
    CommonModule, RouterModule, ReactiveFormsModule
  ],
  providers :[
    BookingsService,
    CategoriesService
]
})
export class BookingsModule { }
