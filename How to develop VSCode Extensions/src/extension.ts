// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode'; //error because you've no vscode module? run 'npm install'
import { AreopaCodeActionProvider } from './AreopaCodeActionProvider';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "webinar" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('webinar.helloWorld', async () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		let document: vscode.TextDocument = vscode.window.activeTextEditor?.document as vscode.TextDocument;
		let locations: vscode.Location[] | undefined = await vscode.commands.executeCommand('vscode.executeReferenceProvider', document.uri, new vscode.Position(9, 9));
		vscode.window.showInformationMessage('Hello World from webinar!');

	});
	context.subscriptions.push(
		vscode.languages.registerCodeActionsProvider('al', new AreopaCodeActionProvider())
	);

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }
