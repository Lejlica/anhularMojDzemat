import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-moderatori',
  templateUrl: './moderatori.component.html',
  styleUrls: ['./moderatori.component.css']
})
export class ModeratoriComponent implements OnInit {

  constructor(private httpKlijent: HttpClient, private router: Router) {
  }

  ngOnInit(): void {
  }

}
