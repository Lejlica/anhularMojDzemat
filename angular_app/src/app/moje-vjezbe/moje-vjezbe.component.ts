import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {DuhovneVjezbeGetAllVM} from "../vjezbe/DuhovneVjezbeGetAllVM";
import {MojConfig} from "../moj-config";
import {MojaVjezbaVM} from "./MojaVjezbaVM";

@Component({
  selector: 'app-moje-vjezbe',
  templateUrl: './moje-vjezbe.component.html',
  styleUrls: ['./moje-vjezbe.component.css']
})
export class MojeVjezbeComponent implements OnInit {

  vjezbaID:any;
  mojeVjezbePodaci: MojaVjezbaVM[]=[];
  novaMojaVjezba: MojaVjezbaVM;
   duhovneVjezbePodaci: DuhovneVjezbeGetAllVM[]=[];
  constructor(private httpKlijent:HttpClient,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(x=>this.vjezbaID=+x["id"]);

  }
  ucitajPodatke()
  {
    this.httpKlijent.get<MojaVjezbaVM>(MojConfig.adresa_servera+"/MojeVjezbe/GetAll").subscribe((x:any)=>{this.mojeVjezbePodaci=x});
  }
  getPodaci()
  {
    if(this.mojeVjezbePodaci==null)
      return [];
    return this.mojeVjezbePodaci;
  }
  getSlika(s:DuhovneVjezbeGetAllVM)
  {
    return `${MojConfig.adresa_servera}/DuhovnaVjezba/GetSlikaKorisnika/${s.id}`;
  }
  getPodaciDuhVjezbe()
  {
    this.httpKlijent.get<DuhovneVjezbeGetAllVM>(MojConfig.adresa_servera+"/DuhovnaVjezba/GetAll?vjezbaId="+this.vjezbaID).subscribe((x:any)=>{this.duhovneVjezbePodaci=x});
  }
  getPodaciDV()
  {
    if(this.duhovneVjezbePodaci==null)
      return [];
    return this.duhovneVjezbePodaci;
  }

}
