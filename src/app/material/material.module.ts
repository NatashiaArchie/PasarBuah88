import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule, MatNativeDateModule, MatInputModule } from '@angular/material';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatGridListModule,
    MatDividerModule,
  ],

  exports: [
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatGridListModule,
    MatDividerModule,
    MatTooltipModule,
    MatDialogModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule
  ]
})
export class MaterialModule { }
