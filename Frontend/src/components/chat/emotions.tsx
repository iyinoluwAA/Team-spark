"use client";
import { ExpressionColors, isExpressionColor } from "@/lib/constants/expression-colors";
import { expressionLabels } from "@/lib/constants/expression-labels";
import { motion } from "framer-motion";
import { CSSProperties } from "react";
import * as R from "remeda";

export default function Expressions({
  values,
}: {
  values: Record<string, number>;
}) {
  const top3 = R.pipe(values, R.entries(), R.sortBy(R.pathOr([1], 0)), R.reverse(), R.take(3));

  return (
    <div
      className={
        "flex w-full flex-col gap-3 border-emerald-100 border-t p-3 text-xs md:flex-row dark:border-emerald-900/30"
      }
    >
      {top3.map(([key, value]) => (
        <div key={key} className={"w-full overflow-hidden"}>
          <div className={"flex items-center justify-between gap-1 pb-1 font-mono"}>
            <div className={"truncate font-medium text-emerald-800 dark:text-emerald-300"}>
              {expressionLabels[key]}
            </div>
            <div className={"text-emerald-600 tabular-nums opacity-70 dark:text-emerald-400"}>
              {value.toFixed(2)}
            </div>
          </div>
          <div
            className={"relative h-1"}
            style={
              {
                "--bg": isExpressionColor(key) ? ExpressionColors[key] : "var(--bg)",
              } as CSSProperties
            }
          >
            <div
              className={"absolute top-0 left-0 size-full rounded-full bg-[var(--bg)] opacity-10"}
            />
            <motion.div
              className={"absolute top-0 left-0 h-full rounded-full bg-[var(--bg)]"}
              initial={{ width: 0 }}
              animate={{
                width: `${R.pipe(
                  value,
                  R.clamp({ min: 0, max: 1 }),
                  (value) => `${value * 100}%`,
                )}`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
