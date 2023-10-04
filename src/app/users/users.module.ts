import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AdduserComponent } from './adduser/adduser.component';
import { UsersService } from '../services/users.service';

@NgModule({
  declarations: [
    UsersComponent,
    AdduserComponent,
  ],
  imports: [
    CommonModule, RouterModule, ReactiveFormsModule
  ],
  providers :[
    UsersService
]
})
export class UsersModule { }
