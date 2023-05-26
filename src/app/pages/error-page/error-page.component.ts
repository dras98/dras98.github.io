import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { BaseComponent } from '../../common/base/base.component';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent extends BaseComponent implements OnInit {

  constructor(private navService: NavigationService) {
    super();
  }

  ngOnInit(): void {
  }

  goHome(): void {
    this.navService.navigate([this.endpoints.local.home]);
  }

}
