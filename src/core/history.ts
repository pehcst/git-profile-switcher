import * as vscode from "vscode";

const STORAGE_KEY = "lastUsedProfiles";

export function saveLastUsedProfile(context: vscode.ExtensionContext, projectPath: string, profileKey: string) {
  const current = context.globalState.get<Record<string, string>>(STORAGE_KEY) || {};
  current[projectPath] = profileKey;
  context.globalState.update(STORAGE_KEY, current);
}

export function getLastUsedProfile(context: vscode.ExtensionContext, projectPath: string): string | undefined {
  const saved = context.globalState.get<Record<string, string>>(STORAGE_KEY) || {};
  return saved[projectPath];
}
