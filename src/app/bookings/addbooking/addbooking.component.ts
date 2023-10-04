import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BookingsService } from 'src/app/services/bookings.service';
import { Router } from '@angular/router';
import { LocationsService } from 'src/app/services/locations.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { UsersService } from 'src/app/services/users.service';
import { Pageable } from 'src/app/model/pageable.model';

@Component({
  selector: 'app-addbooking',
  templateUrl: './addbooking.component.html',
  styleUrls: ['./addbooking.component.css']
})
export class AddbookingComponent implements OnInit {

  bookingForm:FormGroup = new FormGroup({});
  loader : boolean = false; // for Spinning loading...
  locationList:any[] =[];
  categoryList:any[]=[];
  userList:any[]=[];
  public pageableLoc:Pageable= { page:0, size:1000000, sort:'locationId', sortOrder:'DESC' };
  public pageableCat:Pageable= { page:0, size:1000000, sort:'categoryId', sortOrder:'DESC' };
  public pageableUsr:Pageable= { page:0, size:1000000, sort:'userId', sortOrder:'DESC' };

  @Input()
  public bookingInfo:any;

  @Output()
  public closeModal: EventEmitter<void> = new EventEmitter<void>();
  public errResponse: string ="";

  constructor( private modalService: NgbModal,  private formBuilder: FormBuilder, private bookingService: BookingsService, 
              private router: Router, private locationsService: LocationsService, private categoriesService: CategoriesService,
              private usersService: UsersService) {   }

  ngOnInit(): void {

      this.usersService.getAll(this.pageableUsr).subscribe( (response:any)=> {
      this.userList = response.content; });

      this.locationsService.getAll(this.pageableLoc).subscribe( (response:any)=> {
      this.locationList = response.content; });

      this.categoriesService.getAll(this.pageableCat).subscribe( (response:any)=> {
      this.categoryList = response.content; });

    if(this.bookingInfo) {
      this.initializeForm(this.bookingInfo);
    } else{
      this.initializeForm();
    }
   
  }

  initializeForm(bookingObj: any = null) {
    
    if (bookingObj === null) {
      this.bookingForm = this.formBuilder.group({
        bookingId: [null],
        user: ["", Validators.required],
        from: ["", Validators.required],
        to: ["", Validators.required],
        category: ["", Validators.required],
        pricePerKM: [{value: "", disabled: true }],
        distance: [{value: "", disabled: true }],
        fare: [{value: "", disabled: true }],
      });
    } else {
      console.log("feeding data: "+bookingObj.user.fullName);
      this.bookingForm = this.formBuilder.group({        
        bookingId: [null],
        user: [bookingObj.user, Validators.required],
        from: [bookingObj.from, Validators.required], 
        to: [bookingObj.to, Validators.required],
        category: [bookingObj.category, Validators.required],
        pricePerKM: [{value: bookingObj.category.pricePerKM, disabled: true }],
        distance: [{value: bookingObj.distance, disabled: true }],
        fare: [{value: bookingObj.fare, disabled: true }],
      });
      
    }

  }

  updateForm() {


 
    let ppkm = this.bookingForm.get('category')?.getRawValue().pricePerKM;
    if (!isNaN(ppkm)) {
      this.bookingForm.get('pricePerKM')?.setValue(ppkm);
    }

    let x1 = this.bookingForm.get('from')?.getRawValue().xcoord;
    let y1 = this.bookingForm.get('from')?.getRawValue().ycoord;
    let x2 = this.bookingForm.get('to')?.getRawValue().xcoord;
    let y2 = this.bookingForm.get('to')?.getRawValue().ycoord;

    if (!isNaN(x1) && !isNaN(y1) && !isNaN(x2) && !isNaN(y2)) {
      let distance = Math.sqrt( Math.pow(x2-x1, 2) + Math.pow(y2-y1, 2) ) / 1000.0;
      this.bookingForm.get('distance')?.setValue(distance);
    } else {
      this.bookingForm.get('distance')?.setValue(0);
    }

    let distance = this.bookingForm.get('distance')?.getRawValue();
    if (!isNaN(distance) && !isNaN(ppkm)) {
      let fare = ppkm * distance;
      this.bookingForm.get('fare')?.setValue(fare);
    } else {
      this.bookingForm.get('fare')?.setValue(0);
    }
    
  }

  onSelectedValueChangeUser(user: any) {
//    this.bookingForm.patchValue(
//        {user: this.userList.find(x => x.userId === user.userId) }
//      )
  }

  compareByUserId(user1: User, user2: User) {
    return user1 && user2 && user1.userId === user2.userId;
  }

  onSelectedValueChangeLocation(location: any) {
    this.updateForm();
  }

  compareByLocationId(location1: Location, location2: Location) {
    return location1 && location2 && location1.locationId === location2.locationId;
  }

  onSelectValueChangeCategory(category: any) {
    this.updateForm();
  }

  compareByCategoryId(category1: Category, category2: Category) {
    return category1 && category2 && category1.categoryId === category2.categoryId;
  }


  onSubmit() {
    if(this.bookingForm.valid) {
      if(this.bookingForm.get('bookingId')?.value) {
        this.handleUpdate();
      } else{
        this.handleCreate();
      }
    } else{
      this.errResponse = "Enable to submit form, Invalid form data";
      console.log("Invalid Form");
    }
  }

  handleCreate() {
    console.log(this.bookingForm.getRawValue());
    this.bookingService.add(this.bookingForm.getRawValue()).subscribe((response:any)=>{
      this.close();
      },error =>{
        this.errResponse = error.error.message;
      })
  }

  handleUpdate() {
    this.bookingService.update(this.bookingForm.getRawValue()).subscribe((response:any)=>{
        this.close();
      },error =>{
        this.errResponse = error.error.message;
      })
  }

  close() {
    this.closeModal.emit();
  }
}

export interface User{
  userId?: string;
  email?: string;
  password?: string;
  fullName?: string;
  phone?: string;
}

export interface Location {
  locationId?: string;
  name?: string;
  xcoord?: number;
  ycoord?: number;
}

export interface Category {
  categoryId?: string;
  name?: string;
  pricePerKM?: number;
}