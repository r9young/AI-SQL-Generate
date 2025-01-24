import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { PromptInputComponent } from './prompt-input/prompt-input.component';

@NgModule({
  declarations: [
    AppComponent,
    PromptInputComponent
  ],
  imports: [
    BrowserModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
