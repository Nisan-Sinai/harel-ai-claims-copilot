import { expect, test } from "@playwright/test";

test("installs as a branded Hebrew PWA", async ({ page, request }) => {
  const response = await request.get("/manifest.webmanifest");
  expect(response.ok()).toBeTruthy();
  const manifest = await response.json();

  expect(manifest.lang).toBe("he");
  expect(manifest.dir).toBe("rtl");
  expect(manifest.display).toBe("standalone");
  expect(manifest.start_url).toBe("/");
  expect(manifest.scope).toBe("/");

  for (const size of [192, 512]) {
    const icon = manifest.icons.find(
      (item: { sizes: string; type: string }) =>
        item.sizes === `${size}x${size}` && item.type === "image/png",
    );
    expect(icon).toBeDefined();
    const image = await request.get(icon.src);
    expect(image.ok()).toBeTruthy();
    expect(image.headers()["content-type"]).toContain("image/png");

    const bytes = await image.body();
    expect(Array.from(bytes.subarray(0, 8))).toEqual([137, 80, 78, 71, 13, 10, 26, 10]);
    expect(bytes.readUInt32BE(16)).toBe(size);
    expect(bytes.readUInt32BE(20)).toBe(size);
  }

  expect(manifest.icons.some((icon: { purpose?: string }) => icon.purpose === "maskable")).toBe(true);

  await page.goto("/");
  await expect(page.locator('head link[rel="manifest"]')).toHaveAttribute(
    "href", "/manifest.webmanifest",
  );
  await expect(page.locator('head meta[name="theme-color"]')).toHaveAttribute(
    "content", "#073968",
  );

  const worker = await request.get("/sw.js");
  expect(worker.ok()).toBeTruthy();
  expect(await worker.text()).not.toContain("caches.open(");
});
