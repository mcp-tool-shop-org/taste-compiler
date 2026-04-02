import { resolve, join } from "node:path";
import { readdir, stat } from "node:fs/promises";
import type { ExtractedTarget } from "@taste-compiler/check";
import { scanReactFile } from "./react/scanner.js";
import { scanTailwindFile } from "./tailwind/scanner.js";
import { scanRoutes } from "./routes/scanner.js";
import { scanCopyInFile } from "./copy/scanner.js";

/**
 * Recursively collect files matching extensions.
 */
async function collectFiles(
  dir: string,
  extensions: string[]
): Promise<string[]> {
  const result: string[] = [];

  try {
    const entries = await readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === "node_modules" || entry.name === "dist") continue;
        result.push(...(await collectFiles(full, extensions)));
      } else if (extensions.some((ext) => entry.name.endsWith(ext))) {
        result.push(full);
      }
    }
  } catch {
    // Directory doesn't exist or not readable
  }

  return result;
}

/**
 * Extract all taste-checkable data from a web app target directory.
 */
export async function extractTarget(
  targetDir: string
): Promise<ExtractedTarget> {
  const absDir = resolve(targetDir);
  const tsxFiles = await collectFiles(absDir, [".tsx", ".jsx"]);

  const allComponents: ExtractedTarget["components"] = [];
  const allScreens: ExtractedTarget["screens"] = [];
  const allStyles: ExtractedTarget["styles"] = [];
  const allClasses: ExtractedTarget["classes"] = [];
  const allCopy: ExtractedTarget["copyBlocks"] = [];

  // Scan React files
  for (const file of tsxFiles) {
    try {
      const { components, screen } = await scanReactFile(file);
      allComponents.push(...components);
      allScreens.push(screen);
    } catch {
      // Skip files that fail to parse
    }
  }

  // Scan all files for Tailwind/style patterns
  const allFiles = await collectFiles(absDir, [
    ".tsx",
    ".jsx",
    ".css",
    ".html",
  ]);
  for (const file of allFiles) {
    try {
      const { styles, classes } = await scanTailwindFile(file);
      allStyles.push(...styles);
      allClasses.push(...classes);
    } catch {
      // Skip files that fail to parse
    }
  }

  // Scan copy
  for (const file of tsxFiles) {
    try {
      const copy = await scanCopyInFile(file);
      allCopy.push(...copy);
    } catch {
      // Skip files that fail to parse
    }
  }

  // Scan routes
  const { routes } = await scanRoutes(absDir);

  return {
    styles: allStyles,
    components: allComponents,
    screens: allScreens,
    copyBlocks: allCopy,
    metrics: {
      topLevelNavItems: undefined, // Would need more specific detection
      routeCount: routes.length,
    },
    classes: allClasses,
  };
}
