import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import axios from 'axios';

@Component({
  selector: 'app-prompt-input',
  templateUrl: './prompt-input.component.html',
  styleUrls: ['./prompt-input.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule]
})
export class PromptInputComponent {
  userPrompt: string = '';
  generatedScript: string | null = null;

  constructor(private http: HttpClient) {}

  generateScript() {
    if (this.userPrompt.trim()) {
      const backendUrl = 'http://localhost:3000/generate-sql';

      this.http.post<{ sql: string }>(backendUrl, { prompt: this.userPrompt })
        .subscribe({
          next: (response) => {
            this.generatedScript = response.sql;
          },
          error: (error) => {
            console.error('Error generating SQL script:', error);
            this.generatedScript = 'Failed to generate SQL script. Please try again.';
          }
        });
    }
  }
}