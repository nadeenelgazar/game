import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { IframePageComponent } from './iframe-page/iframe-page.component';
import { IfarmePageSecondComponent } from './ifarme-page-second/ifarme-page-second.component';

const routes: Routes = [
  {
    path:'iframePage',
    component: IframePageComponent
  },
  {
    path:'iframePage2',
    component: IfarmePageSecondComponent
  },
  {
    path:'',
    redirectTo:'mainPage',
    pathMatch:'full'
   
  },{
    path:'mainPage',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
