import * as vscode from 'vscode'
import { alstudio } from './alstudio'

export class OtherExtensions {
    public static async AZALDevToolsApiExample() {
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
        let syntaxTree: any = await api.toolsLangServerClient.getFullSyntaxTree(toolsGetFullSyntaxTreeRequest, true)
        console.log(syntaxTree)
    }
    public static async ALStudioApiExample() {
        let extension: vscode.Extension<any> | undefined = vscode.extensions.getExtension('andrzejzwierzchowski.al-code-outline')
        if (!extension)
            return
        let api: alstudio.IExternalAPIService = extension.exports
        let objects: alstudio.CollectorItemExternal[] = api.getObjects();
        console.log(objects)
    }
}