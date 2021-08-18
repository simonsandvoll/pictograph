export const COLORS = {
  primary: '203deg 99% 48%',
  secondary: '193deg 41% 45%',
  white: '0deg 0% 100%',
  gray: {
    100: '185deg 5% 95%',
    300: '190deg 5% 80%',
    500: '196deg 4% 60%',
    700: '220deg 5% 40%',
    900: '220deg 3% 20%',
  },
}

export const WEIGHTS = {
  normal: 500,
  medium: 600,
  bold: 800,
}

export const BREAKPOINTS = {
  mobile: 600,
  tablet: 950,
  laptop: 1300
}

export const QUERIES = {
  mobileAndSmaller: `(max-width: ${BREAKPOINTS.mobile / 16}rem)`,
  tabletAndSmaller: `(max-width: ${BREAKPOINTS.tablet / 16}rem)`,
  laptopAndSmaller: `(max-width: ${BREAKPOINTS.laptop / 16}rem)`,
}