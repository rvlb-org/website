<script setup>
import { ref } from 'vue'

const activeCategory = ref('all')

const categories = [
  { id: 'all',         label: 'الكل',               color: '#94a3b8' },
  { id: 'general',     label: 'أنظمة عامة',          color: '#64748b' },
  { id: 'legacy',      label: 'كلاسيكي / تاريخي',   color: '#d97706' },
  { id: 'privacy',     label: 'الخصوصية',            color: '#0ea5e9' },
  { id: 'microkernel', label: 'Microkernel',          color: '#a855f7' },
  { id: 'embedded',    label: 'مدمجة',               color: '#f59e0b' },
  { id: 'military',    label: 'عسكري / حرج',         color: '#ef4444' },
]

const osList = [
  { id: '01_linux',      icon: '🐧', name: 'Linux',          cat: 'general'     },
  { id: '02_windows',    icon: '🪟', name: 'Windows',        cat: 'general'     },
  { id: '03_macos',      icon: '🍎', name: 'macOS',          cat: 'general'     },
  { id: '04_freebsd',    icon: '🐡', name: 'FreeBSD',        cat: 'general'     },
  { id: '05_openbsd',    icon: '🟡', name: 'OpenBSD',        cat: 'general'     },
  { id: '06_chromeos',   icon: '🌐', name: 'ChromeOS',       cat: 'general'     },
  { id: '07_unix',       icon: '🏛️', name: 'UNIX',           cat: 'general'     },
  { id: '08_talos',      icon: '🐳', name: 'Talos Linux',    cat: 'general'     },
  { id: '09_reactos',    icon: '⚛️', name: 'ReactOS',        cat: 'general'     },
  { id: '10_maestro',    icon: '🎼', name: 'Maestro OS',     cat: 'general'     },
  { id: '11_osv',        icon: '🌩️', name: 'OSv',            cat: 'general'     },
  { id: '12_mirageos',   icon: '🏜️', name: 'MirageOS',       cat: 'general'     },
  { id: '13_amigaos',    icon: '🖱️', name: 'AmigaOS',        cat: 'legacy'      },
  { id: '14_os2',        icon: '🖥️', name: 'OS/2',           cat: 'legacy'      },
  { id: '15_haiku',      icon: '🌸', name: 'Haiku OS',       cat: 'legacy'      },
  { id: '16_minix',      icon: '🕵️', name: 'MINIX',          cat: 'legacy'      },
  { id: '17_vms',        icon: '🏛️', name: 'OpenVMS',        cat: 'legacy'      },
  { id: '18_zos',        icon: '🏦', name: 'IBM z/OS',       cat: 'legacy'      },
  { id: '19_plan9',      icon: '👽', name: 'Plan 9',         cat: 'legacy'      },
  { id: '20_phantom',    icon: '♾️', name: 'Phantom OS',     cat: 'legacy'      },
  { id: '21_nemesis',    icon: '🗡️', name: 'Nemesis',        cat: 'legacy'      },
  { id: '22_exokernel',  icon: '🎓', name: 'MIT Exokernel',  cat: 'legacy'      },
  { id: '23_theseus',    icon: '🚢', name: 'Theseus OS',     cat: 'legacy'      },
  { id: '24_tails',      icon: '👻', name: 'Tails OS',       cat: 'privacy'     },
  { id: '25_qubes',      icon: '🧊', name: 'Qubes OS',       cat: 'privacy'     },
  { id: '26_muen',       icon: '🦅', name: 'Muen SK',        cat: 'microkernel' },
  { id: '27_sculpt',     icon: '🗿', name: 'Sculpt OS',      cat: 'microkernel' },
  { id: '28_redox',      icon: '🦀', name: 'Redox OS',       cat: 'microkernel' },
  { id: '29_lionsos',    icon: '🦁', name: 'LionsOS',        cat: 'microkernel' },
  { id: '30_cantrip',    icon: '🧬', name: 'Cantrip OS',     cat: 'microkernel' },
  { id: '31_sel4cp',     icon: '🧱', name: 'seL4CP',         cat: 'microkernel' },
  { id: '32_helenos',    icon: '🧩', name: 'HelenOS',        cat: 'microkernel' },
  { id: '33_barrelfish', icon: '🐟', name: 'Barrelfish',     cat: 'microkernel' },
  { id: '34_fuchsia',    icon: '🌺', name: 'Fuchsia OS',     cat: 'microkernel' },
  { id: '35_asterinas',  icon: '🌟', name: 'Asterinas',      cat: 'microkernel' },
  { id: '36_hubris',     icon: '⚙️', name: 'Hubris OS',      cat: 'embedded'    },
  { id: '37_qnx',        icon: '🚗', name: 'QNX',            cat: 'embedded'    },
  { id: '38_kaios',      icon: '📱', name: 'KaiOS',          cat: 'embedded'    },
  { id: '39_camkes',     icon: '🐪', name: 'CAmkES ARM VM',  cat: 'embedded'    },
  { id: '40_military',   icon: '🛡️', name: 'CDS / DARPA',   cat: 'military'    },
  { id: '41_integrity',  icon: '✈️', name: 'INTEGRITY',      cat: 'military'    },
  { id: '42_crossos',    icon: '🚁', name: 'CrossOS',        cat: 'military'    },
  { id: '43_icecap',     icon: '🏔️', name: 'IceCap',         cat: 'military'    },
  { id: '44_tetheros',   icon: '🛸', name: 'Tether OS',      cat: 'military'    },
]

