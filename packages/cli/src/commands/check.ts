import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import {
  TastePackSchema,
  formatReportText,
  formatReportMarkdown,
} from "@taste-compiler/core";
import { runChecks, buildReport } from "@taste-compiler/check";
import { extractTarget } from "@taste-compiler/adapters-web";

export async function checkCommand(args: string[]): Promise<void> {
  const packPath =
    findArg(args, "--pack") || "./taste/pack/taste-pack.json";
  const targetDir = findArg(args, "--target") || "./app";
  const format = findArg(args, "--format") || "text";

  console.log(`Loading pack from ${resolve(packPath)}...`);
  const raw = await readFile(resolve(packPath), "utf-8");
  const pack = TastePackSchema.parse(JSON.parse(raw));

  console.log(`Scanning target at ${resolve(targetDir)}...`);
  const target = await extractTarget(targetDir);

  console.log(
    `Scanned: ${target.components.length} components, ${target.styles.length} styles, ${target.copyBlocks.length} copy blocks`
  );
  console.log("");

  const violations = runChecks(pack, target);
  const report = buildReport(pack, targetDir, violations);

  if (format === "markdown" || format === "md") {
    console.log(formatReportMarkdown(report));
  } else if (format === "json") {
    console.log(JSON.stringify(report, null, 2));
  } else {
    console.log(formatReportText(report));
  }

  if (!report.summary.passed) {
    process.exit(1);
  }
}

function findArg(args: string[], name: string): string | undefined {
  const idx = args.indexOf(name);
  if (idx >= 0 && idx + 1 < args.length) return args[idx + 1];
  return undefined;
}
