const originalError = console.error;
const originalWarn = console.warn;

// this is here to silence a warning related to useStaticRendering
// xref https://github.com/GMOD/jbrowse-components/issues/1277
jest.spyOn(console, "error").mockImplementation((...args) => {
  if (typeof args[0] === "string" && args[0].includes("useLayoutEffect")) {
    return undefined;
  }
  if (typeof args[0] === "string" && args[0].includes("movedDuring")) {
    return undefined;
  }
  return originalError.call(console, args);
});
