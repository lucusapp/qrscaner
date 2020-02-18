import { Injectable } from '@angular/core';
import { Registro } from '../models/resgistro.model';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  guardados: Registro []=[]


  constructor(private storage: Storage,
              private navCtrl:NavController,
              private inAppBrowser:InAppBrowser) {
    //160 GUARDAR INFORMACION DE LOS REGISTROS DEL STORAGE
    // this.storage.get('registros')
    //     .then(registros=>{
    //       this.guardados=registros||[];
    //     });
    this.cargarStorage()
  }

    async cargarStorage(){
      this.guardados = await this.storage.get('resgistros') || []

   }

  async guardarRegistro(format:string, text:string){

    await this.cargarStorage()
    const nuevoRegistro = new Registro (format,text);
    this.guardados.unshift(nuevoRegistro);

    console.log(this.guardados)
    this.storage.set('registros', this.guardados);
      //161. ABRIR URL EN EL NAVEGADOR POR DEFECTO
      //OPCION 1 this.navCtrl.navigateForward('/tabs/tab2')
    this.abrirRegistro(nuevoRegistro)
  }

  //161. ABRIR URL EN EL NAVEGADOR POR DEFECTO
  abrirRegistro (registro:Registro){

    this.navCtrl.navigateForward('/tabs/tab2');
    switch(registro.type){
      case 'http':
        //abrir el navegador web 
        this.inAppBrowser.create(registro.text, '_system');
      break;

    }

  }
}
