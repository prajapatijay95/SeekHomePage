import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { SearchResultsComponent } from '../search-results/search-results.component';
import { AfterIfModule } from '../directives/after-if.directive';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    AfterIfModule,
  ],
  declarations: [HomePage, SearchResultsComponent],
})
export class HomePageModule {}
