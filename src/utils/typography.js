import Typography from 'typography'
// import githubTheme from 'typography-theme-github'
// import moragaTheme from 'typography-theme-moraga'
// import wordpressKubrickTheme from 'typography-theme-wordpress-kubrick';
// import fairyGatesTheme from 'typography-theme-fairy-gates';

const theme = {
  title: 'Elegance',
  baseFontSize: '16px',
  baseLineHeight: 1.7,
  headerFontFamily: [
    'Segoe UI',
    'sans-serif'
  ],
  bodyFontFamily: [
    'Segoe UI',
    'sans-serif'
  ],
  scaleRatio: 2,
  bodyColor: '#616161',
  headerWeight: 600,
  bodyWeight: 'normal',
  boldWeight: 500,
  blockMarginBottom: 1 / 2,
  overrideStyles: ({ rhythm }) => ({
    h1: {
      borderBottom: `1px solid #f5f5f5`,
      paddingBottom: rhythm(1 / 2),
      marginBottom: rhythm(2 / 2),
      marginTop: rhythm(3/2)
    },
    h2: {
      borderBottom: `1px solid #f5f5f5`,
      paddingBottom: `calc(${rhythm(1 / 4)} - 1px)`,
      marginBottom: rhythm(2 / 2),
      marginTop: rhythm(3/2),
    },
    'h3': {
      marginBottom: rhythm(1 / 4),
      marginTop: rhythm(2/2)
    },
    'h4,h5,h6': {
      marginBottom: rhythm(1 / 3),
      marginTop: rhythm(2/2)
    },
    'h1,h2,h3,h4,h5,h6': {
      color: '#616161'
    },
    'ol,ul': {
      marginLeft: rhythm(1.25),
    },
    // children ol, ul
    'li>ol,li>ul': {
      marginLeft: rhythm(1.25),
    },
    a: {
      color: '#AD974F',
      textDecoration: 'none',
    },
    'a:hover,a:active': {
      textDecoration: 'underline',
    },
    blockquote: {
      borderLeft: '3px solid #AD974F',
      color: '#757575',
      marginTop: 0,
      marginRight: 0,
      marginLeft: 0,
      paddingLeft: `calc(${rhythm(1 / 2)} - 1px)`,
    },
  }),
}

const typography = new Typography(theme)

if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
}

export default typography
