export default {
  minDeclarationsForCrossFile: 4,
  minFilesForCrossFile: 2,
  ignoreSelectors: [":root", "html", "body"],
  ignoreFiles: [],
  ignoreRules: {
    "duplicate-declarations": [],
    "dead-selector": [
      "#rule34-dev-overlay",
      "#rule34-dev-overlay *",
      // Suggestion rows are filled in by Awesomplete after a keystroke.
      ".awesomplete > ul > li*",
      ".awesomplete mark",
      ".awesomplete:has*",
    ],
  },
  snapshotMap: {},
};
