import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-prompt-input',
  templateUrl: './prompt-input.component.html',
  styleUrls: ['./prompt-input.component.css'],
  standalone: true,
  // imports: [CommonModule, FormsModule, HttpClientModule]
})

export class PromptInputComponent {
  userPrompt: string = '';
  generatedScript: string | null = null; 
  promptForm: any;

  constructor(private http: HttpClient) {} //?

  generateScript(){
    if (this.userPrompt.trim()) {
    
      // `trim` is used to remove any leading and trailing whitespace from userPrompt. 
      // the this keyword is used to refer to the current instance of the class. 
      // In this context, this.userPrompt refers to the userPrompt property of the current instance of the PromptInputComponent class.
      
      const backendUrl = 'http://localhost:3000/generate-sql';

      this.http.post<{ sql:string }>(backendUrl, { prompt: this.userPrompt})
        .subscribe ({
          next: (response) => {
            this.generatedScript = response.sql
          }, 
          error: (error) =>{
            console.log('Error genrating SQL script', error);
            this.generatedScript = 'Failed to generate SQL script. Please try again!'
          }
        })
    }
  }

}
