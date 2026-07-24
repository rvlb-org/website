<script setup>
import { ref, onMounted } from 'vue'

const sections = [
  { href: '/hisn/milestones/', icon: '🏆', label: 'الإنجازات', sub: 'Milestones', desc: 'محطات وسجل إنجازات تطوير النظام', color: '#f59e0b', glyph: '◈' },
  { href: '/hisn/features/', icon: '⚡', label: 'المميزات', sub: 'Features', desc: 'المميزات التقنية والمعمارية لنظام حصن', color: '#eab308', glyph: '✦' },
  { href: '/hisn/capabilities/', icon: '🔐', label: 'الإمكانيات', sub: 'Capabilities', desc: 'نظام الصلاحيات وتأمين الكائنات في seL4', color: '#14b8a6', glyph: '🛡️' },
  { href: '/hisn/comparisons/', icon: '⚖️', label: 'المقارنات', sub: 'Comparisons', desc: 'مقارنة حصن مع أكثر من 40 نظام تشغيل عالمي', color: '#3b82f6', glyph: '⚖️' },
  { href: '/hisn/containers/', icon: '📦', label: 'الحاويات', sub: 'Containers', desc: 'المكونات المعزولة والعمليات المستقلة', color: '#6366f1', glyph: '⬡' },
  { href: '/hisn/kernel/', icon: '⚙️', label: 'النواة', sub: 'Kernel', desc: 'نواة seL4 المُثبتة رياضياً', color: '#0ea5e9', glyph: '◎' },
  { href: '/hisn/libs/', icon: '📚', label: 'المكتبات', sub: 'Libraries', desc: 'مكتبات النظام المكتوبة بـ Rust', color: '#ef4444', glyph: '◐' },
  { href: '/hisn/programs/', icon: '🖥️', label: 'البرامج', sub: 'Programs', desc: 'التطبيقات فوق واجهة النظام', color: '#22c55e', glyph: '◉' },
  { href: '/hisn/scripts/', icon: '📜', label: 'السكريبتات', sub: 'Scripts', desc: 'أدوات البناء والتشغيل والأتمتة', color: '#a855f7', glyph: '◇' },
  { href: '/hisn/third-party/', icon: '🤝', label: 'المكونات الخارجية', sub: 'Third-Party', desc: 'المشاريع والمكتبات الخارجية وحقوق المطورين', color: '#ec4899', glyph: '🌐' },
]

const codeStats = ref(null)

onMounted(async () => {
  try {
    const res = await fetch('/hisn-stats.json')
    if (res.ok) codeStats.value = await res.json()
  } catch {}
})

