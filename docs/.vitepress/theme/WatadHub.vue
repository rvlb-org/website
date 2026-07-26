<script setup>
// Watad Web Engine — Hub Page
// Same premium design language as MainHub.vue (Hisn)
import WatadMilestonesStrip from './WatadMilestonesStrip.vue'

const modules = [
  {
    href: '/watad/net/',
    icon: '🌐',
    label: 'الشبكات',
    sub: 'watad-net',
    desc: 'طبقة جلب الموارد — مصممة للتواصل مع Net_Vault في حصن بدلاً من الاتصال المباشر بالإنترنت',
    color: '#38bdf8',
    glyph: '◈',
    status: 'planned'
  },
  {
    href: '/watad/dom/',
    icon: '🌳',
    label: 'محلل المستندات',
    sub: 'watad-dom',
    desc: 'قارئ HTML مبني من الصفر — يحوّل الكود النصي إلى شجرة DOM أمنة وخفيفة',
    color: '#34d399',
    glyph: '✦',
    status: 'planned'
  },
  {
    href: '/watad/js/',
    icon: '⚙️',
    label: 'محرك الجافاسكريبت',
    sub: 'watad-js',
    desc: 'جسر قابل للتبديل — يربط محركات JS الخارجية أو المخصصة بنواة وتد عبر واجهة موحدة',
    color: '#a78bfa',
    glyph: '◉',
    status: 'planned'
  },
  {
    href: '/watad/render/',
    icon: '🎨',
    label: 'محرك الرسم',
    sub: 'watad-render',
    desc: 'يحوّل شجرة العناصر إلى بيكسلات — يدعم Vulkan وSoftware Renderer للبيئات المعزولة',
    color: '#f472b6',
    glyph: '◐',
    status: 'planned'
  },
]

const principles = [
  { icon: '🦀', title: 'Rust أولاً', desc: 'بناء بالكامل بـ Rust — صفر تسريبات ذاكرة بضمان المترجم', color: '#f97316' },
  { icon: '🧩', title: 'تركيبي كلياً', desc: 'كل قطعة قابلة للاستبدال — مثل لينكس تماماً لكن لمحركات الويب', color: '#38bdf8' },
  { icon: '🔐', title: 'معزول بالكامل', desc: 'كل مكون في عملية منفصلة — لا تواصل إلا عبر رسائل مشفرة عبر Net_Vault', color: '#34d399' },
  { icon: '🏰', title: 'مبني لـ Hisn', desc: 'أول محرك ويب مصمم أصلاً ليعمل فوق نواة seL4 مثبتة رياضياً — ويعمل على كل الأنظمة', color: '#f59e0b' },
]

const directories = [
  { href: '/watad/net/',    icon: '🌐', label: 'watad-net',    sub: 'Networking',       desc: 'طبقة الشبكات — تجلب الموارد وتتواصل مع Net_Vault في حصن أو TCP مباشرة في بقية الأنظمة', color: '#38bdf8', glyph: '◈' },
  { href: '/watad/dom/',    icon: '🌳', label: 'watad-dom',    sub: 'DOM Parser',       desc: 'محلل HTML مبني من الصفر — يحوّل الكود النصي إلى شجرة DOM آمنة وخفيفة بدون تبعيات', color: '#34d399', glyph: '✦' },
  { href: '/watad/js/',     icon: '⚙️', label: 'watad-js',     sub: 'JS Bridge',        desc: 'جسر محركات الجافاسكريبت — يوفر واجهة موحدة تتيح تبديل المحرك دون لمس بقية النواة', color: '#a78bfa', glyph: '◉' },
  { href: '/watad/render/', icon: '🎨', label: 'watad-render', sub: 'Renderer',         desc: 'محرك الرسم — يحوّل شجرة العناصر لبيكسلات ويدعم Vulkan و Software Renderer للبيئات المعزولة', color: '#f472b6', glyph: '◐' },
  { href: '/watad/backends/', icon: '🧩', label: 'backends',  sub: 'Platform Backends', desc: 'طبقة التوافق مع الأنظمة — تحتوي backend خاص لحصن (no_std) وآخر عادي للينكس وويندوز', color: '#f59e0b', glyph: '◇' },
]
</script>

