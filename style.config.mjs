export const port = 3848;
export const host = "127.0.0.1";

export const site = {
  id: "rule34",
  origin: "https://rule34.xxx",
  match: ["https://rule34.xxx/*"],
};

export const metadata = {
  name: "Rule34.xxx Everforest",
  version: "0.1.0",
  description: "A dark theme for rule34.xxx using the Everforest medium palette",
  author: "Nanumpf",
  preprocessor: "default",
  namespace: "https://rule34.xxx",
};

export const exportFile = "rule34.user.css";
export const exportMinFile = "rule34.min.user.css";

export const bundles = [
  {
    file: "src/base.scss",
    document: "url-prefix(\"https://rule34.xxx\")",
  },
];

export const snapshotPages = [];
