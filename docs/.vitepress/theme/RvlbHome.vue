<script setup>
import { ref, computed } from 'vue'

const activeFilter = ref('all')

const filters = [
  { id: 'all',      label: 'الكل',              icon: '◈' },
  { id: 'os',       label: 'أنظمة التشغيل',   icon: '🏰' },
  { id: 'ai',       label: 'ذكاء اصطناعي',    icon: '🧬' },
  { id: 'core',     label: 'تقنيات أساسية',   icon: '⚡' },
  { id: 'android',  label: 'تطبيقات أندرويد', icon: '📱' },
]

const projects = [
  { href: '/hisn/',    icon: '🏰', name: 'Hisn-seL4',  label: 'نظام التشغيل الآمن',       desc: 'نظام تشغيل مُثبت رياضياً — بُني على نواة seL4 بعزل تام على مستوى الـ Capability', color: '#f59e0b', tag: 'KERNEL · RUST',      num: '01', cat: 'os'     },
  { href: '/shenn/',   icon: '🧬', name: 'SHENN-ai',   label: 'الشبكة العصبية التطورية', desc: 'شبكة عصبية ذاتية الشفاء — تنمو وتنقسم وتحمي نفسها تلقائياً بدون تدخل بشري',    color: '#a855f7', tag: 'AI · NEURAL',       num: '02', cat: 'ai'     },
  { href: '/raqeem/',  icon: '⚡',  name: 'Raqeem',     label: 'لغة البرمجة',             desc: 'لغة برمجة حديثة بمترجمها الخاص — آمنة، سريعة، مع Pipeline كمواطن درجة أولى',      color: '#0ea5e9', tag: 'LANG · COMPILER',   num: '03', cat: 'core'   },
  { href: '/kanz/',    icon: '🗄️', name: 'Kanz DB',    label: 'محرك قاعدة البيانات',     desc: 'قاعدة بيانات من الصفر — مصممة للسرعة القصوى والأمان التام في البيئات الحساسة',  color: '#22c55e', tag: 'DATABASE · ENGINE', num: '04', cat: 'core'   },
  { href: '/watad/',   icon: '🕸️', name: 'Watad',      label: 'محرك الويب',               desc: 'محرك ويب مبني بـ Rust — تركيبي وقابل للاستبدال كلياً، مصمم للبيئات الآمنة مثل Hisn-seL4',   color: '#38bdf8', tag: 'WEB ENGINE · RUST',  num: '05', cat: 'core'   },
  { href: '#',         icon: '📱', name: 'RVLB Android',label: 'تطبيقات الموبايل',         desc: 'تطبيقات أندرويد مبنية فوق نفس مبادئ RVLB — أمان، خفيفة، بلا متطلبات غير ضرورية',              color: '#ec4899', tag: 'ANDROID · MOBILE',  num: '06', cat: 'android' },
]

const visible = computed(() =>
  activeFilter.value === 'all'
    ? projects
    : projects.filter(p => p.cat === activeFilter.value)
)
</script>

<template>
  <div class="rh-wrap">

    <!-- Ambient background -->
    <div class="rh-bg">
      <div class="rh-orb rh-orb-1"></div>
      <div class="rh-orb rh-orb-2"></div>
      <div class="rh-grid-lines"></div>
      <div class="rh-vignette"></div>
    </div>

    <!-- Content -->
    <div class="rh-content">

      <!-- ── HERO ── -->
      <div class="rh-hero">
        <a href="/concepts/" class="rh-eyebrow rh-concepts-eyebrow">
          <span class="rh-live-dot" style="background: #facc15; box-shadow: 0 0 8px #facc15;"></span>
          <span>المفاهيم المتنوعة</span>
        </a>

        <div class="rh-brand">
          <span class="rh-brand-line">
            <span class="rh-brand-r">R</span><span class="rh-brand-rest">VLB</span>
          </span>
          <span class="rh-brand-slash">/</span>
          <span class="rh-brand-docs">Docs</span>
        </div>

        <p class="rh-tagline">
          المرجع التقني الكامل لمنظومة RVLB
          <span class="rh-tagline-muted"> — من نواة النظام إلى الذكاء الاصطناعي</span>
        </p>

        <div class="rh-actions">
          <a href="/hisn/" class="rh-btn-primary">
            <span class="rh-btn-icon">🏰</span>
            <span>ابدأ بـ Hisn-seL4</span>
            <span class="rh-btn-arrow">←</span>
          </a>
          <a href="https://rvlb.org" target="_blank" rel="noopener" class="rh-btn-ghost">
            <span>rvlb.org</span>
            <span class="rh-btn-ext">↗</span>
          </a>
        </div>
      </div>

      <!-- ── PROJECTS ── -->
      <!-- Filter tabs -->
      <div class="rh-filters">
        <button
          v-for="f in filters"
          :key="f.id"
          :class="['rh-filter', { active: activeFilter === f.id }]"
          @click="activeFilter = f.id"
        >
          <span class="rf-icon">{{ f.icon }}</span>
          <span>{{ f.label }}</span>
        </button>
      </div>

      <div class="rh-cards">
        <a
          v-for="p in visible"
          :key="p.href"
          :href="p.href"
          class="rh-card"
          :style="{ '--c': p.color }"
        >
          <div class="rh-card-glow"></div>

          <div class="rh-card-left">
            <span class="rh-card-num">{{ p.num }}</span>
            <div class="rh-card-icon">{{ p.icon }}</div>
          </div>

          <div class="rh-card-mid">
            <div class="rh-card-tag">{{ p.tag }}</div>
            <h2 class="rh-card-name">{{ p.name }}</h2>
            <p class="rh-card-label">{{ p.label }}</p>
            <p class="rh-card-desc">{{ p.desc }}</p>
          </div>

          <div class="rh-card-right">
            <span class="rh-card-cta">←</span>
          </div>
        </a>
      </div>



    </div>
  </div>
