import * as vscode from "vscode";
import { loadProfiles, saveProfiles } from "../core/profile";

export async function manageProfiles() {
  let { profiles, pathRules } = loadProfiles();

  const action = await vscode.window.showQuickPick(
    ["➕ Criar novo perfil", "🗑️ Remover perfil", "✏️ Editar perfil"],
    { placeHolder: "O que deseja fazer?" }
  );

  if (!action) {return;}

  if (action === "➕ Criar novo perfil") {
    const key = await vscode.window.showInputBox({ prompt: "Nome do perfil (ex: pessoal, empresa)" });
    if (!key) {return;}
    const name = await vscode.window.showInputBox({ prompt: "Nome (user.name)" });
    if (!name) {return;}
    const email = await vscode.window.showInputBox({ prompt: "E-mail (user.email)" });
    if (!email) {return;}

    profiles[key] = { name, email };
    saveProfiles({ profiles, pathRules });
    vscode.window.showInformationMessage(`🎉 Perfil ${key} criado com sucesso.`);
  }

  if (action === "🗑️ Remover perfil") {
    const key = await vscode.window.showQuickPick(Object.keys(profiles), {
      placeHolder: "Selecione o perfil para remover"
    });
    if (!key) {return;}
    delete profiles[key];
    saveProfiles({ profiles, pathRules });
    vscode.window.showInformationMessage(`🗑️ Perfil ${key} removido com sucesso.`);
  }

  if (action === "✏️ Editar perfil") {
    const key = await vscode.window.showQuickPick(Object.keys(profiles), {
      placeHolder: "Selecione o perfil para editar"
    });
    if (!key) {return;}

    const current = profiles[key];
    const name = await vscode.window.showInputBox({ prompt: "Novo nome", value: current.name });
    const email = await vscode.window.showInputBox({ prompt: "Novo e-mail", value: current.email });
    if (!name || !email) {return;}

    profiles[key] = { name, email };
    saveProfiles({ profiles, pathRules });
    vscode.window.showInformationMessage(`✅ Perfil ${key} atualizado com sucesso.`);
  }
}
