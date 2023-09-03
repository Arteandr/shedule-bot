export const getEnv = (env: string) => {
  const envValue = process.env[env];
  if (!envValue || (envValue && envValue.trim().length < 1))
    throw new Error(`Cannot find ${env} env var`);

  return envValue;
};
