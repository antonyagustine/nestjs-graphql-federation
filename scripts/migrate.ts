import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const app = getArgValue('--app');
const command = getArgValue('--command', 'run');
let args = process.argv.slice(2);

// Validate app
if (!app) {
  console.error('Please provide an app name using the --app flag.');
  process.exit(1);
}

const appPath = path.join(process.cwd(), 'apps', app);
const dataSourcePath = path.join(process.cwd(), 'dist', 'apps', app, 'data-config', 'data-source.js');

if (!fs.existsSync(appPath)) {
  console.error(`App not found: ${app}`);
  process.exit(1);
}

// Build app
runCommand(`npm run build ${app}`);

console.log(dataSourcePath)

// Validate built data source
if (!fs.existsSync(dataSourcePath)) {
  console.error(`Data source file not found for app: ${app}`);
  process.exit(1);
}

// Patch --name argument
args = args.map(arg => {
  if (arg.startsWith('--name=') || arg.startsWith('-n=')) {
    const nameValue = arg.split('=')[1];
    return path.join(appPath, 'src', 'migrations', nameValue);
  }

  return arg;
});

// Compose remaining args
const extraArgs = args.filter(a => !a.startsWith('--app') && !a.startsWith('--command')).join(' ');

// Run the appropriate migration command
switch (command) {
  case 'create':
    runCommand('npm run typeorm', `migration:create ${extraArgs}`);
    break;
  case 'generate':
    runCommand('npm run typeorm', `-- migration:generate -d ${dataSourcePath} ${extraArgs}`);
    break;
  case 'run':
    runCommand('npm run typeorm', `-- migration:run -d ${dataSourcePath}`);
    break;
  case 'revert':
    runCommand('npm run typeorm', `-- migration:revert -d ${dataSourcePath}`);
    break;
  default:
    console.error('Invalid migration command');
    process.exit(1);
}

// Helpers
function getArgValue(flag: string, defaultValue?: string): string | undefined {
  const arg = process.argv.find(arg => arg.startsWith(`${flag}=`));
  return arg ? arg.split('=')[1] : defaultValue;
}

function runCommand(command: string, args: string = '') {
  try {
    console.log(`Running command: ${command} ${args}`);
    execSync(`${command} ${args}`, { stdio: 'inherit' });
  } catch (error) {}
}
