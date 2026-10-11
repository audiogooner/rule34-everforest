export const usage = `Rule34 homepage.

No project flags. Captures https://rule34.xxx/ with the theme applied.
`;

export function target() {
  return {
    url: "https://rule34.xxx/",
    // Homepage chrome or the CAPTCHA gate (Rule34 blocks many headless clients).
    ready: "#static-index, .captcha-box",
  };
}

export async function prepare(page) {
  await assertHomepage(page);
  await page.addStyleTag({ content: ".awesomplete > ul { display: none !important; }" });
  // Clear any leftover search text so the shot shows an empty box.
  const tags = page.locator("#tags");
  if ((await tags.count()) > 0) {
    await tags.evaluate((input) => {
      input.value = "";
      input.blur();
    });
  }
}

async function assertHomepage(page) {
  const title = await page.title();
  if (/captcha/i.test(title) || (await page.locator(".captcha-box").count()) > 0) {
    throw new Error(
      "Rule34 served a CAPTCHA instead of the homepage. Solve it in a normal browser, then retry from an IP/session the site already trusts — headless Chromium is often challenged.",
    );
  }
  await page.locator("#static-index").waitFor({ state: "visible" });
}
