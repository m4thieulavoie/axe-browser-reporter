export interface AxeConfig {
  whitelist?: string[];
  runIf?: () => boolean;
}

export const defaultRunIf = () => {
  try {
    const envProcess = process.env;
    return envProcess?.NODE_ENV === "development";
  } catch {
    return false;
  }
};
