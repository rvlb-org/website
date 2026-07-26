import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'RVLB Docs',
  description: 'التوثيق الرسمي لمشاريع RVLB — نظام تشغيل Hisn-seL4 ومنظومة RVLB التقنية',
  lang: 'ar',
  dir: 'rtl',
  // Force Dark Mode for the premium glassmorphic UI
  appearance: 'force-dark',

  // SEO
  sitemap: {
    hostname: 'https://docs.rvlb.org'
  },

  head: [
    ['link', { rel: 'icon', href: 'https://rvlb.org/ico.png' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;800&display=swap'
    }],
    // Open Graph
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'RVLB Docs' }],
    ['meta', { property: 'og:image', content: 'https://rvlb.org/ico.png' }],
    ['meta', { name: 'twitter:card', content: 'summary' }],
    ['meta', { name: 'twitter:site', content: '@rvlb_org' }],
    // Canonical base
    ['meta', { name: 'robots', content: 'index, follow' }],
  ],

  themeConfig: {
    logo: 'https://rvlb.org/ico.png',
    siteTitle: 'RVLB Docs',
    outline: [2, 3],

    nav: [
      { text: 'الرئيسية', link: '/' },
      { text: 'Hisn-seL4', link: '/hisn/' },
      { text: 'SHENN', link: '/shenn/' },
      { text: 'Raqeem', link: '/raqeem/' },
      { text: 'Kanz DB', link: '/kanz/' },
      { text: 'Watad', link: '/watad/' },
      { text: 'المفاهيم', link: '/concepts/' },
      { text: 'rvlb.org ↗', link: 'https://rvlb.org', target: '_blank' }
    ],

    sidebar: {
      // SHENN
      '/shenn/': [
        {
          text: 'SHENN-ai',
          items: [
            { text: 'نظرة عامة', link: '/shenn/' },
            { text: 'الانقسام الخلوي', link: '/shenn/mitosis' },
            { text: 'الجهاز المناعي', link: '/shenn/immune' },
            { text: 'دورة الحياة', link: '/shenn/lifecycle' }
          ]
        }
      ],

      // Raqeem
      '/raqeem/': [
        {
          text: 'لغة رقيم',
          items: [
            { text: 'نظرة عامة', link: '/raqeem/' },
            { text: 'الابتكارات', link: '/raqeem/innovations' },
            { text: 'إدارة الذاكرة', link: '/raqeem/memory' },
            { text: 'نظام الأنواع', link: '/raqeem/types' }
          ]
        }
      ],

      '/kanz/': [
        {
          text: 'Kanz DB',
          items: [
            { text: 'نظرة عامة', link: '/kanz/' },
          ]
        }
      ],


    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/enki-core' }
    ],

    docFooter: {
      prev: 'الصفحة السابقة',
      next: 'الصفحة التالية'
    },

    outlineTitle: 'في هذه الصفحة',
    returnToTopLabel: 'العودة للأعلى',
    sidebarMenuLabel: 'القائمة الجانبية',
    darkModeSwitchLabel: 'تغيير المظهر',
    
    footer: {
      message: 'جميع الحقوق محفوظة © 2026 RVLB',
      copyright: 'تم البناء بواسطة VitePress'
    },

    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: 'بحث',
                buttonAriaLabel: 'بحث'
              },
              modal: {
                noResultsText: 'لا توجد نتائج لـ',
                resetButtonTitle: 'مسح البحث',
                footer: {
                  selectText: 'للاختيار',
                  navigateText: 'للتنقل',
                  closeText: 'للإغلاق'
                }
              }
            }
          }
        }
      }
    }
  }
})
