import { extendTheme, themeTools, theme as nbTheme } from 'native-base';

// Theme
const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

const theme = extendTheme({
  colors: {
    primary: nbTheme.colors.blue,
  },
  components: {
    Text: {
      baseStyle: (props: any) => {
        return {
          // light: any, dark: any
          color: themeTools.mode("gray.500", "gray.400")(props),
        };
      },
    },
    Button: {
      defaultProps: {
        borderRadius: '6',
        // py: '3',
      },
      variants: {
        chartRangeUnFocused: (props: any) => {
          return {
            borderColor: themeTools.mode("gray.200", "gray.700")(props),
            borderWidth: 1.2,
            bg: `transparent`,
            fontSize: 'xs',
            width: '18%',
            color: themeTools.mode("gray.500", "#262A31")(props)
          };
        },
        chartRangeFocused: (props: any) => {
          return {
            borderColor: 'transparent',
            borderWidth: 1.2,
            bg: `primary.500`,
            fontSize: 'xs',
            width: '18%',
          };
        }
      }
    },
    IconButton: {
      defaultProps: {
        background: 'transparent'
      }
    },
    Input: {
      baseStyle: (props: any) => {
        return {
          // light: any, dark: any
          borderColor: themeTools.mode("gray.300", "gray.800")(props),
          background: themeTools.mode("#fff", "#262A31")(props),
          color: themeTools.mode("gray.400", "gray.200")(props),
        };
      },
      defaultProps: {
        borderRadius: '5',
        px: '3.5',
        py: '4',
        borderWidth: 1.2,
        fontSize: "sm",
        fontWeight: 'medium'
      },
    },
    FormControl: {
      baseStyle: (props: any) => {
        return {
          background: themeTools.mode("#fff", "#262A31")(props),
        };
      },
      defaultProps: {
        borderRadius: '5',
      },
    },
  },
  config
});


export default theme;