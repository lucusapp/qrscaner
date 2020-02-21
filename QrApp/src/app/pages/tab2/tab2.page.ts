import { Component } from '@angular/core';
import { DataLocalService } from 'src/app/services/data-local.service';
import { Registro } from 'src/app/models/resgistro.model';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(public dataLocal:DataLocalService) {
  }

    
    
    enviarcorreo(){
      console.log("enviando correo ...")
      this.dataLocal.enviarCorreo
      
}
//161.Abrir URL en el navegador por defecto del dispositivo
abrirRegistro(registro:Registro){
  
  console.log("Registro", registro)
  this.dataLocal.abrirRegistro(registro);
}



}


