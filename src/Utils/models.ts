export interface AxeConfig {
  readonly whitelist?: readonly string[];
  readonly runIf?: () => boolean;
}

export const defaultRunIf = () => {
  try {
    const envProcess = process.env;
    return envProcess?.NODE_ENV === "development";
  } catch {
    return false;
  }
};
