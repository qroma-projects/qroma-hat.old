import useDocusaurusContext from '@docusaurus/useDocusaurusContext';


export const createManifestPath = (staticDirPath: string): string => {
  const {siteConfig} = useDocusaurusContext();
  // const manifestPath = siteConfig.baseUrl + 'qroma/versions/0.1.0/firmware/manifest-firmware.json'
  const manifestPath = siteConfig.baseUrl + staticDirPath;
  return manifestPath;
}