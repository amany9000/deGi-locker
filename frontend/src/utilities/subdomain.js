export const ValidSubdomain = ["verifier"];

export const resolvePrefixSubdomain = () => {
  const parsedData = window.location.host.split(".");
  const approvedSubdomains = ValidSubdomain;
  const subdomainStr =
    (parsedData && parsedData.length > 2 && parsedData[0]) || null;
  return subdomainStr && approvedSubdomains.includes(subdomainStr)
    ? subdomainStr
    : null;
};
