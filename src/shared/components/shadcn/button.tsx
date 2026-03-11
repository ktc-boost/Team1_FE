import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/lib/utils';
const buttonVariantClasses = {
  default: 'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
  defaultBoost: 'bg-boost-blue hover:bg-boost-blue-hover text-white shadow-xs',
  secondaryBoost: 'bg-boost-orange hover:bg-boost-orange-hover text-white shadow-xs',
  destructive:
    'bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
  outline:
    'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
  outlineBoost:
    'border text-boost-blue border border-boost-blue hover:text-white hover:bg-boost-blue bg-background shadow-xs',
  outlineSecondaryBoost:
    'border text-boost-orange border border-boost-orange hover:text-white hover:bg-boost-orange bg-background shadow-xs',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
  ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
  link: 'text-primary underline-offset-4 hover:underline',
} as const;

const buttonSizeClasses = {
  default: 'h-9 px-4 py-2 has-[>svg]:px-3',
  sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
  lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
  icon: 'size-9',
  'icon-sm': 'size-8',
  'icon-lg': 'size-10',
} as const;

export const buttonVariantOptions = Object.keys(buttonVariantClasses) as Array<
  keyof typeof buttonVariantClasses
>;

export const buttonSizeOptions = Object.keys(buttonSizeClasses) as Array<
  keyof typeof buttonSizeClasses
>;

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ...',
  {
    variants: {
      variant: buttonVariantClasses,
      size: buttonSizeClasses,
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
