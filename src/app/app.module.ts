import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ThemeSwitchComponent } from './theme-switch/theme-switch.component';
import { HeaderTopComponent } from './header-top/header-top.component';
import { FooterBottomComponent } from './footer-bottom/footer-bottom.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { WaveDividerComponent } from './wave-divider/wave-divider.component';
import { MatchPairComponent } from './match-pair/match-pair.component';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,

    MatchPairComponent,

    ThemeSwitchComponent,
    HeaderTopComponent,
    FooterBottomComponent,
    MenuBarComponent,
    WaveDividerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
