import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
import dayGridPlugin from '@fullcalendar/daygrid'; 
import  interactionPlugin from '@fullcalendar/interaction';
import { ChartsModule } from 'ng2-charts';

FullCalendarModule.registerPlugins(
  [
    dayGridPlugin,
    interactionPlugin
  ]
);

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    FullCalendarModule,
    ChartsModule
  ],
  declarations: [
    DashboardComponent,
  ]
})

export class AdminLayoutModule {}
