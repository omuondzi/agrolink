import clsx from "clsx";
import { HTMLAttributes, ReactNode } from "react";

interface TypographyProps
  extends HTMLAttributes<HTMLHeadingElement | HTMLParagraphElement> {
  children: ReactNode;
}

export const Heading = ({ children, className, ...props }: TypographyProps) => (
  <h1
    className={clsx(
      "text-3xl lg:text-4xl text-primary-500 font-semibold",
      className
    )}
    {...props}
  >
    {children}
  </h1>
);

export const SubHeading = ({
  children,
  className,
  ...props
}: TypographyProps) => (
  <h6
    className={clsx("text-[18px] md:text-[20px] font-medium", className)}
    {...props}
  >
    {children}
  </h6>
);

export const SubHeading2 = ({
  children,
  className,
  ...props
}: TypographyProps) => (
  <h6 className={clsx("font-medium", className)} {...props}>
    {children}
  </h6>
);
export const H1 = ({ children, className }: TypographyProps) => (
  <h1
    className={clsx(
      "text-[1.5rem] xs:text-[1rem] md:text-[2.0rem] lg:text-[2.5rem]  2xl:text-[3.5rem] text-prmary-default font-semibold",
      className
    )}
  >
    {children}
  </h1>
);

export const H2 = ({ children, className }: TypographyProps) => (
  <h2
    className={clsx(
      "text-[1.75rem]  md:text-[1.75rem] lg:text-[2.25rem]  2xl:text-[2.5rem] text-prmary-default font-semibold",
      className
    )}
  >
    {children}
  </h2>
);

export const H3 = ({ children, className }: TypographyProps) => (
  <h3 className={clsx("text-lg md:text-xl lg:text-3xl", className)}>
    {children}
  </h3>
);

export const H5 = ({ children, className }: TypographyProps) => (
  <h5 className={clsx("text-lg md:text-xl lg:text-2xl", className)}>
    {children}
  </h5>
);

export const H6 = ({ children, className }: TypographyProps) => (
  <h5 className={clsx("text-lg lg:text-xl", className)}>{children}</h5>
);

export const Paragraph = ({
  children,
  className,
  ...props
}: TypographyProps) => (
  <p className={clsx("text-base", className)} {...props}>
    {children}
  </p>
);
export const Subtitle = ({ children, className }: TypographyProps) => (
  <p
    className={clsx("text-base md:text-lg lg:text-2xl text-grayish", className)}
  >
    {children}
  </p>
);

export const Subtitle2 = ({ children, className }: TypographyProps) => (
  <p className={clsx("text-sm md:md  text-grayish", className)}>{children}</p>
);

export const FormHelper = ({
  children,
  className,
  ...props
}: TypographyProps) => (
  <p className={clsx("text-xs font-medium", className)} {...props}>
    {children}
  </p>
);

export const Caption = ({ children, className, ...props }: TypographyProps) => (
  <h6 className={clsx("text-sm text-gray-400", className)} {...props}>
    {children}
  </h6>
);