<template>
  <div class="wt-root">

    <!-- Ambient orbs -->
    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>
    <div class="orb orb-3"></div>
    <div class="grid-noise"></div>

    <!-- ── HERO ── -->
    <header class="wt-hero">
      <div class="wt-badge">
        <span class="badge-dot"></span>
        <span>WATAD WEB ENGINE</span>
      </div>

      <div class="wt-icon-wrap">
        <span class="wt-icon-ring ring-1"></span>
        <span class="wt-icon-ring ring-2"></span>
        <span class="wt-main-icon">🕸️</span>
      </div>

      <h1 class="wt-title">
        <span class="title-ar">وتد</span>
        <span class="title-dash">—</span>
        <span class="title-en">Watad</span>
      </h1>

      <p class="wt-tagline">لينكس محركات الويب — حر، تركيبي، مبني من الصفر بـ Rust</p>

      <div class="wt-stats">
        <div class="stat-item">
          <span class="stat-num">Rust</span>
          <span class="stat-lbl">Memory Safe</span>
        </div>
        <div class="stat-sep"></div>
        <div class="stat-item">
          <span class="stat-num">4</span>
          <span class="stat-lbl">Modules</span>
        </div>
        <div class="stat-sep"></div>
        <div class="stat-item">
          <span class="stat-num">seL4</span>
          <span class="stat-lbl">Compatible</span>
        </div>
        <div class="stat-sep"></div>
        <div class="stat-item">
          <span class="stat-num">0</span>
          <span class="stat-lbl">Dependencies (Core)</span>
        </div>
      </div>
    </header>

    <!-- ── PRINCIPLES ── -->
    <section class="wt-section">
      <div class="wt-section-head">
        <span class="wt-sep-line"></span>
        <span class="wt-sep-label">CORE PRINCIPLES</span>
        <span class="wt-sep-line"></span>
      </div>
      <div class="wt-principles">
        <div
          v-for="p in principles"
          :key="p.title"
          class="principle-card"
          :style="{ '--c': p.color }"
        >
          <div class="pc-glow"></div>
          <div class="pc-accent"></div>
          <span class="pc-icon">{{ p.icon }}</span>
          <div class="pc-body">
            <h3 class="pc-title">{{ p.title }}</h3>
            <p class="pc-desc">{{ p.desc }}</p>
          </div>
        </div>
      </div>
    </section>


    <!-- ── DIRECTORIES ── -->
    <section class="wt-section">
      <div class="wt-section-head">
        <span class="wt-sep-line"></span>
        <span class="wt-sep-label">DIRECTORIES — المجلدات</span>
        <span class="wt-sep-line"></span>
      </div>
      <div class="wt-dir-grid">
        <a
          v-for="d in directories"
          :key="d.label"
          :href="d.href"
          class="wt-dir-card"
          :style="{ '--c': d.color }"
        >
          <div class="card-glow"></div>
          <div class="card-accent"></div>
          <span class="card-glyph">{{ d.glyph }}</span>
          <div class="card-inner">
            <div class="card-icon">{{ d.icon }}</div>
            <div class="card-text">
              <h3 class="card-title">{{ d.label }}</h3>
              <span class="card-sub">{{ d.sub }}</span>
              <p class="card-desc">{{ d.desc }}</p>
            </div>
          </div>
          <div class="card-footer">
            <span class="card-cta">استكشف ←</span>
            <span class="card-line"></span>
          </div>
        </a>
      </div>
    </section>

    <!-- ── PIPELINE ── -->
    <section class="wt-section">
      <div class="wt-section-head">
        <span class="wt-sep-line"></span>
        <span class="wt-sep-label">HOW IT WORKS — خط التجميع</span>
        <span class="wt-sep-line"></span>
      </div>

      <div class="wt-pipeline">
        <div class="pipe-step">
          <div class="pipe-num">01</div>
          <div class="pipe-icon">🌐</div>
          <div class="pipe-label">watad-net</div>
          <div class="pipe-sub">جلب HTML/CSS/JS</div>
        </div>
        <div class="pipe-arrow">←</div>
        <div class="pipe-step">
          <div class="pipe-num">02</div>
          <div class="pipe-icon">🌳</div>
          <div class="pipe-label">watad-dom</div>
          <div class="pipe-sub">بناء شجرة DOM</div>
        </div>
        <div class="pipe-arrow">←</div>
        <div class="pipe-step">
          <div class="pipe-num">03</div>
          <div class="pipe-icon">⚙️</div>
          <div class="pipe-label">watad-js</div>
          <div class="pipe-sub">تنفيذ JavaScript</div>
        </div>
        <div class="pipe-arrow">←</div>
        <div class="pipe-step">
          <div class="pipe-num">04</div>
          <div class="pipe-icon">🎨</div>
          <div class="pipe-label">watad-render</div>
          <div class="pipe-sub">رسم البيكسلات</div>
        </div>
      </div>
    </section>

    <!-- ── MILESTONES ── -->
    <WatadMilestonesStrip />

  </div>
