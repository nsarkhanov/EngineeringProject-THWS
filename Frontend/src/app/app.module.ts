import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { routing } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule} from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { SkillMatrixComponent } from './skill-matrix/skill-matrix.component';
import { AssemblyActionComponent } from './assembly-action/assembly-action.component';
import { CriteriaCatalogueComponent } from './criteria-catalogue/criteria-catalogue.component';
import { CapabiltiyLevelComponent } from './capability-level/capability-level.component';
import { CyclicTimeComponent } from './cyclic-time/cyclic-time.component';
import { HomeComponent } from './home/home.component';
import { PriorityMatrixComponent } from './priority-matrix/priority-matrix.component';
import { HttpClientModule} from '@angular/common/http';
import { Assembly_order } from './x_models/assembly_order.model';
import { AssemblySequencesComponent } from './assembly-sequences/assembly-sequences.component';
import {MatSelect, MatSelectModule} from '@angular/material/select'; 
import { Skill_matrix_human } from './x_models/skill_matrix_human';
import { Skill_matrix_robot } from './x_models/skill_matrix_robot';
import { MTM_Human } from './cyclic-time/MTM';
import { Criteria_Catalogue } from './x_models/criteria_catalogue';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SchedulerComponent } from './scheduler/scheduler.component';
import { ASP } from './x_models/asp.model';
import { VitalTrackerComponent } from './vital-tracker/vital-tracker/vital-tracker.component';
import { HeaderComponent } from './vital-tracker/header/header.component';
import { ButtonComponent } from './vital-tracker/vital_button/vital_button.component';
import { AboutComponent } from './vital-tracker/about/about.component';
import { FooterComponent } from './vital-tracker/footer/footer.component';
import { LiveChartComponent } from './vital-tracker/live-chart/live-chart.component';
import { IconsComponent } from './vital-tracker/icons/icons.component';
import { HistoricalChartComponent } from './vital-tracker/historical-chart/historical-chart.component';
import { CanvasJSChart } from 'src/assets/canvasjs.angular.component';
import { DateTimePickerButtonComponent } from './vital-tracker/date-time-picker-button/date-time-picker-button.component';
import { DateTimePickerDialogComponent } from './vital-tracker/date-time-picker-dialog/date-time-picker-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker'; 
import { MatDatetimepickerModule, MatNativeDatetimeModule } from '@mat-datetimepicker/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ImuDropdownComponent } from './vital-tracker/imu-dropdown/imu-dropdown.component';
import { MuseDropdownComponent } from './vital-tracker/muse-dropdown/muse-dropdown.component';

@NgModule({
  declarations: [
    AppComponent,
    SkillMatrixComponent,
    AssemblyActionComponent,
    CriteriaCatalogueComponent,
    HomeComponent,
    CapabiltiyLevelComponent,
    CyclicTimeComponent,
    PriorityMatrixComponent,
    AssemblySequencesComponent,
    SchedulerComponent,
    HeaderComponent,
    ButtonComponent,
    AboutComponent,
    FooterComponent,
    CanvasJSChart,
    LiveChartComponent,
    IconsComponent,
    HistoricalChartComponent,
    VitalTrackerComponent,
    DateTimePickerButtonComponent,
    DateTimePickerDialogComponent,
    ImuDropdownComponent,
    MuseDropdownComponent
  ],
  imports: [
    BrowserModule,
    routing,
    BrowserAnimationsModule,
    FormsModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatListModule,
    HttpClientModule,
    MatSelectModule,
    MatMenuModule,
    MatTableModule,
    MatToolbarModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule, 
    MatDialogModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatDatetimepickerModule,
    MatNativeDatetimeModule,        // <----- this module will be deprecated in the future version.
    MatFormFieldModule,
    MatInputModule,
    // FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule, 
    
  ],
  providers: [Assembly_order, Skill_matrix_human, Skill_matrix_robot, Criteria_Catalogue, MTM_Human, ASP, MatDatetimepickerModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
