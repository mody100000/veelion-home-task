export function getStringInitial(name?: string) {
  return name?.[0]?.toUpperCase() ?? "U";
}
