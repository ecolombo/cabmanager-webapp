import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LocationsService } from 'src/app/services/locations.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addlocation',
  templateUrl: './addlocation.component.html',
  styleUrls: ['./addlocation.component.css']
})
export class AddlocationComponent implements OnInit {

  locationForm:FormGroup = new FormGroup({});
  loader : boolean = false; // for Spinning loading...

  @Input()
  public locationInfo:any;

  @Output()
  public closeModal: EventEmitter<void> = new EventEmitter<void>();
  public errResponse: string ="";

  constructor( private modalService: NgbModal,  private formBuilder:FormBuilder, private locationService: LocationsService, private router:Router) {   }

  ngOnInit(): void {
    if(this.locationInfo) {
//      this.locationId = this.locationInfo.locationId;
      this.initializeForm(this.locationInfo);
    } else{
      this.initializeForm();
    }
   
  }

  initializeForm(locationObj: any = null) {
    if (locationObj === null) {
      this.locationForm = this.formBuilder.group({
        locationId: [null],
        name: ["", Validators.required],
        xcoord: ["", Validators.required],
        ycoord: ["", Validators.required]
      });
    } else {
      this.locationForm = this.formBuilder.group({
        locationId: [locationObj.locationId],
        name: [locationObj.name, Validators.required],
        xcoord: [locationObj.xcoord, Validators.required],
        ycoord: [locationObj.ycoord, Validators.required]
      });
    }
  }

  onSubmit() {
    if(this.locationForm.valid) {
      if(this.locationForm.get('locationId')?.value) {
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
    console.log(this.locationForm.getRawValue());
    this.locationService.add(this.locationForm.getRawValue()).subscribe((response:any)=>{
      this.close();
      },error =>{
        this.errResponse = error.error.message;
      })
  }

  handleUpdate() {
    this.locationService.update(this.locationForm.getRawValue()).subscribe((response:any)=>{
        this.close();
      },error =>{
        this.errResponse = error.error.message;
      })
  }

  close() {

    this.closeModal.emit();
  }
}
