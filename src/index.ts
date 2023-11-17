#!/usr/bin/env node
import figlet from 'figlet';
import * as readline from 'readline';
import create from "./commands/create";
import fs from "fs";
import {gitignore} from "./configs/gitignore";
import util from "util";
import child_process from "child_process";

const exec = util.promisify(child_process.exec);

export const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

console.log(figlet.textSync('Create VEMC App', { width: 80, font: 'Rectangles' }));

console.log('Welcome to the VEMC App generator!');
console.log('This utility will walk you through creating a VEMC app.');
console.log('It only covers the most common items, and tries to guess sensible defaults.');

rl.question('What is the name of your app? ', async (answer) => {
	await create(answer);
	rl.close();
});