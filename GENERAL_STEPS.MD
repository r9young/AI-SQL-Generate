You are asking me to create a simple Angular application that allows users to input a prompt (such as a request for a SQL script), sends that prompt to the OpenAI API, and returns the generated SQL script to display on the frontend. Below is an example of how to implement this using a Node.js/Express backend and an Angular frontend.

---

## Overview of the Steps

1. **Set Up the Backend**  
   - Use Node.js with Express to create a simple API endpoint.  
   - Integrate the OpenAI Node.js library to communicate with the OpenAI API.  
   - Expose an endpoint (e.g., `/generate-sql`) for generating SQL scripts.

2. **Set Up the Angular Frontend**  
   - Create an Angular service that calls the backend endpoint (`/generate-sql`).  
   - Create a component with a text area/input for the user prompt and a button to send the request.  
   - Display the response (the generated SQL) in the component view.

3. **Run and Test**  
   - Start the Node.js server.  
   - Run the Angular application.  
   - Test by entering a prompt in the Angular app.  
   - Verify that you receive a generated SQL script from OpenAI.

---

## 1. Backend (Node.js + Express)

### 1.1. Initialize the Project

```bash
mkdir openai-sql-app
cd openai-sql-app
npm init -y
npm install express cors dotenv openai
```

- **express**: Node.js framework for building the server.
- **cors**: Enable cross-origin resource sharing between the Angular app and the backend.
- **dotenv**: Load environment variables from a `.env` file.
- **openai**: Official OpenAI Node.js library.

### 1.2. Create a `.env` File

In the root of your project, create a file named `.env` to store your OpenAI API key:

```
OPENAI_API_KEY=YOUR_OPENAI_API_KEY_HERE
```

> **Note**: Never commit the `.env` file to version control in a production environment.

### 1.3. Create `server.js`

Create a `server.js` file in the root folder:

```js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
app.use(cors());
app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post('/generate-sql', async (req, res) => {
  try {
    const { prompt } = req.body;

    // Call OpenAI with the prompt
    const response = await openai.createCompletion({
      model: 'text-davinci-003', 
      prompt: `Write a SQL script for the following request:\n\n${prompt}`,
      max_tokens: 200,
      temperature: 0.7,
    });

    // Extract the generated text (SQL script) from the response
    const generatedSQL = response.data.choices[0].text.trim();

    res.status(200).json({ sql: generatedSQL });
  } catch (error) {
    console.error('Error generating SQL:', error);
    res.status(500).json({ error: 'Failed to generate SQL' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

#### Explanation
- `express.json()` is used to parse JSON bodies in the request.
- We receive the `prompt` from the request body.
- We use the OpenAI `createCompletion` method to get the generated SQL.  
  - **model**: `text-davinci-003` is a good general-purpose model for text generation.  
  - **prompt**: We prepend the user’s request with a short instruction (`Write a SQL script for the following request:`).  
  - **max_tokens**: Limits the length of the generated output.  
  - **temperature**: Controls randomness; `0.7` is a moderate choice.  
- We send back the generated SQL in our response as `sql`.

---

## 2. Frontend (Angular)

### 2.1. Create an Angular Application

If you don’t have the Angular CLI installed globally:

```bash
npm install -g @angular/cli
```

Create a new Angular project:

```bash
ng new openai-sql-frontend
cd openai-sql-frontend
```

### 2.2. Install Dependencies

Inside the Angular project folder:

```bash
npm install --save axios
```

You can use the `HttpClient` from Angular itself or `axios`. Here, we’ll use `HttpClient` from Angular to keep it consistent.

### 2.3. Enable HttpClientModule

Open `src/app/app.module.ts` and ensure `HttpClientModule` is imported:

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Here we also import `FormsModule` to use two-way binding (`[(ngModel)]`) for the input form.

### 2.4. Create a Service to Call the Backend

Generate a service named `openai-sql.service.ts`:

```bash
ng g service openai-sql
```

In the generated `openai-sql.service.ts`:

```ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenaiSqlService {

  private apiUrl = 'http://localhost:3000/generate-sql';

  constructor(private http: HttpClient) { }

  generateSQL(prompt: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { prompt });
  }
}
```

#### Explanation
- `generateSQL(prompt: string)`: Sends a POST request with the user’s `prompt`.  
- Returns an `Observable` that we can subscribe to in our component.

### 2.5. Create a Component for the Prompt

Use the default `AppComponent` or generate a new component. For simplicity, we’ll use `AppComponent`.

#### `app.component.ts`

```ts
import { Component } from '@angular/core';
import { OpenaiSqlService } from './openai-sql.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  prompt: string = '';
  generatedSQL: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private openaiSqlService: OpenaiSqlService) {}

  onGenerateSQL() {
    this.isLoading = true;
    this.errorMessage = '';
    this.generatedSQL = '';

    this.openaiSqlService.generateSQL(this.prompt).subscribe({
      next: (response) => {
        this.generatedSQL = response.sql;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Error generating SQL.';
        console.error(error);
        this.isLoading = false;
      }
    });
  }
}
```

#### `app.component.html`

```html
<div class="container" style="margin-top: 50px;">
  <h1>OpenAI SQL Generator</h1>

  <div class="form-group">
    <label for="prompt">Enter Your Prompt:</label>
    <textarea
      id="prompt"
      rows="5"
      class="form-control"
      [(ngModel)]="prompt"
      placeholder="Describe the SQL you want to generate..."
    ></textarea>
  </div>
  
  <button
    class="btn btn-primary"
    (click)="onGenerateSQL()"
    [disabled]="isLoading"
    style="margin-top: 10px;"
  >
    {{ isLoading ? 'Generating...' : 'Generate SQL' }}
  </button>

  <div *ngIf="errorMessage" class="alert alert-danger" style="margin-top: 15px;">
    {{ errorMessage }}
  </div>

  <div class="card" style="margin-top: 15px;" *ngIf="generatedSQL">
    <div class="card-body">
      <h5 class="card-title">Generated SQL:</h5>
      <pre>{{ generatedSQL }}</pre>
    </div>
  </div>
</div>
```

> You may also want to use some styling framework (e.g., Bootstrap) to style your form and button, but that is optional.

---

## 3. Run the Application

1. **Start the Backend Server**  
   In the backend folder (where `server.js` is located):
   ```bash
   node server.js
   ```
   The server will run on `http://localhost:3000`.

2. **Start the Angular Frontend**  
   In the Angular project folder:
   ```bash
   ng serve --open
   ```
   This starts the Angular app on `http://localhost:4200`.  
   The `--open` flag will automatically open a browser tab.

3. **Test the Flow**  
   - In the browser, go to `http://localhost:4200`.  
   - Enter a prompt like:  
     ```
     Create a table named employees with columns id, name, and position.
     ```  
   - Click **Generate SQL**.  
   - Within a few seconds, you should see the generated SQL script in the result area.

---

## Summary

- **Backend**: A Node.js server using Express that exposes a `/generate-sql` endpoint. It uses the OpenAI API to generate SQL based on user prompts.  
- **Frontend**: An Angular application with a service (`OpenaiSqlService`) to call the backend. A component (`AppComponent`) collects user input, calls the service, and displays the generated SQL script.  

With these steps, you have a functional skeleton of how to integrate Angular, a Node.js backend, and the OpenAI API to generate SQL scripts from user prompts. You can customize the prompt instructions, parameters (like `model`, `temperature`, or `max_tokens`), and the UI as needed for your use case.