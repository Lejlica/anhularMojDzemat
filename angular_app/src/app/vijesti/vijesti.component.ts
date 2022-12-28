import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MojConfig} from "../moj-config";
import {Router} from "@angular/router";
import {VijestiVM} from "./VijestiVM";
declare function porukaSuccess(a: string):any;
declare function porukaError(a: string):any;

@Component({
  selector: 'app-vijesti',
  templateUrl: './vijesti.component.html',
  styleUrls: ['./vijesti.component.css']
})
export class VijestiComponent implements OnInit {

  vijestiPodaci:VijestiVM[]=[];
  novaVijest:VijestiVM;
  constructor(private httpKlijent: HttpClient, private router: Router) {
  }

  ngOnInit(): void {
    this.fetchVijesti();
  }

  private fetchVijesti(){
    this.httpKlijent.get<VijestiVM>(MojConfig.adresa_servera+"/Vijest/GetAll").subscribe((x:any)=>{this.vijestiPodaci=x});

  }
  getPodaci()
  {
    if(this.vijestiPodaci==null)
      return [];
    return this.vijestiPodaci;
  }

  getSlika(s: VijestiVM) {
    return `${MojConfig.adresa_servera}/Vijest/GetSlika/${s.id}`;
  }

  BtnProcitajViseOVijest(s:any) {
    this.router.navigate(["/vijest-vijestOdabrana",s.id]);
  }

  BtnDodajVijest() {
    this.novaVijest={
      id:0,
      naslov:"",
      tekst:"",
      datum:"",
      autor:"",
      ImamId:1,
      image_nova_base64:"",
      opis:""
    }
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
        this2.novaVijest.image_nova_base64= reader.result.toString();
      }
      reader.readAsDataURL(file);
    }
  }

  BtnSnimi() :void{
    this.httpKlijent.post(MojConfig.adresa_servera+"/Vijest/Snimi",this.novaVijest).subscribe((x:any)=>
    {this.fetchVijesti()});
    this.novaVijest=null;
  }

  Obrisi(s: any) {
    this.httpKlijent.post(MojConfig.adresa_servera+"/Vijest/Delete/",s.id,MojConfig.http_opcije()).subscribe(x=>{this.fetchVijesti()})
  }

  BtnUredi(s: any) {
    this.novaVijest=s;
  }
}
