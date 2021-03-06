import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ViewDataComponent } from './view-data/view-data.component';
import { VisualizeDataComponent } from './visualize-data/visualize-data.component';
import { AboutComponent } from './about/about.component';
import { HelpComponent } from './help/help.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ContactComponent } from './contact/contact.component';
import { LoadDataComponent } from './load-data/load-data.component';
import { ScatterChartComponent } from './scatter-chart/scatter-chart.component';
import { GridJsAngularModule } from 'gridjs-angular';
import { LineChartComponent } from './line-chart/line-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ViewDataComponent,
    VisualizeDataComponent,
    AboutComponent,
    HelpComponent,
    FooterComponent,
    ContactComponent,
    LoadDataComponent,
    ScatterChartComponent,
    LineChartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    GridJsAngularModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
