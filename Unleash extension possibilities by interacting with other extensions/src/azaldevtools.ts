import * as vscode from 'vscode'

export class AZALDevTools {
    public static async ApiExample() {
        let extension: vscode.Extension<any> | undefined = vscode.extensions.getExtension('andrzejzwierzchowski.al-code-outline')
        if (!extension)
            return

        //The API is of type "DevToolsExtensionContext" as thats the one returned in his activate function of the extension.ts file
        //Thats the reason why it has toolsLangServerClient and so on (look in his repository for these information)
        let api: any = extension?.exports
        let document: vscode.TextDocument = vscode.window.activeTextEditor!.document
        let toolsGetFullSyntaxTreeRequest: { source: string, path: string } = {
            source: document.getText(),
            path: document.uri.fsPath
        }
        let objects: any = await api.toolsLangServerClient.getFullSyntaxTree(toolsGetFullSyntaxTreeRequest, true)
        console.log(objects)
    }
}