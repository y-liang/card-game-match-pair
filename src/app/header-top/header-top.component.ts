import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-top',
  templateUrl: './header-top.component.html',
  styleUrls: ['./header-top.component.less']
})
export class HeaderTopComponent implements OnInit {


  squares: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];


  constructor() { }


  ngOnInit(): void {


  }

}
