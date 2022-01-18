import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.css']
})
export class CategoryCardComponent implements OnInit {

  @Input()
  image: string = '';
  @Input()
  width: string = '';
  @Input()
  background: string = '';
  @Input()
  text_color: string = '';
  @Input()
  text: string = '';
  @Input()
  name:string='';
  @Input()
  select:string='';

  constructor() {
  }

  ngOnInit(): void {
  }

}
