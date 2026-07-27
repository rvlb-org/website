<script setup>
// Concepts Hub
// Grid of squares for miscellaneous concepts

const concepts = [
  { 
    href: '/concepts/rust', 
    icon: '🦀', 
    title: 'Rust', 
    desc: 'لغة البرمجة الآمنة للذاكرة', 
    color: '#f97316' 
  },
  { 
    href: '/concepts/network', 
    icon: '🌐', 
    title: 'الشبكات', 
    desc: 'مفاهيم الشبكات المتقدمة وبروتوكولاتها', 
    color: '#3b82f6' 
  }
]
</script>

<template>
  <div class="ch-root">
    
    <!-- Hero -->
    <header class="ch-hero">
      <div class="ch-badge">
        <span class="badge-dot"></span>
        <span>مفاهيم متنوعة</span>
      </div>
      <h1 class="ch-title">مفاهيم وتقنيات</h1>
      <p class="ch-tagline">شروحات مبسطة وعميقة للمفاهيم التقنية المتنوعة التي نعتمد عليها في RVLB.</p>
    </header>

    <!-- Grid -->
    <div class="ch-grid">
      <a
        v-for="c in concepts"
        :key="c.title"
        :href="c.href"
        class="ch-card"
        :style="{ '--c': c.color }"
      >
        <div class="ch-card-glow"></div>
        <div class="ch-card-accent"></div>
        <div class="ch-card-icon">{{ c.icon }}</div>
        <h3 class="ch-card-title">{{ c.title }}</h3>
        <p class="ch-card-desc">{{ c.desc }}</p>
      </a>
    </div>

  </div>
</template>



<style scoped>
.ch-root {
  min-height: calc(100vh - var(--vp-nav-height));
  padding: calc(var(--vp-nav-height) + 2rem) 2rem 6rem;
  font-family: 'Cairo', 'Inter', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.ch-hero {
  text-align: center;
  margin-bottom: 4rem;
  max-width: 800px;
}

.ch-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  color: rgba(255,255,255,0.6);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 100px;
  padding: 0.35rem 1rem;
  margin-bottom: 1.5rem;
  background: rgba(255,255,255,0.03);
}

.badge-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #facc15;
  box-shadow: 0 0 8px #facc15;
}

.ch-title {
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 900;
  margin: 0 0 1rem;
  line-height: 1.5;
  padding-top: 0.2em;
  padding-bottom: 0.2em;
  background: linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.7) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.ch-tagline {
  font-size: 1.1rem;
  color: rgba(255,255,255,0.5);
  line-height: 1.6;
}

/* Grid */
.ch-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
  width: 100%;
  max-width: 1000px;
}

/* Square-ish Card */
.ch-card {
  width: 240px;
  position: relative;
  aspect-ratio: 1 / 1;
  border-radius: 24px;
  background: rgba(255,255,255,0.025);
  border: 1px solid rgba(255,255,255,0.06);
  text-decoration: none !important;
  color: #fff !important;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
  transition:
    transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
    border-color 0.3s,
    box-shadow 0.4s;
  overflow: hidden;
}

.ch-card:hover {
  transform: translateY(-8px);
  border-color: color-mix(in srgb, var(--c) 40%, transparent);
  box-shadow:
    0 20px 40px -20px color-mix(in srgb, var(--c) 40%, transparent),
    inset 0 1px 0 color-mix(in srgb, var(--c) 20%, transparent);
}

.ch-card-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 50%, color-mix(in srgb, var(--c) 15%, transparent) 0%, transparent 60%);
  opacity: 0;
  transition: opacity 0.5s;
  pointer-events: none;
}
.ch-card:hover .ch-card-glow { opacity: 1; }

.ch-card-accent {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent 0%, var(--c) 50%, transparent 100%);
  opacity: 0;
  transition: opacity 0.3s;
}
.ch-card:hover .ch-card-accent { opacity: 1; }

.ch-card-icon {
  font-size: 4rem;
  line-height: 1;
  margin-bottom: 1.5rem;
  filter: drop-shadow(0 4px 12px color-mix(in srgb, var(--c) 40%, transparent));
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.ch-card:hover .ch-card-icon {
  transform: scale(1.15) translateY(-5px);
}

.ch-card-title {
  font-size: 1.5rem;
  font-weight: 900;
  margin: 0 0 0.5rem;
  color: #fff;
}

.ch-card-desc {
  font-size: 0.85rem;
  color: rgba(255,255,255,0.4);
  line-height: 1.5;
  margin: 0;
  transition: color 0.3s;
}
.ch-card:hover .ch-card-desc { color: rgba(255,255,255,0.7); }

@media (max-width: 600px) {
  .ch-grid { grid-template-columns: repeat(2, 1fr); }
  .ch-card { padding: 1.5rem; }
  .ch-card-icon { font-size: 3rem; }
  .ch-card-title { font-size: 1.25rem; }
  .ch-card-desc { display: none; }
}
</style>
