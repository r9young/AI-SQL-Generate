import { Component } from '@angular/core';
import { PromptInputComponent } from './prompt-input/prompt-input.component';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [PromptInputComponent],
})
export class AppComponent {}


// import { Component } from '@angular/core';
// // import { RouterOutlet } from '@angular/router';
// import { PromptInputComponent } from './prompt-input/prompt-input.component';

// @Component({
//   selector: 'app-root',
//   // imports: [RouterOutlet],
//   templateUrl: './app.component.html',
//   styleUrl: './app.component.css',
//   imports: [PromptInputComponent],
// })
// export class AppComponent {
//   title = 'SQL_Script_Gen';
// }