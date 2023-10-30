import { existsSync } from 'fs';
import path, { resolve } from 'path';

export function getEnvFilePath(dest: string) {
  /// get the enovironment i.e. develpoment,production,test,etc.
  const env: string | undefined = process.env.NODE_ENV;
  /// set the default file to .env
  const fallback: string = resolve(`${dest}/.env`);
  /// get the file name
  const filename: string = env ? `${env}.env` : 'development.env';
  /// get the path of the file
  let filepath: string = resolve(`${dest}/${filename}`);

  /// if path doesn't exist then return fallback path
  if (!existsSync(filepath)) filepath = fallback;
  return filepath;
}