const catColor = (catId) => categories.find(c => c.id === catId)?.color ?? '#64748b'

const filtered = () =>
  activeCategory.value === 'all'
    ? osList
    : osList.filter(o => o.cat === activeCategory.value)
</script>

<template>
  <div class="cmp-hub">

    <!-- Header -->
    <div class="cmp-header">
      <div class="cmp-header__icon">⚔️</div>
      <div>
        <h2 class="cmp-header__title">ماذا يميزنا؟</h2>
        <p class="cmp-header__sub">مقارنة معمارية دقيقة مع <strong>{{ osList.length }} نظام تشغيل</strong> — اختر أي نظام لترى كيف يتفوق Hisn-seL4</p>
      </div>
    </div>

    <!-- Category Filter -->
    <div class="cmp-filters">
      <button
        v-for="cat in categories"
        :key="cat.id"
        :class="['cmp-filter', { active: activeCategory === cat.id }]"
        :style="{ '--c': cat.color }"
        @click="activeCategory = cat.id"
      >
        {{ cat.label }}
      </button>
    </div>

    <!-- OS Grid -->
    <div class="cmp-grid">
      <a
        v-for="os in filtered()"
        :key="os.id"
        :href="`/hisn/comparisons/${os.id}`"
        class="cmp-card"
        :style="{ '--c': catColor(os.cat) }"
      >
        <div class="cmp-card__glow"></div>
        <span class="cmp-card__icon">{{ os.icon }}</span>
        <span class="cmp-card__name">{{ os.name }}</span>
        <span class="cmp-card__arrow">←</span>
      </a>
    </div>

    <!-- Legal -->
    <p class="cmp-legal">* جميع الأسماء والعلامات التجارية ملك لأصحابها — التحليل لأغراض أكاديمية ومقارنة هندسية فقط.</p>

  </div>
</template>

<style scoped>
.cmp-hub {
  font-family: 'Cairo', sans-serif;
  margin: 0 0 3rem;
}

/* ── Header ── */
.cmp-header {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255,255,255,0.07);
}

.cmp-header__icon {
  font-size: 2.8rem;
  line-height: 1;
  flex-shrink: 0;
}

.cmp-header__title {
  margin: 0 0 0.25rem;
  font-size: 1.8rem;
  font-weight: 900;
  background: linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.65) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  border: none;
  padding: 0;
}

.cmp-header__sub {
  margin: 0;
  font-size: 0.9rem;
  color: rgba(255,255,255,0.45);
  line-height: 1.6;
}
.cmp-header__sub strong { color: rgba(255,255,255,0.75); }

/* ── Filters ── */
.cmp-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.8rem;
}

.cmp-filter {
  padding: 0.35rem 1rem;
  border-radius: 100px;
  border: 1px solid rgba(255,255,255,0.1);
  background: rgba(255,255,255,0.04);
  color: rgba(255,255,255,0.5);
  font-size: 0.8rem;
  font-weight: 600;
  font-family: 'Cairo', sans-serif;
  cursor: pointer;
  transition: all 0.25s ease;
}

.cmp-filter:hover {
  border-color: var(--c);
  color: var(--c);
  background: rgba(255,255,255,0.07);
}

.cmp-filter.active {
  border-color: var(--c);
  background: color-mix(in srgb, var(--c) 15%, transparent);
  color: var(--c);
}

/* ── Grid ── */
.cmp-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 0.75rem;
}

@media (max-width: 600px) {
  .cmp-grid { grid-template-columns: repeat(2, 1fr); }
}

/* ── OS Card ── */
.cmp-card {
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.85rem 1rem;
  border-radius: 14px;
  border: 1px solid rgba(255,255,255,0.07);
  background: rgba(255,255,255,0.03);
  text-decoration: none !important;
  color: rgba(255,255,255,0.7) !important;
  font-size: 0.88rem;
  font-weight: 600;
  transition:
    transform 0.3s cubic-bezier(0.22,1,0.36,1),
    border-color 0.3s,
    background 0.3s,
    color 0.3s;
}

.cmp-card:hover {
  transform: translateY(-3px);
  border-color: color-mix(in srgb, var(--c) 50%, transparent);
  background: color-mix(in srgb, var(--c) 10%, transparent);
  color: #fff !important;
}

.cmp-card__glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 0% 50%, var(--c) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.3s;
  pointer-events: none;
}
.cmp-card:hover .cmp-card__glow { opacity: 0.12; }

.cmp-card__icon {
  font-size: 1.3rem;
  line-height: 1;
  flex-shrink: 0;
}

.cmp-card__name {
  flex: 1;
}

.cmp-card__arrow {
  font-size: 0.85rem;
  color: rgba(255,255,255,0.25);
  transition: transform 0.3s, color 0.3s;
  flex-shrink: 0;
}
.cmp-card:hover .cmp-card__arrow {
  transform: translateX(-4px);
  color: var(--c);
}

/* ── Legal ── */
.cmp-legal {
  margin-top: 2rem;
  font-size: 0.75rem;
  color: rgba(255,255,255,0.2);
  text-align: center;
}
</style>