</template>



<style scoped>
/* ── Root ── */
.wt-root {
  position: relative;
  min-height: calc(100vh - var(--vp-nav-height));
  padding: calc(var(--vp-nav-height) + 2.5rem) 2rem 6rem;
  overflow: hidden;
  font-family: 'Cairo', 'Inter', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* ── Ambient orbs ── */
.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.11;
  pointer-events: none;
  animation: drift 14s ease-in-out infinite alternate;
}
.orb-1 {
  width: 650px; height: 650px;
  background: radial-gradient(circle, #38bdf8, transparent 70%);
  top: -250px; right: -150px;
  animation-delay: 0s;
}
.orb-2 {
  width: 500px; height: 500px;
  background: radial-gradient(circle, #a78bfa, transparent 70%);
  bottom: -100px; left: -100px;
  animation-delay: -6s;
}
.orb-3 {
  width: 350px; height: 350px;
  background: radial-gradient(circle, #34d399, transparent 70%);
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  animation-delay: -10s;
  opacity: 0.05;
}
@keyframes drift {
  from { transform: translate(0, 0) scale(1); }
  to   { transform: translate(40px, 30px) scale(1.08); }
}

/* ── Grid noise ── */
.grid-noise {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
  background-size: 60px 60px;
  pointer-events: none;
}

/* ── Hero ── */
.wt-hero {
  text-align: center;
  margin-bottom: 4.5rem;
  position: relative;
  z-index: 1;
  max-width: 800px;
  width: 100%;
}

.wt-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.2em;
  color: rgba(255,255,255,0.5);
  border: 1px solid rgba(56,189,248,0.2);
  border-radius: 100px;
  padding: 0.35rem 1rem;
  margin-bottom: 2rem;
  backdrop-filter: blur(8px);
  background: rgba(56,189,248,0.04);
}
.badge-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #38bdf8;
  box-shadow: 0 0 8px #38bdf8;
  animation: pulse 2s ease-in-out infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 1; box-shadow: 0 0 6px #38bdf8; }
  50%       { opacity: 0.5; box-shadow: 0 0 14px #38bdf8; }
}

/* Icon wrap */
.wt-icon-wrap {
  position: relative;
  width: 120px;
  height: 120px;
  margin: 0 auto 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.wt-icon-ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.07);
  animation: spin 22s linear infinite;
}
.ring-2 {
  inset: -15px;
  border-color: rgba(56,189,248,0.15);
  border-style: dashed;
  animation-direction: reverse;
  animation-duration: 35s;
}
@keyframes spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
.wt-main-icon {
  font-size: 4rem;
  filter: drop-shadow(0 0 30px rgba(56,189,248,0.5));
  animation: float 4s ease-in-out infinite;
}
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-8px); }
}

