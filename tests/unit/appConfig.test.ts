import { describe, expect, it } from "@jest/globals";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("app metadata", () => {
  it("uses the SpoloFile app name", () => {
    const appJson = readFileSync(resolve(__dirname, "../../app.json"), "utf-8");
    const packageJson = readFileSync(
      resolve(__dirname, "../../package.json"),
      "utf-8",
    );

    expect(appJson).toContain('"name": "spolofy"');
    expect(appJson).toContain('"slug": "spolofy"');
    expect(packageJson).toContain('"name": "spolofy"');
  });
});
