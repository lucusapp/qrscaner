import { Component } from '@angular/core';
import { DataLocalService } from 'src/app/services/data-local.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(public dataLocal:DataLocalService) {}



  enviarcorreo(){
    console.log("enviando correo ...")
  }

  abrirRegistro(registro){
    console.log("abriendo registro")
  }

}
