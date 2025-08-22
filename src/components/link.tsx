type LinkProps = ({
  children?: undefined,
  name: string
} | {
  children: React.ReactNode,
  name?: undefined
}) & {
  href: string,
  className?: string
}

export const Link = ({
  children,
  className,
  href,
  name
}: LinkProps) => {
  return <a className={className} key={href} href={href} target="_blank" rel="noopener noreferrer">{children ?? name}</a>;
}