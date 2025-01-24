import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-prompt-input',
  templateUrl: './prompt-input.component.html',
  styleUrls: './prompt-input.component.css',
  import: [FormsModule, CommonModule]
})
export class PromptInputComponent {
  userPrompt: string = '';

}