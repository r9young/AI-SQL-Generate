
## Debug

```bash
xianjunyang@xianjuns-MacBook-Pro SQL_Script_Gen % ng build         
Application bundle generation failed. [7.098 seconds]

✘ [ERROR] NG8001: 'app-prompt-input' is not a known element:
1. If 'app-prompt-input' is an Angular component, then verify that it is included in the '@Component.imports' of this component.
2. If 'app-prompt-input' is a Web Component then add 'CUSTOM_ELEMENTS_SCHEMA' to the '@Component.schemas' of this component to suppress this message. [plugin angular-compiler]

    src/app/app.component.html:0:0:
      0 │ 
        ╵ ^

  Error occurs in the template of component AppComponent.

    src/app/app.component.ts:7:15:
      7 │   templateUrl: './app.component.html',
        ╵                ~~~~~~~~~~~~~~~~~~~~~~
```

## Analysis Problem: 

You are asking for help debugging errors and warnings in your Angular project during the `ng build` process. Here’s how to address these issues:

---


### **Unknown Element Error**
   - **Error Message:**
     ```
     NG8001: 'app-prompt-input' is not a known element
     ```
   - **Cause:** The `app-prompt-input` component is not properly recognized by Angular. This could be due to:
     - The component is not declared or imported in the module containing the `@Component` where it’s used.
     - Missing `CUSTOM_ELEMENTS_SCHEMA` for a custom Web Component.

   - **Solution:**
     1. **If `app-prompt-input` is an Angular Component:**
        - Make sure it is declared or imported in the appropriate module.
          - If it's part of another module:
            ```ts
            @NgModule({
              declarations: [AppPromptInputComponent],
              exports: [AppPromptInputComponent]
            })
            export class AppPromptInputModule {}
            ```
            Then import this module where `app-prompt-input` is used:
            ```ts
            import { AppPromptInputModule } from './path-to-app-prompt-input.module';

            @NgModule({
              imports: [AppPromptInputModule],
            })
            export class YourModule {}
            ```

     2. **If `app-prompt-input` is a Web Component:**
        - Add `CUSTOM_ELEMENTS_SCHEMA` to the `@NgModule.schemas`:
          ```ts
          import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

          @NgModule({
            declarations: [...],
            imports: [...],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
          })
          export class YourModule {}
          ```

     3. **If the component name is incorrect:**
        - Verify the selector in the `app-prompt-input` component:
          ```ts
          @Component({
            selector: 'app-prompt-input',
          })
          export class AppPromptInputComponent {}
          ```

---

### 4. **Rebuild and Test**
   After addressing these issues, clear the Angular cache and rebuild your application:
   ```bash
   ng cache clear
   ng build
   ```

   Test the application to ensure the changes resolved the warnings and errors.

Let me know if you encounter further issues!