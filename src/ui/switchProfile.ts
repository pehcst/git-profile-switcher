import * as vscode from "vscode";
import { updateGitConfig, readGitUser } from "../core/git";
import { loadProfiles } from "../core/profile";
import { saveLastUsedProfile } from "../core/history";

export async function switchProfile(
  context: vscode.ExtensionContext,
  repo: string,
  updateStatusBar: () => void
) {
  const { profiles } = loadProfiles();
  const currentEmail = readGitUser(repo)?.email;

  const items = Object.entries(profiles).map(([key, profile]) => {
    const isCurrent =
      profile.email?.toLowerCase() === currentEmail?.toLowerCase();

    return {
      label: `${isCurrent ? "⭐ " : ""}${profile.name} (${key})`,
      description:
        typeof profile.email === "string" ? profile.email : undefined,
      profileKey: key,
    };
  });

  const selected = await vscode.window.showQuickPick(items, {
    placeHolder: "Escolha o perfil Git para aplicar",
  });

  if (!selected) {
    return;
  }

  updateGitConfig(profiles[selected.profileKey], repo);
  saveLastUsedProfile(context, repo, selected.profileKey);
  updateStatusBar();
  vscode.window.showInformationMessage(`✅ Perfil atualizado com sucesso.`);
}
