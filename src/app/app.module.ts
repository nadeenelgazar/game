import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NgxChessBoardModule } from "ngx-chess-board";
import { IframePageComponent } from './iframe-page/iframe-page.component';
import { IfarmePageSecondComponent } from './ifarme-page-second/ifarme-page-second.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    IframePageComponent,
    IfarmePageSecondComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxChessBoardModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
