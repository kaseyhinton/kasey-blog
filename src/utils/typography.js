import Typography from 'typography'
import githubTheme from 'typography-theme-github'
import moragaTheme from 'typography-theme-moraga'
import wordpressKubrickTheme from 'typography-theme-wordpress-kubrick';

githubTheme.overrideThemeStyles = ({ rhythm }, options) => ({
  'h1,h2,h3': {
    marginBottom: rhythm(2/2),
    marginTop: rhythm(2/2)
  }
})
const typography = new Typography(githubTheme)

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
}

export default typography
