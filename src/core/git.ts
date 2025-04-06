import * as fs from "fs";
import * as path from "path";
import * as os from "os";
import { GitProfile } from "./profile";

export function updateGitConfig(profile: GitProfile, repoPath: string) {
  const localGitConfigPath = path.join(repoPath, ".git", "config");
  const globalGitConfigPath = path.join(os.homedir(), ".gitconfig");

  // Local
  if (fs.existsSync(localGitConfigPath)) {
    let config = fs.readFileSync(localGitConfigPath, "utf-8");
    if (config.includes("[user]")) {
      config = config.replace(/^\s*name\s*=.*$/m, `  name = ${profile.name}`);
      config = config.replace(
        /^\s*email\s*=.*$/m,
        `  email = ${profile.email}`
      );
    } else {
      config += `\n[user]\n\tname = ${profile.name}\n\temail = ${profile.email}\n`;
    }
    fs.writeFileSync(localGitConfigPath, config, "utf-8");
  }

  // Global
  let globalConfig = fs.existsSync(globalGitConfigPath)
    ? fs.readFileSync(globalGitConfigPath, "utf-8")
    : "";

  if (globalConfig.includes("[user]")) {
    globalConfig = globalConfig.replace(
      /^\s*name\s*=.*$/m,
      `  name = ${profile.name}`
    );
    globalConfig = globalConfig.replace(
      /^\s*email\s*=.*$/m,
      `  email = ${profile.email}`
    );
  } else {
    globalConfig += `\n[user]\n\tname = ${profile.name}\n\temail = ${profile.email}\n`;
  }

  fs.writeFileSync(globalGitConfigPath, globalConfig, "utf-8");
}

export function readGitUser(repoPath: string): GitProfile | null {
  const localGitConfigPath = path.join(repoPath, ".git", "config");
  const globalGitConfigPath = path.join(os.homedir(), ".gitconfig");

  const getUserFromConfig = (configPath: string): GitProfile | null => {
    if (!fs.existsSync(configPath)) {return null;}
    const config = fs.readFileSync(configPath, "utf-8");
    const nameMatch = config.match(/^\s*name\s*=\s*(.+)$/m);
    const emailMatch = config.match(/^\s*email\s*=\s*(.+)$/m);
    if (nameMatch && emailMatch) {
      return {
        name: nameMatch[1].trim(),
        email: emailMatch[1].trim(),
      };
    }
    return null;
  };

  return (
    getUserFromConfig(localGitConfigPath) ||
    getUserFromConfig(globalGitConfigPath)
  );
}
