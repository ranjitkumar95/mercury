import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router, RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss']
})
export class DefaultLayoutComponent implements OnInit {
  urlStringList: any;
  constructor(
    public router:Router
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event:any) => {
      console.log("++++++++++++===========++++++++++++")
      console.log(event.url.split('/'))
      this.urlStringList=event.url.split('/')
      
    });
   }

  ngOnInit(): void {
    
  }

}
