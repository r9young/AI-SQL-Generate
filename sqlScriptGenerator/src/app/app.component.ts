import { Component } from '@angular/core';
import { PromptInputComponent } from './prompt-input/prompt-input.component';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [PromptInputComponent],
})
export class AppComponent {}