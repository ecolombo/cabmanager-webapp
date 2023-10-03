import { Component, EventEmitter, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Pageable } from 'src/app/model/pageable.model';
import { LocationsService } from 'src/app/services/locations.service';


@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {

  public locationsList:any[] =[];
  public locationInfo:any;
  public pageable:Pageable= { page:0, size:10, sort:'locationId', sortOrder:'DESC' };
  public nextPageEnabled = true;
  public prevPageEnabled = false;

  constructor(private locationsService:LocationsService, private modalService: NgbModal) {   }

  ngOnInit(): void {
    this.getLocations();
  }

  getLocations() {
    this.locationsService.getAll(this.pageable).subscribe( (response:any)=> {
      this.locationsList = response.content;
    })
    
    // Page scrolling:
    this.prevPageEnabled = (this.pageable.page > 0);
    let nextPageable = { ... this.pageable };
    nextPageable.page++;
    this.locationsService.getAll(nextPageable).subscribe( (response:any)=> {
      this.nextPageEnabled = (response.content.length == 0) ? false : true;
    })
    
  }

  openLocationDialog(modalRef:any, locationObj = null) {
    this.modalService.open(modalRef);
    this.locationInfo = locationObj;
  }

  closeModal(modalRef:any) {
    this.modalService.dismissAll(modalRef);
    this.getLocations();
  }

  delete(locationId:any) {
    this.locationsService.delete(locationId).subscribe((response:any ) => {
      this.getLocations();
    });
  }

  prevPage() {
    if ( this.pageable.page > 0 ) {
      this.pageable.page--;
      this.getLocations();
    }
  }
  nextPage() {
    this.pageable.page++;
    this.prevPageEnabled = true;    
    this.getLocations();
  }


}
