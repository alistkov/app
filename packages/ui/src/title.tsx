import { ReactNode } from 'react';

interface TitleProps {
  children: ReactNode;
}

export function Title ({ children }: TitleProps) {
  return (
    <h1>{children}</h1>
  )
}