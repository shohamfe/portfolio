import { cva } from "class-variance-authority";

export const chipVariants = cva(
  "inline-flex shrink-0 items-center gap-1 rounded-full whitespace-nowrap px-3 py-1 font-ui text-tiny font-medium",
  {
    variants: {
      color: {
        blue: "",
        purple: "",
        pink: "",
        yellow: "",
        green: "",
      },
      variant: {
        flat: "",
        solid: "",
        bordered: "border-2 border-solid bg-surface-raised",
      },
    },
    compoundVariants: [
      { color: "blue", variant: "flat", class: "bg-primary-50 text-primary" },
      {
        color: "purple",
        variant: "flat",
        class: "bg-secondary-50 text-secondary",
      },
      { color: "pink", variant: "flat", class: "bg-danger-50 text-danger" },
      { color: "yellow", variant: "flat", class: "bg-warning-50 text-warning" },
      { color: "green", variant: "flat", class: "bg-success-50 text-success" },

      {
        color: "blue",
        variant: "solid",
        class: "bg-primary text-primary-foreground",
      },
      {
        color: "purple",
        variant: "solid",
        class: "bg-secondary text-secondary-foreground",
      },
      {
        color: "pink",
        variant: "solid",
        class: "bg-danger text-danger-foreground",
      },
      {
        color: "yellow",
        variant: "solid",
        class: "bg-warning text-warning-foreground",
      },
      {
        color: "green",
        variant: "solid",
        class: "bg-success text-success-foreground",
      },

      {
        color: "blue",
        variant: "bordered",
        class: "border-primary-300 text-primary",
      },
      {
        color: "purple",
        variant: "bordered",
        class: "border-secondary-300 text-secondary",
      },
      {
        color: "pink",
        variant: "bordered",
        class: "border-danger-300 text-danger",
      },
      {
        color: "yellow",
        variant: "bordered",
        class: "border-warning-300 text-warning",
      },
      {
        color: "green",
        variant: "bordered",
        class: "border-success-300 text-success",
      },
    ],
    defaultVariants: {
      color: "blue",
      variant: "flat",
    },
  },
);
