import { Injectable } from '@angular/core';
import { Registro } from '../models/resgistro.model';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { File } from '@ionic-native/file/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';



@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  guardados: Registro []=[]


  constructor(private storage: Storage,
              private navCtrl:NavController,
              private inAppBrowser:InAppBrowser,
              private file:File,
              private emailcomponser:EmailComposer) {
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
      case 'geo':
        //abrir el navegador web 
        this.navCtrl.navigateForward(`/tabs/tab2/mapa/${registro.text}`);      break;

    }

  }

  enviarCorreo(){
    const arrTemp = []
    const titulos = "Tipo,Formato,Creado en,Texto\n";

    arrTemp.push(titulos);
    this.guardados.forEach(registro =>{
    
      const linea = `${registro.type}, ${registro.format},
      ${registro.created},${registro.text.replace(',',' ')}\n`
    
    arrTemp.push(linea)
  
  })
console.log(arrTemp.join(''))
this.crearArchivoFisico(arrTemp.join(''))

  }
crearArchivoFisico(text:string){
  this.file.checkFile(this.file.dataDirectory, 'registros.csv')
      .then (existe=>{
        return this.escribirEnArchivo(text)
      })
      .catch(err=>{
        return this.file.createFile(this.file.dataDirectory, 'registros.csv', false )
                    .then (creado=> this.escribirEnArchivo(text))
                    .catch(err2=> console.log('no se puedo crerar',err))
      }) ;
}

async escribirEnArchivo(text:string){
  await this.file.writeExistingFile(this.file.dataDirectory,'registros.csv',text);


  const archivo = `${this.file.dataDirectory}/registros.csv`;
  console.log(this.file.dataDirectory + 'registros.csv')
  const email = {
    to: 'lucusapp@gmail.com',
    // cc: 'erika@mustermann.de',
    // bcc: ['john@doe.com', 'jane@doe.com'],
    attachments: [
      archivo
    ],
    subject: 'Backup de scans',
    body: 'Aqui tienen sus backups de los scans - <strong>ScanApp</strong>',
    isHtml: true
  };
  this.emailcomponser.open(email);
}
  
}
