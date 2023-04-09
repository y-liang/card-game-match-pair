import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-wave-divider',
  templateUrl: './wave-divider.component.html',
  styleUrls: ['./wave-divider.component.less']
})
export class WaveDividerComponent implements OnInit {

  @Input() wdType = '';

  constructor() { }

  ngOnInit(): void {
  }

}
