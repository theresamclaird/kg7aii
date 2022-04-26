// Regular Expressions: https://gist.github.com/JoshuaCarroll/f6b2c64992dfe23feed49a117f5d1a43
const validCallsigns = {
  all: /[a-zA-Z0-9]{1,3}[0123456789][a-zA-Z0-9]{0,3}[a-zA-Z]/,
  restOfWorld: /\b(?!K)(?!k)(?!N)(?!n)(?!W)(?!w)(?!A[A-L])(?!a[a-l])[a-zA-Z0-9][a-zA-Z0-9]?[a-zA-Z0-9]?[0123456789][a-zA-Z0-9][a-zA-Z0-9]?[a-zA-Z0-9]?[a-zA-Z0-9]?\b/,
  unitedStates: /[AKNWaknw][a-zA-Z]{0,2}[0123456789][a-zA-Z]{1,3}/
};
export default (callsign) => {
  return callsign.match(validCallsigns.all);
};
