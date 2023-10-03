import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Pageable } from 'src/app/model/pageable.model';
import { BookingsService } from 'src/app/services/bookings.service';



@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {

  public bookingsList:any[] =[];
  public bookingInfo:any;
  public pageable:Pageable= { page:0, size:10, sort:'bookingId', sortOrder:'DESC' };
  public nextPageEnabled = true;
  public prevPageEnabled = false;

  constructor(private bookingsService:BookingsService, private modalService: NgbModal) {   }

  ngOnInit(): void {
    this.getBookings();
  }

  getBookings() {
    this.bookingsService.getAll(this.pageable).subscribe( (response:any)=> {
      this.bookingsList = response.content;
    })
    
    // Page scrolling:
    this.prevPageEnabled = (this.pageable.page > 0);
    let nextPageable = { ... this.pageable };
    nextPageable.page++;
    this.bookingsService.getAll(nextPageable).subscribe( (response:any)=> {
      this.nextPageEnabled = (response.content.length == 0) ? false : true;
    })
    
  }

  openBookingDialog(modalRef:any, bookingObj = null) {
    this.modalService.open(modalRef);
    this.bookingInfo = bookingObj;
  }

  closeModal(modalRef:any) {
    this.modalService.dismissAll(modalRef);
    this.getBookings();
  }

  delete(bookingId:any) {
    this.bookingsService.delete(bookingId).subscribe((response:any ) => {
      this.getBookings();
    });
  }

  prevPage() {
    if ( this.pageable.page > 0 ) {
      this.pageable.page--;
      this.getBookings();
    }
  }
  nextPage() {
    this.pageable.page++;
    this.prevPageEnabled = true;    
    this.getBookings();
  }


}
