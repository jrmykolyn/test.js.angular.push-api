const getPath = (url = '') => {
  if (!url.includes('?')) return url;
  return url.substring(0, url.indexOf('?'));
};

const getQueryStringParams = (url = '') => {
  if (!url.includes('?')) return {};
  return url.substring(url.indexOf('?') + 1)
    .split('&')
    .map((pair) => pair.split('='))
    .map(([key, value]) => ({ [key]: value }))
    .reduce((acc, o) => ({ ...acc, ...o }), {});
};

const getSegments = (path) => {
  return path.split('/').filter((segment) => !!segment.trim());
};

module.exports = {
  getPath,
  getQueryStringParams,
  getSegments,
};
