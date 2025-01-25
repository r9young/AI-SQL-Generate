import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { PromptInputComponent } from './prompt-input/prompt-input.component';

@NgModule({
  declarations: [
    AppComponent,           // Declares the root component
    PromptInputComponent    // Declares the child component
  ],
  imports: [
    BrowserModule,          // Required for Angular apps
    FormsModule,            // Required for template-driven forms
    HttpClientModule        // Required for HTTP requests
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { AppComponent } from './app.component';
// import { PromptInputComponent } from './prompt-input/prompt-input.component';

// @NgModule({
//   declarations: [
//     AppComponent,
//     PromptInputComponent
//   ],
//   imports: [
//     BrowserModule,
//   ],
//   bootstrap: [AppComponent]
// })
// export class AppModule {}