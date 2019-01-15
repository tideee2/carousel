import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AngularCarouselTideeModule} from '../../projects/angular-carousel-tidee/src/lib/angular-carousel-tidee.module';
import {AngularFontAwesomeModule} from 'angular-font-awesome';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AngularFontAwesomeModule,
    BrowserModule,
    AngularCarouselTideeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