function fmt(n) {
  return n?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
</script>

<template>
  <div class="mh-root">

    <!-- Ambient orbs -->
    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>
    <div class="orb orb-3"></div>

    <!-- Grid noise -->
    <div class="grid-noise"></div>

    <!-- Hero -->
    <header class="mh-hero">
      <div class="mh-badge">
        <span class="badge-dot"></span>
        <span>HISN-SEL4 ECOSYSTEM</span>
      </div>
      <div class="mh-icon-wrap">
        <span class="mh-icon-ring ring-1"></span>
        <span class="mh-icon-ring ring-2"></span>
        <span class="mh-main-icon">🏰</span>
      </div>
      <h1 class="mh-title">
        <span class="title-line-1">Hisn</span><span class="title-dash">—</span><span class="title-line-2">seL4</span>
      </h1>
      <p class="mh-tagline">نظام تشغيل مُثبت رياضياً — بُني ليكون المستقبل</p>
      <div class="mh-stats">
        <div class="stat-item">
          <span class="stat-num">100%</span>
          <span class="stat-lbl">Formal Verification</span>
        </div>
        <div class="stat-sep"></div>
        <div class="stat-item">
          <span class="stat-num">0</span>
          <span class="stat-lbl">Kernel Exploits Possible</span>
        </div>
        <div class="stat-sep"></div>
        <div class="stat-item">
          <span class="stat-num">Rust</span>
          <span class="stat-lbl">Memory Safe</span>
        </div>
      </div>
      <!-- Code Stats Row -->
      <div v-if="codeStats" class="mh-code-stats">
        <div class="cs-item">
          <span class="cs-icon">📁</span>
          <span class="cs-val">{{ fmt(codeStats.files) }}</span>
          <span class="cs-lbl">ملف برمجي</span>
        </div>
        <div class="cs-dot"></div>
        <div class="cs-item">
          <span class="cs-icon">📝</span>
          <span class="cs-val">{{ fmt(codeStats.lines) }}</span>
          <span class="cs-lbl">سطر برمجي</span>
        </div>
        <div class="cs-dot"></div>
        <div class="cs-item">
          <span class="cs-icon">🦀</span>
          <span class="cs-val">{{ codeStats.rust_pct }}%</span>
          <span class="cs-lbl">راست</span>
        </div>
        <div class="cs-dot"></div>
        <div class="cs-item">
          <span class="cs-icon">💾</span>
          <span class="cs-val">{{ codeStats.size_mb }} MB</span>
          <span class="cs-lbl">حجم الكود</span>
        </div>
        <div class="cs-updated">↻ آخر تحديث: {{ codeStats.updated }}</div>
      </div>
    </header>

    <!-- Cards -->
    <div class="mh-grid">
      <a
        v-for="s in sections"
        :key="s.href"
        :href="s.href"
        class="mh-card"
        :style="{ '--c': s.color }"
      >
        <!-- Glow layer -->
        <div class="card-glow"></div>
        <!-- Top accent -->
        <div class="card-accent"></div>
        <!-- Corner glyph -->
        <span class="card-glyph">{{ s.glyph }}</span>
        <!-- Main content -->
        <div class="card-inner">
          <div class="card-icon">{{ s.icon }}</div>
          <div class="card-text">
            <h3 class="card-title">{{ s.label }}</h3>
            <span class="card-sub">{{ s.sub }}</span>
            <p class="card-desc">{{ s.desc }}</p>
          </div>
        </div>
        <!-- Footer -->
        <div class="card-footer">
          <span class="card-cta">استكشف →</span>
          <span class="card-line"></span>
        </div>
      </a>
    </div>

  </div>
</template>

<style>
/* Remove VitePress page padding */
.VPPage { padding-top: 0 !important; }
</style>

<style scoped>
/* ── Root ── */
.mh-root {
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
  filter: blur(90px);
  opacity: 0.12;
  pointer-events: none;
  animation: drift 12s ease-in-out infinite alternate;
}
.orb-1 {
  width: 600px; height: 600px;
  background: radial-gradient(circle, #f59e0b, transparent 70%);
  top: -200px; left: -150px;
  animation-delay: 0s;
}
.orb-2 {
  width: 500px; height: 500px;
  background: radial-gradient(circle, #6366f1, transparent 70%);
  bottom: -100px; right: -100px;
  animation-delay: -5s;
}
.orb-3 {
  width: 350px; height: 350px;
  background: radial-gradient(circle, #22c55e, transparent 70%);
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  animation-delay: -9s;
  opacity: 0.05;
}

@keyframes drift {
  from { transform: translate(0, 0) scale(1); }
  to   { transform: translate(40px, 30px) scale(1.1); }
}

/* ── Grid noise texture ── */
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
.mh-hero {
  text-align: center;
  margin-bottom: 4rem;
  position: relative;
  z-index: 1;
}

/* Badge */
.mh-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.2em;
  color: rgba(255,255,255,0.5);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 100px;
  padding: 0.35rem 1rem;
  margin-bottom: 2rem;
  backdrop-filter: blur(8px);
  background: rgba(255,255,255,0.02);
}
.badge-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 6px #22c55e;
  animation: pulse 2s ease-in-out infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 1; box-shadow: 0 0 6px #22c55e; }
  50%       { opacity: 0.6; box-shadow: 0 0 12px #22c55e; }
}

/* Shield icon */
.mh-icon-wrap {
  position: relative;
  width: 120px;
  height: 120px;
  margin: 0 auto 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.mh-icon-ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.08);
  animation: spin 20s linear infinite;
}
.ring-2 {
  inset: -15px;
  border-color: rgba(245,158,11,0.15);
  animation-direction: reverse;
  animation-duration: 30s;
  border-style: dashed;
}
@keyframes spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
.mh-main-icon {
  font-size: 4rem;
  filter: drop-shadow(0 0 30px rgba(245,158,11,0.5));
  animation: float 4s ease-in-out infinite;
}
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-8px); }
}

/* Title */
.mh-title {
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 900;
  line-height: 1;
  margin: 0 0 1rem;
  border: none;
  padding: 0;
  letter-spacing: -0.03em;
}
.title-line-1 {
  background: linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.7) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.title-dash {
  -webkit-text-fill-color: rgba(255,255,255,0.15);
  margin: 0 0.15em;
}
.title-line-2 {
  background: linear-gradient(135deg, #f59e0b 0%, #fbbf24 60%, #f59e0b 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 0 20px rgba(245,158,11,0.3));
}

/* Tagline */
.mh-tagline {
  font-size: 1.1rem;
  color: rgba(255,255,255,0.45);
  margin: 0 0 2.5rem;
  letter-spacing: 0.02em;
}

/* Stats bar */
.mh-stats {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2.5rem;
  padding: 1.25rem 2.5rem;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 100px;
  backdrop-filter: blur(10px);
  width: fit-content;
  margin: 0 auto;
}
.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.15rem;
}
.stat-num {
  font-size: 1.1rem;
  font-weight: 900;
  color: #fff;
  letter-spacing: -0.02em;
}
.stat-lbl {
  font-size: 0.65rem;
  color: rgba(255,255,255,0.35);
  letter-spacing: 0.08em;
  font-weight: 600;
  text-transform: uppercase;
}
.stat-sep {
  width: 1px;
  height: 30px;
  background: rgba(255,255,255,0.08);
}

