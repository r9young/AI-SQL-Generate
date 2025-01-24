Got it! Here's how you can create a new Angular project from scratch using the Angular CLI:

---

### **Step 1: Install Angular CLI**
If you don’t already have Angular CLI installed, you can install it globally via npm:
```bash
npm install -g @angular/cli
```
Check the installation by running:
```bash
ng version
```

---

### **Step 2: Create a New Angular Project**
Use the following command to create a new Angular project:
```bash
ng new your-project-name
```

- **Options during setup**:
  1. **Routing**: If you want Angular to include routing, select `Yes` when prompted.
  2. **CSS Preprocessor**: Choose your preferred style format (CSS, SCSS, SASS, LESS).

---

### **Step 3: Navigate to the Project Directory**
```bash
cd your-project-name
```

---

### **Step 4: Serve the Application**
Start a development server to see the default Angular app in action:
```bash
ng serve
```

- Open a browser and visit: [http://localhost:4200](http://localhost:4200)

---

### **Step 5: Add Features (Optional)**
You can now start building your app by creating components, services, modules, etc. Here are a few commands to get started:
1. **Generate a component**:
   ```bash
   ng generate component component-name
   ```
2. **Generate a service**:
   ```bash
   ng generate service service-name
   ```
3. **Generate a module**:
   ```bash
   ng generate module module-name
   ```

---

Let me know if you'd like help configuring or extending this new Angular app!


---

### **ng new newapp will init git automatically**

**Angular to initialize Git automatically**, if you don't want Angular to initilize Git automatically, you could use the `--skip-git` flag:

### What to Do:
When generating the Angular app, use the `--skip-git` flag:
```bash
ng new front --skip-git
```

### After Creating the Front-End App:
1. The Angular app will be created in the `front` folder without a `.git` directory.
2. You can add the `front` folder to your existing root-level Git repository and commit the changes:
   ```bash
   git add front
   git commit -m "Add front-end Angular app"
   ```

This ensures your project stays clean and organized, with all version control managed from the root. Let me know if you'd like help with anything else!