/* Title */
.wt-title {
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 900;
  line-height: 1;
  margin: 0 0 1rem;
  border: none;
  padding: 0;
  letter-spacing: -0.03em;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 0.15em;
}
.title-ar {
  background: linear-gradient(135deg, #38bdf8 0%, #7dd3fc 60%, #38bdf8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 0 20px rgba(56,189,248,0.3));
}
.title-dash {
  -webkit-text-fill-color: rgba(255,255,255,0.1);
  font-weight: 300;
}
.title-en {
  background: linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.6) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.wt-tagline {
  font-size: 1.05rem;
  color: rgba(255,255,255,0.4);
  margin: 0 0 2.5rem;
  letter-spacing: 0.02em;
}

/* Stats bar */
.wt-stats {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  padding: 1.2rem 2.5rem;
  background: rgba(56,189,248,0.04);
  border: 1px solid rgba(56,189,248,0.12);
  border-radius: 100px;
  backdrop-filter: blur(10px);
  width: fit-content;
  margin: 0 auto;
}
.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.12rem;
}
.stat-num {
  font-size: 1.05rem;
  font-weight: 900;
  color: #7dd3fc;
  letter-spacing: -0.02em;
}
.stat-lbl {
  font-size: 0.62rem;
  color: rgba(255,255,255,0.3);
  letter-spacing: 0.08em;
  font-weight: 600;
  text-transform: uppercase;
}
.stat-sep {
  width: 1px;
  height: 28px;
  background: rgba(255,255,255,0.07);
}

/* ── Section ── */
.wt-section {
  width: 100%;
  max-width: 1000px;
  position: relative;
  z-index: 1;
  margin-bottom: 3.5rem;
}
.wt-section-head {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  margin-bottom: 2rem;
}
.wt-sep-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(56,189,248,0.35), transparent);
}
.wt-sep-label {
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 0.2em;
  color: rgba(56,189,248,0.55);
  white-space: nowrap;
  border: 1px solid rgba(56,189,248,0.15);
  padding: 0.25rem 0.85rem;
  border-radius: 100px;
  background: rgba(56,189,248,0.04);
}

/* ── Principles ── */
.wt-principles {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}
@media (max-width: 640px) {
  .wt-principles { grid-template-columns: 1fr; }
}

.principle-card {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 16px;
  overflow: hidden;
  transition: border-color 0.3s, transform 0.3s;
}
.principle-card:hover {
  border-color: color-mix(in srgb, var(--c) 30%, transparent);
  transform: translateY(-3px);
}
.pc-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 0% 100%, color-mix(in srgb, var(--c) 12%, transparent) 0%, transparent 65%);
  opacity: 0;
  transition: opacity 0.4s;
  pointer-events: none;
}
.principle-card:hover .pc-glow { opacity: 1; }
.pc-accent {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--c), transparent);
  opacity: 0;
  transition: opacity 0.3s;
}
.principle-card:hover .pc-accent { opacity: 1; }
.pc-icon {
  font-size: 2rem;
  line-height: 1;
  flex-shrink: 0;
  filter: drop-shadow(0 2px 8px color-mix(in srgb, var(--c) 40%, transparent));
  transition: transform 0.3s;
}
.principle-card:hover .pc-icon { transform: scale(1.15) rotate(-6deg); }
.pc-title {
  font-size: 1rem;
  font-weight: 800;
  color: #fff;
  margin: 0 0 0.3rem;
  border: none;
  padding: 0;
}
.pc-desc {
  font-size: 0.82rem;
  color: rgba(255,255,255,0.38);
  margin: 0;
  line-height: 1.6;
  transition: color 0.3s;
}
.principle-card:hover .pc-desc { color: rgba(255,255,255,0.6); }

/* ── Modules grid ── */
.wt-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
}
@media (max-width: 700px) {
  .wt-grid { grid-template-columns: 1fr; }
}

