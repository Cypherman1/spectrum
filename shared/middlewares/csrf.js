// @flow
import hostValidation from 'host-validation';

// NOTE(@mxstbr):
// - Host header only contains the domain, so something like 'build-api-asdf123.now.sh' or 'ec2-18-224-212-70.us-east-2.compute.amazonaws.com'
// - Referer header contains the entire URL, so something like 'https://build-api-asdf123.now.sh/forward' or 'http://ec2-18-224-212-70.us-east-2.compute.amazonaws.com/forward'
// That means we have to check the Host slightly differently from the Referer to avoid things like 'my-domain-ec2-18-224-212-70.us-east-2.compute.amazonaws.com' to be able to hack our users

// Hosts, without http(s):// and paths
const trustedHosts = [
  process.env.NOW_URL &&
    new RegExp(`^${process.env.NOW_URL.replace('https://', '')}$`),
  /^spectrum\.chat$/,
  // All subdomains
  /^.*\.spectrum\.chat$/,
].filter(Boolean);

// Referers, with http(s):// and paths
const trustedReferers = [
  process.env.NOW_URL && new RegExp(`^${process.env.NOW_URL}($|\/.*)`),
  /^https:\/\/spectrum\.chat($|\/.*)/,
  // All subdomains
  /^https:\/\/.*\.spectrum\.chat($|\/.*)/,
].filter(Boolean);

export default hostValidation({
  hosts: trustedHosts,
  referers: trustedReferers,
  mode: 'either',
});
