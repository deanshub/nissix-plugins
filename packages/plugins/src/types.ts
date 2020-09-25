import type {NormalizedPackageJson} from 'read-pkg'

export interface Plugin {
  dir: string;
  manifest: NormalizedPackageJson;
}
