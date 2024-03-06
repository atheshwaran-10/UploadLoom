// MyButton.tsx
import { extendVariants, Tab as OTab } from "@nextui-org/react";

export const Tab = extendVariants(OTab, {
  variants: {
    // <- modify/add variants
    color: {
      violet: "text-[#7828C8] bg-[#8b5cf6] text-[#fff]",
    },

    size: {
      xs: "px-unit-2 min-w-unit-12 h-unit-6 text-tiny gap-unit-1 rounded-small",
      md: "px-unit-4 min-w-unit-20 h-unit-10 text-small gap-unit-2 rounded-small",
      xl: "px-unit-8 min-w-unit-28 h-unit-14 text-large gap-unit-4 rounded-medium",
    },
  },
  defaultVariants: {
    // <- modify/add default variants
    color: "violet",
    size: "md",
  },
  compoundVariants: [
    // <- modify/add compound variants
    {
      color: "violet",
    },
  ],
});
