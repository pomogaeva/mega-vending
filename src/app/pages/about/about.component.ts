import { Component, OnInit } from '@angular/core';
declare const VendiGO: any;

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    VendiGO.onReady();
  }

}
