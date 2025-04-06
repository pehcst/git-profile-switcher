import * as vscode from "vscode";
import { readGitUser, updateGitConfig } from "./core/git";
import { switchProfile } from "./ui/switchProfile";
import { manageProfiles } from "./ui/manageProfiles";
import { loadProfiles } from "./core/profile";
import { saveLastUsedProfile, getLastUsedProfile } from "./core/history";

export function activate(context: vscode.ExtensionContext) {
  const repo = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
  const statusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left,
    100
  );
  const { profiles, pathRules } = loadProfiles();

  const autoSwitchProfileFromPath = () => {
    if (!repo) {
      return null;
    }

    const match = Object.entries(pathRules).find(([pathPrefix]) =>
      repo.startsWith(pathPrefix)
    );

    if (!match) {
      return null;
    }

    const profileKey = match[1];
    const profile = profiles[profileKey];

    if (profile) {
      updateGitConfig(profile, repo);
      vscode.window.showInformationMessage(
        `🧠 Perfil "${profileKey}" aplicado automaticamente com base no diretório.`
      );
      return profileKey;
    }

    return null;
  };

  statusBarItem.command = "git-profile-switcher.switchProfile";
  context.subscriptions.push(statusBarItem);

  const updateStatusBar = () => {
    const { profiles } = loadProfiles();
    const user = repo ? readGitUser(repo) : null;
    const profileName = user
      ? Object.entries(profiles).find(
          ([, p]) => p.email?.toLowerCase() === user.email?.toLowerCase()
        )?.[0] ?? "desconhecido"
      : "";

    statusBarItem.text = user
      ? `$(git-branch) Git: ${user.name} (${profileName})`
      : `$(git-branch) Git: (não definido)`;

    statusBarItem.tooltip = "Clique para trocar o perfil Git";
    statusBarItem.show();
  };

  if (repo) {
    const lastUsed = getLastUsedProfile(context, repo);
    if (lastUsed && profiles[lastUsed]) {
      updateGitConfig(profiles[lastUsed], repo);
      vscode.window.showInformationMessage(
        `🔁 Perfil "${lastUsed}" reaplicado automaticamente (último usado neste projeto).`
      );
    } else {
      autoSwitchProfileFromPath();
    }
  }

  updateStatusBar();

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "git-profile-switcher.switchProfile",
      () => {
        if (!repo) {
          return vscode.window.showErrorMessage("Nenhum projeto aberto.");
        }
        return switchProfile(context, repo, updateStatusBar);
      }
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "git-profile-switcher.manageProfiles",
      () => {
        return manageProfiles();
      }
    )
  );
}

export function deactivate() {}
