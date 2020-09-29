import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tinmc',
  templateUrl: './tinmc.component.html',
  styleUrls: ['./tinmc.component.css']
})
export class TinmcComponent implements OnInit {
  
  data: string;
  constructor() { }

  ngOnInit(): void {
  }


  dataChanged(e) {
    console.log(e);
  }
}