.wt-card {
  position: relative;
  border-radius: 20px;
  background: rgba(255,255,255,0.025);
  border: 1px solid rgba(255,255,255,0.06);
  overflow: hidden;
  text-decoration: none !important;
  color: #fff !important;
  display: flex;
  flex-direction: column;
  padding: 1.75rem;
  gap: 1.25rem;
  transition:
    transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
    border-color 0.3s,
    box-shadow 0.4s;
}
.wt-card:hover {
  transform: translateY(-6px) scale(1.02);
  border-color: color-mix(in srgb, var(--c) 40%, transparent);
  box-shadow:
    0 20px 60px -20px color-mix(in srgb, var(--c) 40%, transparent),
    inset 0 1px 0 color-mix(in srgb, var(--c) 20%, transparent);
}

.card-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 50% 100%, color-mix(in srgb, var(--c) 18%, transparent) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.5s;
  pointer-events: none;
}
.wt-card:hover .card-glow { opacity: 1; }

.card-accent {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent 0%, var(--c) 30%, color-mix(in srgb, var(--c) 60%, #fff) 50%, var(--c) 70%, transparent 100%);
  opacity: 0;
  transition: opacity 0.3s;
}
.wt-card:hover .card-accent { opacity: 1; }

.card-glyph {
  position: absolute;
  top: 1rem;
  left: 1rem;
  font-size: 0.75rem;
  color: color-mix(in srgb, var(--c) 35%, transparent);
  font-weight: 900;
  transition: color 0.3s;
}
.wt-card:hover .card-glyph { color: color-mix(in srgb, var(--c) 65%, transparent); }

.card-status {
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 0.6rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  padding: 0.2rem 0.65rem;
  border-radius: 100px;
}
.card-status.planned {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.1);
  color: rgba(255,255,255,0.25);
}
.card-status.wip {
  background: rgba(56,189,248,0.1);
  border: 1px solid rgba(56,189,248,0.25);
  color: #7dd3fc;
}

.card-inner {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}
.card-icon {
  font-size: 2.5rem;
  line-height: 1;
  flex-shrink: 0;
  filter: drop-shadow(0 4px 12px color-mix(in srgb, var(--c) 40%, transparent));
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.wt-card:hover .card-icon {
  transform: scale(1.2) rotate(-8deg);
  filter: drop-shadow(0 6px 20px color-mix(in srgb, var(--c) 60%, transparent));
}

.card-text { flex: 1; }
.card-title {
  font-size: 1.25rem;
  font-weight: 900;
  margin: 0 0 0.15rem;
  color: #fff;
  border: none;
  padding: 0;
  line-height: 1.2;
}
.card-sub {
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: var(--c);
  opacity: 0.8;
  font-family: 'Space Mono', monospace;
}
.card-desc {
  font-size: 0.82rem;
  color: rgba(255,255,255,0.38);
  margin: 0.5rem 0 0;
  line-height: 1.6;
  transition: color 0.3s;
}
.wt-card:hover .card-desc { color: rgba(255,255,255,0.6); }

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}
.card-cta {
  font-size: 0.85rem;
  font-weight: 700;
  color: rgba(255,255,255,0.2);
  transition: color 0.3s, transform 0.3s;
}
.wt-card:hover .card-cta {
  color: var(--c);
  transform: translateX(-4px);
}
.card-line {
  flex: 1;
  height: 1px;
  background: rgba(255,255,255,0.04);
  transition: background 0.3s;
}
.wt-card:hover .card-line { background: color-mix(in srgb, var(--c) 20%, transparent); }

/* ── Pipeline ── */
.wt-pipeline {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 2rem;
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 20px;
}

.pipe-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  padding: 1.25rem 1.5rem;
  background: rgba(56,189,248,0.05);
  border: 1px solid rgba(56,189,248,0.12);
  border-radius: 14px;
  min-width: 120px;
  transition: border-color 0.3s, transform 0.3s;
}
.pipe-step:hover {
  border-color: rgba(56,189,248,0.3);
  transform: translateY(-4px);
}
.pipe-num {
  font-size: 0.6rem;
  font-weight: 900;
  letter-spacing: 0.15em;
  color: rgba(56,189,248,0.4);
}
.pipe-icon { font-size: 1.8rem; }
.pipe-label {
  font-size: 0.78rem;
  font-weight: 800;
  color: #7dd3fc;
  font-family: 'Space Mono', monospace;
}
.pipe-sub {
  font-size: 0.72rem;
  color: rgba(255,255,255,0.3);
}

