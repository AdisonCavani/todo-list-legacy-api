export const isUrlInternal = (href: string) =>
  href && (href.startsWith("/") || href.startsWith("#"));
