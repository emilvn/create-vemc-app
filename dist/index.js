#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rl = void 0;
const figlet_1 = __importDefault(require("figlet"));
const readline = __importStar(require("readline"));
const create_1 = __importDefault(require("./commands/create"));
exports.rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
console.log(figlet_1.default.textSync('Create VEMC App', { width: 80, font: 'Rectangles' }));
console.log('Welcome to the VEMC App generator! version 1.0.7');
console.log('This utility will walk you through starting a new typescript project.');
const answers = {
    name: "vemc-app",
    git: false
};
exports.rl.question('What is the name of your app? ', (answer1) => __awaiter(void 0, void 0, void 0, function* () {
    answers.name = answer1;
    exports.rl.question("Do you want to initialize a git repository? (y/n) ", (answer2) => __awaiter(void 0, void 0, void 0, function* () {
        if (answer2 === "y" || answer2 === "yes") {
            answers.git = true;
        }
        yield (0, create_1.default)(answers);
        exports.rl.close();
    }));
}));
//# sourceMappingURL=index.js.map