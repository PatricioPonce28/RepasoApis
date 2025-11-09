import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OutboxPageRoutingModule } from './outbox-routing.module';

import { OutboxPage } from './outbox.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    OutboxPageRoutingModule
  ],
  declarations: [OutboxPage]
})
export class OutboxPageModule {}
