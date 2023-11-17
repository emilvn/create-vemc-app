#!/usr/bin/env node
import figlet from 'figlet';
import * as readline from 'readline';
import create from "./commands/create";

export const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

console.log(figlet.textSync('Create VEMC App', { width: 80, font: 'Rectangles' }));

console.log('Welcome to the VEMC App generator!');
console.log('This utility will walk you through creating a VEMC app.');
console.log('It only covers the most common items, and tries to guess sensible defaults.');

const answers= {
	name: "vemc-app",
	git: false
};
rl.question('What is the name of your app? ', async (answer1) => {
	answers.name = answer1;
	rl.question("Do you want to initialize a git repository? (y/n) ", async (answer2) => {
		if(answer2 === "y" || answer2 === "yes") {
			answers.git = true;
		}
		await create(answers);
		rl.close();
	});
});