/* Code Stats Row */
.mh-code-stats {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem 2rem;
  margin-top: 1.25rem;
  padding: 0.85rem 2rem;
  background: rgba(245,158,11,0.04);
  border: 1px solid rgba(245,158,11,0.1);
  border-radius: 100px;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
  backdrop-filter: blur(8px);
  position: relative;
}
.cs-item {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.82rem;
}
.cs-icon {
  font-size: 0.9rem;
  line-height: 1;
}
.cs-val {
  font-weight: 800;
  color: #fbbf24;
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.02em;
}
.cs-lbl {
  color: rgba(255,255,255,0.35);
  font-size: 0.72rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.cs-dot {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: rgba(255,255,255,0.15);
}
.cs-updated {
  position: absolute;
  bottom: -1.4rem;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.65rem;
  color: rgba(255,255,255,0.2);
  white-space: nowrap;
  letter-spacing: 0.05em;
}

/* ── Cards grid ── */
.mh-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
  width: 100%;
  max-width: 1000px;
  position: relative;
  z-index: 1;
}

@media (max-width: 900px) {
  .mh-grid { grid-template-columns: repeat(2, 1fr); }
  .mh-stats { flex-wrap: wrap; border-radius: 20px; gap: 1rem; }
}
@media (max-width: 560px) {
  .mh-grid { grid-template-columns: 1fr; }
}

/* ── Card ── */
.mh-card {
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
  cursor: pointer;
}
.mh-card:hover {
  transform: translateY(-6px) scale(1.02);
  border-color: color-mix(in srgb, var(--c) 40%, transparent);
  box-shadow:
    0 20px 60px -20px color-mix(in srgb, var(--c) 40%, transparent),
    inset 0 1px 0 color-mix(in srgb, var(--c) 20%, transparent);
}

/* Glow on hover */
.card-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse at 50% 100%,
    color-mix(in srgb, var(--c) 20%, transparent) 0%,
    transparent 70%
  );
  opacity: 0;
  transition: opacity 0.5s;
  pointer-events: none;
}
.mh-card:hover .card-glow { opacity: 1; }

/* Top accent line */
.card-accent {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
  background: linear-gradient(90deg,
    transparent 0%,
    var(--c) 30%,
    color-mix(in srgb, var(--c) 60%, #fff) 50%,
    var(--c) 70%,
    transparent 100%
  );
  opacity: 0;
  transition: opacity 0.3s;
}
.mh-card:hover .card-accent { opacity: 1; }

/* Corner glyph */
.card-glyph {
  position: absolute;
  top: 1rem;
  left: 1rem;
  font-size: 0.75rem;
  color: color-mix(in srgb, var(--c) 40%, transparent);
  font-weight: 900;
  letter-spacing: 0.1em;
  transition: color 0.3s;
}
.mh-card:hover .card-glyph {
  color: color-mix(in srgb, var(--c) 70%, transparent);
}

/* Inner layout */
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
.mh-card:hover .card-icon {
  transform: scale(1.2) rotate(-8deg);
  filter: drop-shadow(0 6px 20px color-mix(in srgb, var(--c) 60%, transparent));
}

.card-text { flex: 1; }

.card-title {
  font-size: 1.3rem;
  font-weight: 900;
  margin: 0 0 0.15rem;
  color: #fff;
  border: none;
  padding: 0;
  line-height: 1.2;
  letter-spacing: -0.01em;
}
.card-sub {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: var(--c);
  text-transform: uppercase;
  opacity: 0.8;
}
.card-desc {
  font-size: 0.82rem;
  color: rgba(255,255,255,0.4);
  margin: 0.5rem 0 0;
  line-height: 1.6;
  transition: color 0.3s;
}
.mh-card:hover .card-desc {
  color: rgba(255,255,255,0.6);
}

/* Footer */
.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}
.card-cta {
  font-size: 0.85rem;
  font-weight: 700;
  color: rgba(255,255,255,0.25);
  transition: color 0.3s, transform 0.3s;
  letter-spacing: 0.02em;
}
.mh-card:hover .card-cta {
  color: var(--c);
  transform: translateX(-4px);
}
.card-line {
  flex: 1;
  height: 1px;
  background: rgba(255,255,255,0.04);
  transition: background 0.3s;
}
.mh-card:hover .card-line {
  background: color-mix(in srgb, var(--c) 20%, transparent);
}
</style>
