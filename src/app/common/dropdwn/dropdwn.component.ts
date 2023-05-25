import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: '[wgt-dropdwn]',
  templateUrl: './dropdwn.component.html',
  styleUrls: ['./dropdwn.component.css']
})
export class DropdwnComponent implements OnInit {

  currentOption!: string;
  @Input() empyElem: boolean = true;
  @Input() defaultOption!: string;
  constructor() { }

  ngOnInit(): void {
    this.currentOption = this.defaultOption;
  }

}
