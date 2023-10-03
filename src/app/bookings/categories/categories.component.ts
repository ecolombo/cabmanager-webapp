import { Component, EventEmitter, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Pageable } from 'src/app/model/pageable.model';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  public categoriesList:any[] =[];
  public categoryInfo:any;
  public pageable:Pageable= { page:0, size:10, sort:'categoryId', sortOrder:'DESC' };

  constructor(private categoriesService:CategoriesService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories() {
    this.categoriesService.getAll(this.pageable).subscribe( (response:any)=> {
      // console.log(response);
      this.categoriesList = response.content;
    })
  }

  openProductCategoryDialog(modalRef:any, productCategoryObj = null) {
    this.modalService.open(modalRef);
    this.categoryInfo = productCategoryObj;
  }

  closeModal(modalRef:any) {
    this.modalService.dismissAll(modalRef);
  }

  delete(categoryId:any) {
    this.categoriesService.delete(categoryId).subscribe((response:any ) => {
      this.getAllCategories();
    });
  }


}
