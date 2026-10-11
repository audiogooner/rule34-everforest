import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { target } from "../scripts/preview.mjs";

describe("homepage target", () => {
  it("loads the homepage and waits for static-index", () => {
    const result = target();
    assert.equal(result.url, "https://rule34.xxx/");
    assert.match(result.ready, /#static-index/);
  });
});
