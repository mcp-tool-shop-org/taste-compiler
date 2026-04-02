import type { TastePack, TasteViolation } from "@taste-compiler/core";

/**
 * Check for raw hex color usage that bypasses the token system.
 */
export function checkTokenViolations(
  pack: TastePack,
  extractedStyles: ExtractedStyle[]
): TasteViolation[] {
  const violations: TasteViolation[] = [];

  for (const style of extractedStyles) {
    // Raw hex colors
    if (style.type === "color" && style.isRaw) {
      violations.push({
        id: `tok-${style.file}-${style.line}`,
        severity: "error",
        class: "visual-token",
        ruleId: "TOK-001",
        message: `Raw hex color "${style.value}" used outside token system`,
        rationale:
          "All colors should reference semantic token roles to maintain visual consistency",
        evidence: [
          {
            file: style.file,
            line: style.line,
            snippet: style.snippet,
            value: style.value,
          },
        ],
        suggestedFix: `Replace with a semantic color token`,
      });
    }

    // Raw spacing values
    if (style.type === "spacing" && style.isRaw) {
      const allowedValues = pack.artifacts.visualTokens.spacing.map(
        (s) => s.value
      );
      if (!allowedValues.includes(style.value)) {
        violations.push({
          id: `tok-spacing-${style.file}-${style.line}`,
          severity: "warn",
          class: "visual-token",
          ruleId: "TOK-002",
          message: `Spacing value "${style.value}" not on allowed scale`,
          rationale:
            "Consistent spacing reinforces the product's visual rhythm",
          evidence: [
            {
              file: style.file,
              line: style.line,
              snippet: style.snippet,
              value: style.value,
            },
          ],
          suggestedFix: `Use one of: ${allowedValues.join(", ")}`,
        });
      }
    }
  }

  return violations;
}

export interface ExtractedStyle {
  file: string;
  line: number;
  type: "color" | "spacing" | "typography" | "radius" | "other";
  value: string;
  isRaw: boolean;
  snippet: string;
}
