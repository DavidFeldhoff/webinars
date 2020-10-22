import * as vscode from 'vscode'; //error because you've no vscode module? run 'npm install'

export class AreopaCodeActionProvider implements vscode.CodeActionProvider {
    provideCodeActions(document: vscode.TextDocument, range: vscode.Range | vscode.Selection, context: vscode.CodeActionContext, token: vscode.CancellationToken): vscode.CodeAction[] {
        vscode.window.showInformationMessage('I was triggered!');
        let selectedText: string = document.getText(range);
        if (selectedText.startsWith('\'') && selectedText.endsWith('\'')) {
            let codeAction: vscode.CodeAction = new vscode.CodeAction('Extract label', vscode.CodeActionKind.RefactorExtract);
            let edit: vscode.WorkspaceEdit = new vscode.WorkspaceEdit();
            edit.replace(document.uri, range, 'myLabel');
            for (let i = 0; i < document.lineCount; i++) {
                if (document.lineAt(i).text.trim().toLowerCase() == 'var') {
                    edit.insert(document.uri, new vscode.Position(i, document.lineAt(i).text.length), '\r\n        myLabel: Label ' + selectedText + ';');
                }
            }
            codeAction.edit = edit;
            return [codeAction];
        }
        return [];
    }

}