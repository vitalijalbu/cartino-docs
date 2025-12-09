export default defineAppConfig({
  ui: {
    colors: {
      primary: 'blue',
      neutral: 'slate'
    },
    footer: {
      slots: {
        root: 'border-t border-default',
        left: 'text-sm text-muted'
      }
    }
  },
  seo: {
    siteName: 'Cartino Documentation'
  },
  header: {
    title: '',
    to: '/',
    logo: {
      alt: '',
      light: '',
      dark: ''
    },
    search: true,
    colorMode: true,
    links: [{
      'icon': 'i-simple-icons-github',
      'to': 'https://github.com/cartinophp/cartino',
      'target': '_blank',
      'aria-label': 'GitHub'
    }]
  },
  footer: {
    credits: `Cartino E-commerce Platform • © ${new Date().getFullYear()}`,
    colorMode: false,
    links: [{
      'icon': 'i-simple-icons-discord',
      'to': 'https://discord.gg/cartino',
      'target': '_blank',
      'aria-label': 'Cartino on Discord'
    }, {
      'icon': 'i-simple-icons-x',
      'to': 'https://x.com/cartinophp',
      'target': '_blank',
      'aria-label': 'Cartino on X'
    }, {
      'icon': 'i-simple-icons-github',
      'to': 'https://github.com/cartinophp/cartino',
      'target': '_blank',
      'aria-label': 'Cartino on GitHub'
    }]
  },
  toc: {
    title: 'Table of Contents',
    bottom: {
      title: 'Community',
      edit: 'https://github.com/cartinophp/cartino-docs/edit/main/content',
      links: [{
        icon: 'i-lucide-star',
        label: 'Star on GitHub',
        to: 'https://github.com/cartinophp/cartino',
        target: '_blank'
      }, {
        icon: 'i-lucide-book-open',
        label: 'Cartino Website',
        to: 'https://cartino.dev',
        target: '_blank'
      }]
    }
  }
})
