import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HelpComponent } from './help/help.component';
import { HomeComponent } from './home/home.component';
import { ViewDataComponent } from './view-data/view-data.component';
import { VisualizeDataComponent } from './visualize-data/visualize-data.component';

// Application routing for when/what to open
const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "view-data",
    component: ViewDataComponent
  },
  {
    path: "visualize-data",
    component: VisualizeDataComponent
  },
  {
    path: "about",
    component: AboutComponent
  },
  {
    path: "help",
    component: HelpComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
