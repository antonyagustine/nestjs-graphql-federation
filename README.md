### 🚀 Application Startup Guide

Follow these steps to start the full system in a local development environment:

---

#### ✅ Step 1: Start Required Services

Spin up the PostgreSQL and other required services via Docker Compose:

```bash
docker-compose up -d
```

---

#### 🔄 Step 2: Apply Migrations

Run database migrations for each microservice:

```bash
npm run migration -- --app=user --command=run
npm run migration -- --app=todo --command=run
```

---

#### ⚙️ Step 3: Start Applications

Start all required applications:

```bash
npm run start api-gateway
npm run start user
npm run start todo
```

> 💡 You can run these in parallel in separate terminal tabs for development.

---


### 📦 Migration Command Usage for NestJS Monorepo

This project supports centralized migration commands for each app in the monorepo via a custom script: `npm run migration`.

> ✅ **Note**: The `--app` flag is required to target a specific app, and `--command` controls the migration action.

---

### 🔧 Supported Commands

#### 1. **Create a new migration file**

```bash
npm run migration -- --app=todo --command=create --name=init-schema
```

- **Creates** a new empty migration file.
- The name will automatically resolve to:  
  `apps/todo/src/migrations/init-schema`
- Make sure `apps/todo/data-config/data-source.ts` exists and is configured properly.

---

#### 2. **Generate a migration from schema changes**

```bash
npm run migration -- --app=todo --command=generate --name=init-schema
```

- **Scans entities** and generates a migration file with schema diffs.
- Output path: `apps/todo/src/migrations/init-schema`

---

#### 3. **Run pending migrations**

```bash
npm run migration -- --app=todo --command=run
```

- Executes all **pending migrations** in the specified app's DB.

---

#### 4. **Revert the last migration**

```bash
npm run migration -- --app=todo --command=revert
```

- **Rolls back** the most recent migration executed for the app.

---

Here's the updated documentation section with your requested addition:

---

### 🛠️ Requirements

- Each app must have:
  - A valid `data-source.ts` in `apps/<app>/data-config/`
  - Migration files inside `apps/<app>/src/migrations/`
- The script will:
  - Build only the specified app (`npm run build <app>`)
  - Reference the built `data-source.js` file from `dist/apps/<app>/data-config/data-source.js`

> 🔔 **Note**: Each app is a separate microservice and is deployed on a different port.
