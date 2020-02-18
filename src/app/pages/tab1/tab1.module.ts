import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
<<<<<<< HEAD:QrApp/src/app/pages/tab1/tab1.module.ts
=======

>>>>>>> 48d015327c4b3ecff5153f85fd6d45dcc7559490:src/app/pages/tab1/tab1.module.ts

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
<<<<<<< HEAD:QrApp/src/app/pages/tab1/tab1.module.ts

=======
>>>>>>> 48d015327c4b3ecff5153f85fd6d45dcc7559490:src/app/pages/tab1/tab1.module.ts
    RouterModule.forChild([{ path: '', component: Tab1Page }])
  ],
  declarations: [Tab1Page]
})
export class Tab1PageModule {}
