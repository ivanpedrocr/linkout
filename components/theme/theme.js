export const getThemeColors = (theme, colorMode) => ({
  primary: theme.colors.primary[600],
  background:
    colorMode === "dark" ? theme.colors.trueGray[800] : theme.colors.white,
  border:
    colorMode === "dark" ? theme.colors.trueGray[800] : theme.colors.white,
  text: colorMode === "dark" ? theme.colors.lightText : theme.colors.darkText,
  notification: theme.colors.red[500],
  card: colorMode === "dark" ? theme.colors.trueGray[800] : theme.colors.white,
});