.pipe-arrow {
  font-size: 1.5rem;
  color: rgba(56,189,248,0.25);
  font-weight: 300;
  flex-shrink: 0;
}

@media (max-width: 700px) {
  .wt-pipeline { flex-direction: column; }
  .pipe-arrow { transform: rotate(90deg); }
}

/* ── Directories grid ── */
.wt-dir-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}
@media (max-width: 900px) {
  .wt-dir-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 560px) {
  .wt-dir-grid { grid-template-columns: 1fr; }
}

.wt-dir-card {
  position: relative;
  border-radius: 20px;
  background: rgba(255,255,255,0.025);
  border: 1px solid rgba(255,255,255,0.06);
  overflow: hidden;
  text-decoration: none !important;
  color: #fff !important;
  display: flex;
  flex-direction: column;
  padding: 1.75rem;
  gap: 1.25rem;
  transition:
    transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
    border-color 0.3s,
    box-shadow 0.4s;
}
.wt-dir-card:hover {
  transform: translateY(-6px) scale(1.02);
  border-color: color-mix(in srgb, var(--c) 40%, transparent);
  box-shadow:
    0 20px 60px -20px color-mix(in srgb, var(--c) 40%, transparent),
    inset 0 1px 0 color-mix(in srgb, var(--c) 20%, transparent);
}
.wt-dir-card .card-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 50% 100%, color-mix(in srgb, var(--c) 18%, transparent) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.5s;
  pointer-events: none;
}
.wt-dir-card:hover .card-glow { opacity: 1; }
.wt-dir-card .card-accent {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent 0%, var(--c) 30%, color-mix(in srgb, var(--c) 60%, #fff) 50%, var(--c) 70%, transparent 100%);
  opacity: 0;
  transition: opacity 0.3s;
}
.wt-dir-card:hover .card-accent { opacity: 1; }
.wt-dir-card .card-glyph {
  position: absolute;
  top: 1rem;
  left: 1rem;
  font-size: 0.75rem;
  color: color-mix(in srgb, var(--c) 35%, transparent);
  font-weight: 900;
  transition: color 0.3s;
}
.wt-dir-card:hover .card-glyph { color: color-mix(in srgb, var(--c) 65%, transparent); }
.wt-dir-card .card-icon {
  font-size: 2.5rem;
  line-height: 1;
  flex-shrink: 0;
  filter: drop-shadow(0 4px 12px color-mix(in srgb, var(--c) 40%, transparent));
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.wt-dir-card:hover .card-icon { transform: scale(1.2) rotate(-8deg); }
.wt-dir-card .card-title {
  font-size: 1.1rem;
  font-weight: 900;
  margin: 0 0 0.15rem;
  color: #fff;
  border: none;
  padding: 0;
  font-family: 'Space Mono', monospace;
}
.wt-dir-card .card-sub {
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: var(--c);
  opacity: 0.8;
  text-transform: uppercase;
}
.wt-dir-card .card-desc {
  font-size: 0.8rem;
  color: rgba(255,255,255,0.35);
  margin: 0.5rem 0 0;
  line-height: 1.6;
  transition: color 0.3s;
}
.wt-dir-card:hover .card-desc { color: rgba(255,255,255,0.6); }
.wt-dir-card .card-cta {
  font-size: 0.82rem;
  font-weight: 700;
  color: rgba(255,255,255,0.2);
  transition: color 0.3s, transform 0.3s;
}
.wt-dir-card:hover .card-cta {
  color: var(--c);
  transform: translateX(-4px);
}
.wt-dir-card .card-line {
  flex: 1;
  height: 1px;
  background: rgba(255,255,255,0.04);
  transition: background 0.3s;
}
.wt-dir-card:hover .card-line { background: color-mix(in srgb, var(--c) 20%, transparent); }
</style>
