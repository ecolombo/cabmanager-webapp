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
  public pageable:Pageable= { page:0, size:10, sort:'bookingId', sortOrder:'DESC' };

  constructor(private bookingsService:BookingsService,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getAllBookings();
  }
  
  
  getAllBookings() {
    this.bookingsService.getAll(this.pageable).subscribe((response:any)=> {
      console.log(response);
      this.bookingsList = response.content;
    })
  }

  delete(bookingId:any) {
    this.bookingsService.delete(bookingId).subscribe(response=>{
      this.getAllBookings();
    })
  } 


}
