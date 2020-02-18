import { Injectable } from '@angular/core';
import { Registro } from '../models/resgistro.model';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  guardados: Registro []=[]


  constructor(private storage: Storage) {
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
  }
}
