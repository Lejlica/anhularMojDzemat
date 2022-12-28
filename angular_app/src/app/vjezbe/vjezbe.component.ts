import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {MojConfig} from "../moj-config";
import {DuhovneVjezbeGetAllVM} from "./DuhovneVjezbeGetAllVM";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-vjezbe',
  templateUrl: './vjezbe.component.html',
  styleUrls: ['./vjezbe.component.css']
})
export class VjezbeComponent implements OnInit {

  duhovneVjezbePodaci:DuhovneVjezbeGetAllVM[]=[];
  novaVjezba: DuhovneVjezbeGetAllVM;
   date=new Date();
  constructor(private httpKlijent: HttpClient, private router: Router) {
  }
  postaviDatum(s:DuhovneVjezbeGetAllVM){s.isActive = s.datumZavrsetka < this.date ? false : true}

  ngOnInit(): void {

    this.getDuhovneVjezbe();
  }
  getDuhovneVjezbe()
  {
    this.httpKlijent.get<DuhovneVjezbeGetAllVM>(MojConfig.adresa_servera+"/DuhovnaVjezba/GetAll").subscribe((x:any)=>{this.duhovneVjezbePodaci=x});
  }
  getPodaci()
  {
    if(this.duhovneVjezbePodaci==null)
      return [];
    return this.duhovneVjezbePodaci;
  }
  getSlika(s:DuhovneVjezbeGetAllVM)
  {
    return `${MojConfig.adresa_servera}/DuhovnaVjezba/GetSlikaKorisnika/${s.id}`;
  }
  generisi_preview() {
    // @ts-ignore
    var file=document.getElementById("slika-input").files[0];
    if(file)
    {
      var reader=new FileReader();
      let this2=this;
      reader.onload=function ()
      {
        this2.novaVjezba.slika_nova_base64= reader.result.toString();
      }
      reader.readAsDataURL(file);
    }
  }
  BtnDodajVjezbu() {
  this.novaVjezba={
    id:0,
    naslov:"",
    opis:"",
    tekst:"",
    datumPocetka:new Date(),
    datumZavrsetka:new Date(),
    isActive:true,
    moderatorId:1,
    trajanje:2,
    slika_nova_base64:""
  }
  }

  BtnSnimi() {
this.httpKlijent.post(MojConfig.adresa_servera+"/DuhovnaVjezba/Snimi",this.novaVjezba).subscribe((x:any)=>{this.getDuhovneVjezbe()});
this.novaVjezba=null;
  }

  BtnVise(s: any) {
    this.router.navigate(["/vjezba-odabrana",s.id]);
  }

  BtnObrisi(s: any) {
    this.httpKlijent.get(MojConfig.adresa_servera+"/DuhovnaVjezba/Delete1/"+s.id).subscribe((x:any)=>{this.getDuhovneVjezbe()});
  }

  BtnUredi(s: any) {
this.novaVjezba=s;
this.getPodaci();
  }




}
