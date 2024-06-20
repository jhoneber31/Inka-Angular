import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule,routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card'; 

import {MatFormFieldModule} from '@angular/material/form-field';
import {JsonPipe} from '@angular/common';

import { ProductoService } from './service/producto.service';
import { NavbarComponent } from './component/navbar/navbar.component';
import { WarehouseComponent } from './component/warehouse/warehouse.component';
import { ModalComponent } from './component/modal/modal.component';
import { ProductLayoutComponent } from './component/product-layout/product-layout.component';
import { ChooseActionComponent } from './component/choose-action/choose-action.component';
import { MovementTypeComponent } from './component/movement-type/movement-type.component';
import { HistoryComponent } from './component/history/history.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { LoaderComponent } from './component/loader/loader.component';
import { SearchPageComponent } from './component/search-page/search-page.component';
import { HistoryInformationComponent } from './component/history-information/history-information.component';

@NgModule({
  declarations: [
    AppComponent,routingComponents, NavbarComponent, WarehouseComponent, ModalComponent, ProductLayoutComponent, ChooseActionComponent, MovementTypeComponent, HistoryComponent, SidebarComponent, LoaderComponent, SearchPageComponent, HistoryInformationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatFormFieldModule,
    JsonPipe
  ],
  providers: [ProductoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
