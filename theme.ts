import { createTheme, rem } from '@mantine/core';
import { appColors } from './components/SharedComponents/Color';

export const defaultFonts =
  'Nunito, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif';

export const inputStyles = {
  input: {
    height: '3.25rem',
    fontSize: '1rem',
    lineHeight: '1.5',
    fontWeight: 600,
    borderRadius: 100,
    paddingLeft: rem(16),
    paddingRight: rem(16),
    background: appColors.white,
    border: `1px solid ${appColors.greenAccent}`,
  },
  label: {
    fontSize: rem(14),
    color: appColors.labelBlack,
    marginBottom: 8,
    fontWeight: '600',
  },
};

export const buttonStyles = {
  root: {
    height: '3rem',
    backgroundColor: appColors.greenAccent,
    fontSize: rem(16),
    fontWeight: '700',
  },
  label: {
    fontSize: '1rem',
  },
};

export const checkboxStyles = {
  label: {
    display: 'block',
  },
};
export const theme = createTheme({
  black: '#101828',
  colors: {
    brand: [
      '#00CC5B',
      '#060746',
      '#0B0C7D',
      '#0e10a4',
      '#1314d3',
      '#2c2eec',
      '#5b5cf1',
      '#8a8bf5',
      '#b9b9f9',
      '#e8e8fd',
    ],
  },
  primaryColor: 'brand',
  defaultRadius: 'md',
  fontFamily: defaultFonts,
  headings: {
    fontFamily: defaultFonts,
    sizes: {
      h2: { fontWeight: '700', fontSize: rem(24), lineHeight: '1.35 ' },
      h3: { fontWeight: '600', fontSize: rem(18), lineHeight: '1.25' },
    },
  },
  components: {
    Input: {
      styles: () => ({
        input: inputStyles.input,
        label: inputStyles.label,
      }),
    },
    InputWrapper: {
      styles: () => ({
        label: inputStyles.label,
      }),
    },
    PasswordInput: {
      styles: () => ({
        innerInput: inputStyles.input,
      }),
    },
    Button: {
      styles: () => buttonStyles,
    },
    Checkbox: {
      styles: () => checkboxStyles,
    },
  },
});
