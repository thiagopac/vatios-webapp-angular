import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { ActivityDrawerComponent } from './activity-drawer/activity-drawer.component';
import { MessengerDrawerComponent } from './messenger-drawer/messenger-drawer.component';
import { ChatInnerModule } from '../../content/chat-inner/chat-inner.module';

@NgModule({
  declarations: [ActivityDrawerComponent, MessengerDrawerComponent],
  imports: [CommonModule, InlineSVGModule, RouterModule, ChatInnerModule],
  exports: [ActivityDrawerComponent, MessengerDrawerComponent],
})
export class DrawersModule {}
