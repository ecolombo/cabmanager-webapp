import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoriesService } from 'src/app/services/categories.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.css']
})
export class AddcategoryComponent implements OnInit {

  // prodCategoryBool: boolean = true;
  categoryForm:FormGroup = new FormGroup({});
  loader : boolean = false; // for Spinning loading...
//categoryId: number;


  @Input()
  public categoryInfo:any;

  @Output()
  public closeModel: EventEmitter<void> = new EventEmitter<void>();
  public errResponse: string ="";

  constructor( private modalService: NgbModal,  private formBuilder:FormBuilder, private categoryService: CategoriesService, private router:Router) { 
//    this.categoryId = 0;
  }

  ngOnInit(): void {
    if(this.categoryInfo) {
//      this.categoryId = this.categoryInfo.categoryId;
      this.initializeForm(this.categoryInfo);
    } else{
      this.initializeForm();
    }
   
  }

  initializeForm(categoryObj: any = null) {
    if (categoryObj === null) {
      this.categoryForm = this.formBuilder.group({
        categoryId: [null],
        name: ["", Validators.required],
        pricePerKM: ["", Validators.required]
      });
    } else {
      this.categoryForm = this.formBuilder.group({
        categoryId: [categoryObj.categoryId],
        name: [categoryObj.name, Validators.required],
        pricePerKM: [categoryObj.pricePerKM, Validators.required]
      });
    }
  }

  onSubmit() {
    if(this.categoryForm.valid) {
      if(this.categoryForm.get('categoryId')?.value) {
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
    console.log(this.categoryForm.getRawValue());
    this.categoryService.add(this.categoryForm.getRawValue()).subscribe((response:any)=>{
      // console.log(response);
      // this.router.navigateByUrl('/bookings/categories');
      window.location.href ="/bookings/categories"; // not very "single-app" but other solutions are complex
      this.close();
      },error =>{
        this.errResponse = error.error.message;
      })
  }

  handleUpdate() {
    this.categoryService.update(this.categoryForm.getRawValue()).subscribe((response:any)=>{
      // console.log(response);
      window.location.href ="/bookings/categories";
        this.close();
      },error =>{
        this.errResponse = error.error.message;
      })
  }

  close() {

    this.closeModel.emit();
  }
}
