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
  public nextPageEnabled = true;
  public prevPageEnabled = false;

  constructor(private categoriesService:CategoriesService, private modalService: NgbModal) {   }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categoriesService.getAll(this.pageable).subscribe( (response:any)=> {
      // console.log(response.content);
      this.categoriesList = response.content;
    })
    
    // Page scrolling:
    this.prevPageEnabled = (this.pageable.page > 0);
    let nextPageable = { ... this.pageable };
    nextPageable.page++;
    this.categoriesService.getAll(nextPageable).subscribe( (response:any)=> {
      this.nextPageEnabled = (response.content.length == 0) ? false : true;
    })
    
  }

  openCategoryDialog(modalRef:any, categoryObj = null) {
    this.modalService.open(modalRef);
    this.categoryInfo = categoryObj;
  }

  closeModal(modalRef:any) {
    this.modalService.dismissAll(modalRef);
    this.getCategories();
  }

  delete(categoryId:any) {
    this.categoriesService.delete(categoryId).subscribe((response:any ) => {
      this.getCategories();
    });
  }

  prevPage() {
    if ( this.pageable.page > 0 ) {
      this.pageable.page--;
      this.getCategories();
    }
  }
  nextPage() {
    this.pageable.page++;
    this.prevPageEnabled = true;    
    this.getCategories();
  }


}
