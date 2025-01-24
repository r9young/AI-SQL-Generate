# SQLScriptGen

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.1.2.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


---


## Why do I directly call the generateScript() method in the HTML file instead of using PromptInputComponent.generateScript()?

In Angular templates, you're working with the instance of the component that Angular creates for you. This instance is automatically tied to the component's template.

For example:
- In the HTML, when you call `generateScript()`, Angular invokes this method on the **instance** of the `PromptInputComponent` that is managing that part of the DOM.
- Similarly, when you bind to a property like `userPrompt` (`[(ngModel)]="userPrompt"`), it is referring to the `userPrompt` property on the same instance.

The class itself (`PromptInputComponent`) defines the blueprint, but Angular creates an instance of it to handle each usage of the component. The template is always bound to this instance, which is why you don't need to explicitly refer to the class name or manage the instance manually.