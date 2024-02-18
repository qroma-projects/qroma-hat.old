// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'qroma-hat',
  tagline: 'qroma-hat - an awesome qroma.dev project',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://your-qroma-project-landing-page.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/qroma-hat/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'my-github-user-or-org-name', // Usually your GitHub org/user name.
  projectName: 'qroma-hat', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  scripts: [
    // 'https://unpkg.com/esp-web-tools@9.2.1/dist/web/install-button.js?module'
    {
      src: '/qroma-hat/esp-web-tools/install-button.js?module',
      async: true,
    },
  ],

  plugins: [
    ['@docusaurus/plugin-content-docs', {
      id: 'get-started',
      path: 'src/get-started',
      routeBasePath: 'get-started',
      sidebarPath: require.resolve('./sidebar-get-started.js'),
      sidebarCollapsed: false,
      sidebarCollapsible: false,
    }],
    ['@docusaurus/plugin-content-docs', {
      id: 'advanced',
      path: 'src/advanced-io',
      routeBasePath: 'advanced-io',
      sidebarPath: require.resolve('./sidebar-advanced.js'),
      sidebarCollapsed: false,
      sidebarCollapsible: false,
    }],
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'qroma-hat',
        logo: {
          alt: 'Project Logo',
          src: 'img/qromatech-logo-white.png',
        },
        items: [
          {to: '/licenses', label: 'Licenses', position: 'left'},
          {to: '/get-started', label: 'Get Started', position: 'left'},
          {to: '/command-device', label: 'Command Device', position: 'left'},
          {
            to: '/advanced-io',
            position: 'left',
            label: 'Advanced',
          },
          {
            type: 'custom-navbarConnectionComponent',
            position: "right",
          },
          {
            type: 'dropdown',
            label: 'Qroma Links',
            position: 'right',
            items: [
              {
                href: 'https://your-qroma-project-repo-host.com/user-or-org-id/qroma-project-id',
                label: 'qroma-hat source files',
              },
              {
                href: 'https://qroma.dev',
                label: 'qroma.dev',
              },
              {
                href: 'https://www.qroma-projects.org',
                label: 'Other qroma projects',
              },
            ],
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            label: 'Overview',
            to: '/get-started/overview',
          },
          {
            label: 'Blog',
            to: '/blog',
          },
          {
            label: 'Project Docs',
            to: '/docs',
          },
          {
            label: 'GitHub',
            href: 'https://github.com/my-github-user-or-org-name/qroma-hat',
          },
          {
            href: 'https://qroma.dev',
            label: 'qroma.dev',
          },
        ],
        copyright: `Copyright ${new Date().getFullYear()} - qroma-hat - built with Docusaurus`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

module.exports = config;