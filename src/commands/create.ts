import * as fs from 'fs';
import * as path from 'path';
import * as util from 'util';
import * as child_process from 'child_process';
import * as rimraf from 'rimraf';
import {tsconfig} from "../configs/tsconfig";
import {gitignore} from "../configs/gitignore";
import {rl} from "../index";

const exec = util.promisify(child_process.exec);

export default async function create(name: string) {
	const dir = path.join(process.cwd(), name);
	if (fs.existsSync(dir)) {
		console.log(`The directory ${name} already exists.`);
		process.exit(1);
	}
	fs.mkdirSync(dir);

	console.log(`Creating a new VEMC app in ${dir}...`);
	process.chdir(dir);

	console.log('Installing dependencies...');
	await exec('npm init -y');
	await exec('npm install --save-dev typescript');
	await exec('npm install --save-dev nodemon');
	await exec('npm install --save-dev @types/node');

	console.log("Adding compiler options to tsconfig.json...");
	fs.writeFileSync('tsconfig.json', JSON.stringify(tsconfig, null, 2));

	console.log('Adding scripts to package.json...');
	const packageJson = JSON.parse(fs.readFileSync("package.json", 'utf8'));
	packageJson.scripts = {
		start: "node dist/index.js",
		build: "npx tsc",
		dev: "nodemon index.ts"
	};
	fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));

	console.log('Creating inital files...');
	await exec("mkdir src");
	fs.writeFileSync('src/index.ts', 'console.log("Hello, world!");');

	console.log("Setting up git...");
	await exec('git init');
	fs.writeFileSync(".gitignore", gitignore);
	await exec('git add .');
	await exec('git commit -m "Initial commit"');
	await exec('git branch -M main');

	console.log("Running npm install...");
	await exec('npm install');

	console.log('Done!');
	console.log(`Your VEMC app is ready at ${dir}.`);
	console.log('To get started, run:');
	console.log(`  cd ${name}`);
	console.log('  npm start');
	rimraf.sync(path.join(dir, 'node_modules'));
	rl.close();
}