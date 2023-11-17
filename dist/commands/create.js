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
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const util = __importStar(require("util"));
const child_process = __importStar(require("child_process"));
const rimraf = __importStar(require("rimraf"));
const tsconfig_1 = require("../configs/tsconfig");
const gitignore_1 = require("../configs/gitignore");
const index_1 = require("../index");
const exec = util.promisify(child_process.exec);
function create(answers) {
    return __awaiter(this, void 0, void 0, function* () {
        const dir = path.join(process.cwd(), answers.name);
        if (fs.existsSync(dir)) {
            console.log(`The directory ${answers.name} already exists.`);
            process.exit(1);
        }
        fs.mkdirSync(dir);
        console.log(`Creating a new VEMC app in ${dir}...`);
        process.chdir(dir);
        console.log('Installing dependencies...');
        yield exec('npm init -y');
        yield exec('npm install --save-dev typescript');
        yield exec('npm install --save-dev nodemon');
        yield exec('npm install --save-dev @types/node');
        console.log("Adding compiler options to tsconfig.json...");
        fs.writeFileSync('tsconfig.json', JSON.stringify(tsconfig_1.tsconfig, null, 2));
        console.log('Adding scripts to package.json...');
        const packageJson = JSON.parse(fs.readFileSync("package.json", 'utf8'));
        packageJson.scripts = {
            start: "node dist/index.js",
            build: "npx tsc",
            dev: "nodemon index.ts"
        };
        fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
        console.log('Creating inital files...');
        yield exec("mkdir src");
        fs.writeFileSync('src/index.ts', 'console.log("Hello, world!");');
        if (answers.git) {
            console.log("Setting up git...");
            yield exec('git init');
            fs.writeFileSync(".gitignore", gitignore_1.gitignore);
            yield exec('git add .');
            yield exec('git commit -m "Initial commit"');
            yield exec('git branch -M main');
        }
        console.log('Done!');
        console.log(`Your VEMC app is ready at ${dir}.`);
        console.log('To get started, run:');
        console.log(`  cd ${answers.name}`);
        console.log('  npm install');
        console.log('  npm run dev');
        rimraf.sync(path.join(dir, 'node_modules'));
        index_1.rl.close();
    });
}
exports.default = create;
//# sourceMappingURL=create.js.map