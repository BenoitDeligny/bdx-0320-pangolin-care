import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CountrypageComponent } from './countrypage/countrypage.component';
import { HomepageComponent } from './homepage/homepage.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SearchComponent } from './search/search.component';
import { AnimalpageComponent } from './animalpage/animalpage.component';
import { WorldMapComponent } from './world-map/world-map.component';
import { ImgFormComponent } from './img-form/img-form.component';
import { YourInterceptor } from './http-interceptors/loading-interceptor';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  declarations: [
    AppComponent,
    CountrypageComponent,
    HomepageComponent,
    FooterComponent,
    NavbarComponent,
    FooterComponent,
    SearchComponent,
    AnimalpageComponent,
    WorldMapComponent,
    ImgFormComponent,
    LoadingComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: YourInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
