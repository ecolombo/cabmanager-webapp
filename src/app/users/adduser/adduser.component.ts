import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {

  userForm: FormGroup = new FormGroup({});
  loader : boolean = false; // for Spinning loading...

  @Input()
  public userInfo:any;

  @Output()
  public closeModal: EventEmitter<void> = new EventEmitter<void>();
  public errResponse: string ="";

  constructor( private modalService: NgbModal,  private formBuilder:FormBuilder, private userService: UsersService, private router:Router) {   }

  ngOnInit(): void {
    if(this.userInfo) {
//      this.userId = this.userInfo.userId;
      this.initializeForm(this.userInfo);
    } else{
      this.initializeForm();
    }
   
  }

  initializeForm(userObj: any = null) {
    if (userObj === null) {
      this.userForm = this.formBuilder.group({
        userId: [null],
        fullName: ["", Validators.required],
        email: ["", Validators.required],
        phone: ["", Validators.required],
        address: [""],
        addedOn: [{value: "", disabled: true } ]
      });
    } else {
      this.userForm = this.formBuilder.group({
        userId: [userObj.userId],
        fullName: [userObj.fullName, Validators.required],
        email: [userObj.email, Validators.required],
        phone: [userObj.phone, Validators.required],
        address: [userObj.address],
        addedOn: [{value: userObj.addedOn, disabled: true } ]
      });
    }
  }

  onSubmit() {
    if(this.userForm.valid) {
      if(this.userForm.get('userId')?.value) {
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
    console.log(this.userForm.getRawValue());
    this.userService.add(this.userForm.getRawValue()).subscribe((response:any)=>{
      this.close();
      },error =>{
        this.errResponse = error.error.message;
      })
  }

  handleUpdate() {
    this.userService.update(this.userForm.getRawValue()).subscribe((response:any)=>{
        this.close();
      },error =>{
        this.errResponse = error.error.message;
      })
  }

  close() {

    this.closeModal.emit();
  }
}
