import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss']
})
export class DefaultLayoutComponent implements OnInit {
  urlStringList: any = [];
  @Output() saveClicked = new EventEmitter<string>();
  InputValue: any = ''
  constructor(
    public router: Router,
    private apiMethod: ApiService,
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      console.log(event)

      console.log(event.urlAfterRedirects.split('/'))
      this.urlStringList = event.urlAfterRedirects.split('/')

    });
  }

  ngOnInit(): void {

  }
  onClick(clickValue: any) {
    if (clickValue != 'search') {
      this.apiMethod.clickEvent({ type: clickValue, value: '' });
    } else {
      this.apiMethod.clickEvent({ type: clickValue, value: this.InputValue });

    }

  }
}
