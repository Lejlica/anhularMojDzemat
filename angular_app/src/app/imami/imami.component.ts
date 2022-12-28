import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-imami',
  templateUrl: './imami.component.html',
  styleUrls: ['./imami.component.css']
})
export class ImamiComponent implements OnInit {

  constructor(private httpKlijent: HttpClient, private router: Router) {
  }

  ngOnInit(): void {
  }

}
