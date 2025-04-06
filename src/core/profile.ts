import * as fs from "fs";
import * as path from "path";
import * as os from "os";

export type GitProfile = {
  name: string;
  email: string;
};

export type GitProfileData = {
  profiles: Record<string, GitProfile>;
  pathRules: Record<string, string>;
};

const profilesPath = path.join(os.homedir(), ".gitprofiles.json");

export function loadProfiles(): GitProfileData {
  if (!fs.existsSync(profilesPath)) {
    return { profiles: {}, pathRules: {} };
  }

  const data = JSON.parse(fs.readFileSync(profilesPath, "utf-8"));
  const { pathRules = {}, ...rest } = data;

  return {
    profiles: rest,
    pathRules,
  };
}

export function saveProfiles(data: GitProfileData) {
  fs.writeFileSync(
    profilesPath,
    JSON.stringify({ ...data.profiles, pathRules: data.pathRules }, null, 2),
    "utf-8"
  );
}