</template>



<style scoped>
/* ── Root ── */
.rh-wrap {
  position: relative;
  min-height: 100vh;
  overflow-x: hidden;
  font-family: 'Cairo', 'Inter', sans-serif;
}

/* ── Background ── */
.rh-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}
.rh-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
}
.rh-orb-1 {
  width: 800px; height: 800px;
  background: radial-gradient(circle, rgba(245,158,11,0.09), transparent 65%);
  top: -300px; right: -200px;
  animation: orbMove 18s ease-in-out infinite alternate;
}
.rh-orb-2 {
  width: 600px; height: 600px;
  background: radial-gradient(circle, rgba(168,85,247,0.07), transparent 65%);
  bottom: -200px; left: -100px;
  animation: orbMove 24s ease-in-out infinite alternate-reverse;
}
@keyframes orbMove {
  from { transform: translate(0, 0); }
  to   { transform: translate(30px, -40px); }
}
.rh-grid-lines {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px);
  background-size: 80px 80px;
}
.rh-vignette {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 50% 0%, transparent 40%, rgba(0,0,0,0.5) 100%);
}

/* ── Content ── */
.rh-content {
  position: relative;
  z-index: 1;
  max-width: 900px;
  margin: 0 auto;
  padding: calc(var(--vp-nav-height) + 3rem) 2rem 8rem;
}

/* ── Hero ── */
.rh-hero {
  text-align: center;
  margin-bottom: 6rem;
}

.rh-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 0.15em;
  color: rgba(250,204,21,0.85); /* Much brighter yellow */
  background: rgba(250,204,21,0.08); /* Slight background tint */
  border: 1px solid rgba(250,204,21,0.25); /* More visible border */
  border-radius: 100px;
  padding: 0.5rem 1.3rem; /* Slightly larger padding */
  margin-bottom: 2.5rem;
  text-decoration: none !important;
  box-shadow: 0 0 15px rgba(250,204,21,0.05); /* Soft outer glow */
  transition: all 0.3s;
}
.rh-concepts-eyebrow:hover {
  background: rgba(250, 204, 21, 0.05);
  border-color: rgba(250, 204, 21, 0.3);
  color: #facc15 !important;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(250, 204, 21, 0.1);
}
.rh-live-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  animation: blink 2.5s ease-in-out infinite;
}
@keyframes blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.3; }
}

/* Brand logotype */
.rh-brand {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 0.2em;
  margin-bottom: 1.5rem;
  line-height: 1;
  font-weight: 900;
  letter-spacing: -0.04em;
}
.rh-brand-line {
  font-size: clamp(3.5rem, 9vw, 7rem);
}
.rh-brand-r {
  background: linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.rh-brand-rest {
  background: linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.7) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.rh-brand-slash {
  font-size: clamp(2rem, 5vw, 4rem);
  color: rgba(255,255,255,0.1);
  font-weight: 300;
  margin: 0 0.1em;
}
.rh-brand-docs {
  font-size: clamp(1.5rem, 4vw, 3rem);
  color: rgba(255,255,255,0.18);
  font-weight: 400;
  letter-spacing: 0.05em;
}

/* Tagline */
.rh-tagline {
  font-size: 1.05rem;
  color: rgba(255,255,255,0.55);
  margin: 0 0 2.5rem;
  line-height: 1.6;
}
.rh-tagline-muted { color: rgba(255,255,255,0.3); }

/* CTA */
.rh-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.rh-btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  padding: 0.85rem 1.8rem;
  background: linear-gradient(135deg, #f59e0b 0%, #f97316 100%);
  color: #000 !important;
  text-decoration: none !important;
  border-radius: 12px;
  font-weight: 800;
  font-size: 0.95rem;
  box-shadow: 0 6px 24px rgba(245,158,11,0.3);
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s;
}
.rh-btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 36px rgba(245,158,11,0.45);
}
.rh-btn-icon { font-size: 1rem; }
.rh-btn-arrow { opacity: 0.7; }

