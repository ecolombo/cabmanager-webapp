import { Component, EventEmitter, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Pageable } from 'src/app/model/pageable.model';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public usersList:any[] =[];
  public userInfo:any;
  public pageable:Pageable= { page:0, size:10, sort:'userId', sortOrder:'DESC' };
  public nextPageEnabled = true;
  public prevPageEnabled = false;

  constructor(private usersService:UsersService, private modalService: NgbModal) {   }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.usersService.getAll(this.pageable).subscribe( (response:any)=> {
      this.usersList = response.content;
    })
    
    // Page scrolling:
    this.prevPageEnabled = (this.pageable.page > 0);
    let nextPageable = { ... this.pageable };
    nextPageable.page++;
    this.usersService.getAll(nextPageable).subscribe( (response:any)=> {
      this.nextPageEnabled = (response.content.length == 0) ? false : true;
    })
    
  }

  openUserDialog(modalRef:any, userObj = null) {
    this.modalService.open(modalRef);
    this.userInfo = userObj;
  }

  closeModal(modalRef:any) {
    this.modalService.dismissAll(modalRef);
    this.getUsers();
  }

  delete(userId:any) {
    this.usersService.delete(userId).subscribe((response:any ) => {
      this.getUsers();
    });
  }

  prevPage() {
    if ( this.pageable.page > 0 ) {
      this.pageable.page--;
      this.getUsers();
    }
  }
  nextPage() {
    this.pageable.page++;
    this.prevPageEnabled = true;    
    this.getUsers();
  }


}
