import Link from "next/link";
import type { ReactNode } from "react";
import "./A.css";

type Props = {
  href: string;
  children: ReactNode;
  onClick?: () => void;
  className?: string;
};

export const A = ({ href, children, onClick, className = "" }: Props) => {
  return (
    <Link href={href} className={`A ${className}`} onClick={onClick}>
      {children}
    </Link>
  );
};