.rh-btn-ghost {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.85rem 1.8rem;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.1);
  color: rgba(255,255,255,0.6) !important;
  text-decoration: none !important;
  border-radius: 12px;
  font-weight: 700;
  font-size: 0.95rem;
  transition: all 0.25s;
}
.rh-btn-ghost:hover {
  background: rgba(255,255,255,0.08);
  border-color: rgba(255,255,255,0.18);
  color: #fff !important;
}
.rh-btn-ext { font-size: 0.8rem; opacity: 0.5; }

/* ── Section separator ── */
.rh-section-head {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  margin-bottom: 2rem;
}
.rh-sep-line {
  flex: 1;
  height: 1px;
  background: rgba(255,255,255,0.06);
}
.rh-sep-label {
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 0.2em;
  color: rgba(255,255,255,0.2);
}

/* ── Filter tabs ── */
.rh-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}
.rh-filter {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.45rem 1rem;
  border-radius: 100px;
  border: 1px solid rgba(255,255,255,0.08);
  background: rgba(255,255,255,0.03);
  color: rgba(255,255,255,0.4);
  font-size: 0.8rem;
  font-weight: 700;
  font-family: 'Cairo', sans-serif;
  cursor: pointer;
  transition: all 0.25s;
}
.rh-filter:hover {
  border-color: rgba(255,255,255,0.15);
  color: rgba(255,255,255,0.7);
  background: rgba(255,255,255,0.06);
}
.rh-filter.active {
  border-color: #f59e0b;
  background: rgba(245,158,11,0.12);
  color: #fbbf24;
}
.rf-icon { font-size: 0.9rem; }

/* ── Cards container ── */
.rh-cards-inner {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

/* Transition animation */
.card-fade-enter-active,
.card-fade-leave-active { transition: all 0.3s ease; }
.card-fade-enter-from,
.card-fade-leave-to  { opacity: 0; transform: translateY(8px); }

/* ── Cards (horizontal list) ── */
.rh-cards {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.rh-card {
  position: relative;
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 1.5rem 2rem;
  border-radius: 18px;
  background: rgba(255,255,255,0.025);
  border: 1px solid rgba(255,255,255,0.06);
  text-decoration: none !important;
  color: #fff !important;
  overflow: hidden;
  direction: ltr;
  transition:
    transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1),
    border-color 0.3s,
    box-shadow 0.35s;
}
.rh-card:hover {
  transform: translateX(6px);
  border-color: color-mix(in srgb, var(--c) 30%, transparent);
  box-shadow:
    -6px 0 0 color-mix(in srgb, var(--c) 25%, transparent),
    0 8px 40px -10px color-mix(in srgb, var(--c) 20%, transparent);
}

/* Right glow (visual right in LTR card) */
.rh-card-glow {
  position: absolute;
  top: 0; right: 0; bottom: 0;
  width: 40%;
  background: radial-gradient(ellipse at 100% 50%, color-mix(in srgb, var(--c) 12%, transparent) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.4s;
  pointer-events: none;
}
.rh-card:hover .rh-card-glow { opacity: 1; }

/* Left column */
.rh-card-left {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
  width: 56px;
}
.rh-card-num {
  font-size: 0.6rem;
  font-weight: 900;
  letter-spacing: 0.1em;
  color: rgba(255,255,255,0.15);
  font-variant-numeric: tabular-nums;
}
.rh-card-icon {
  font-size: 2.2rem;
  line-height: 1;
  filter: drop-shadow(0 2px 12px color-mix(in srgb, var(--c) 50%, transparent));
  transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.rh-card:hover .rh-card-icon { transform: scale(1.18) rotate(-8deg); }

/* Mid content */
.rh-card-mid {
  flex: 1;
  min-width: 0;
  text-align: right;
}
.rh-card-tag {
  font-size: 0.58rem;
  font-weight: 800;
  letter-spacing: 0.18em;
  color: var(--c);
  opacity: 0.8;
  margin-bottom: 0.3rem;
}
.rh-card-name {
  font-size: 1.4rem;
  font-weight: 900;
  letter-spacing: -0.02em;
  margin: 0 0 0.1rem;
  border: none;
  padding: 0;
  line-height: 1.2;
  color: #fff;
}
.rh-card-label {
  font-size: 0.75rem;
  color: rgba(255,255,255,0.3);
  margin: 0 0 0.5rem;
}
.rh-card-desc {
  font-size: 0.84rem;
  color: rgba(255,255,255,0.35);
  margin: 0;
  line-height: 1.65;
  transition: color 0.3s;
}
.rh-card:hover .rh-card-desc { color: rgba(255,255,255,0.6); }

/* Right arrow */
.rh-card-right { flex-shrink: 0; }
.rh-card-cta {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px; height: 40px;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.08);
  font-size: 1.1rem;
  color: rgba(255,255,255,0.2);
  transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.rh-card:hover .rh-card-cta {
  background: color-mix(in srgb, var(--c) 15%, transparent);
  border-color: var(--c);
  color: var(--c);
  transform: scale(1.1) translateX(-4px);
}

@media (max-width: 560px) {
  .rh-card { flex-wrap: wrap; padding: 1.25rem; }
  .rh-card-right { display: none; }
  .rh-content { padding: 4rem 1.25rem 6rem; }
}


</style>
