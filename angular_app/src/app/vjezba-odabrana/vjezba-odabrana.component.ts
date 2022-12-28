import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {DuhovneVjezbeGetAllVM} from "../vjezbe/DuhovneVjezbeGetAllVM";
import {MojConfig} from "../moj-config";
import {VijestiVM} from "../vijesti/VijestiVM";

@Component({
  selector: 'app-vjezba-odabrana',
  templateUrl: './vjezba-odabrana.component.html',
  styleUrls: ['./vjezba-odabrana.component.css']
})
export class VjezbaOdabranaComponent implements OnInit {

  vjezbaID:any;
  public duhovneVjezbePodaci: DuhovneVjezbeGetAllVM[]=[];

  constructor(private httpKlijent: HttpClient, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(x=>this.vjezbaID=+x["id"]);
    this.ucitajPodatke();
  }
  ucitajPodatke()
  {
    this.httpKlijent.get<DuhovneVjezbeGetAllVM>(MojConfig.adresa_servera+"/DuhovnaVjezba/GetAll?vjezbaId="+this.vjezbaID).subscribe((x:any)=>{this.duhovneVjezbePodaci=x});
  }
  getSlika(s:DuhovneVjezbeGetAllVM)
  {
    return `${MojConfig.adresa_servera}/DuhovnaVjezba/GetSlikaKorisnika/${s.id}`;

  }
}
