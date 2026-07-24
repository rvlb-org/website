<script setup>
const libraries = [
  {
    id: '01',
    name: 'sel4-sys',
    path: 'libs/sel4-sys',
    tag: 'seL4 Low-Level Binding',
    desc: 'المكتبة الأهم في حاوية bus. تُوفر كل نداءات النظام (System Calls) اللازمة للتواصل مع نواة seL4:\nاستلام هيكل بيانات الإقلاع `seL4_BootInfo` وتوجيه رسائل الـ IPC واستخدام `seL4_MessageInfo` لاستخراج واستقبال البيانات عبر الـ Endpoints.'
  },
  {
    id: '02',
    name: 'ipc-sync',
    path: 'libs/ipc-sync',
    tag: 'Internal IPC Library',
    desc: 'مكتبة داخلية صُممت خصيصاً لنظام Hisn-seL4 لتوحيد وتسهيل بناء هياكل الرسائل المتزامنة (`IpcMessage`) وتغليف عمليات الـ `Send` و `Receive` عبر قنوات الـ IPC بطريقة آمنة وذات أداء فائق.'
  }
]
</script>

<template>
  <div class="blp-root">
    <!-- Ambient Glows -->
    <div class="blp-root::before"></div>
    <div class="blp-root::after"></div>

    <header class="blp-header">
      <a href="/hisn/containers/bus/" class="back-link">
        <span class="back-arrow">←</span> حاوية bus
      </a>
      
      <h1 class="blp-title">
        المكتبات التي تستخدمها <span class="gradient-text-yellow">bus</span>
      </h1>
      
      <p class="blp-subtitle">
        تستند حاوية <code>bus</code> إلى مكتبات داخلية مُطوّرة في مجلد <code>libs</code>. جميعها تعمل في بيئة <code>no_std</code> — لا C Runtime، ولا تبعيات نظام.
      </p>

      <div class="blp-stats">
        <span class="stat-badge">{{ libraries.length }} مكتبات من مجلد libs</span>
      </div>
    </header>

    <main class="blp-grid">
      <div v-for="lib in libraries" :key="lib.id" class="lib-card">
        <div class="lib-glow"></div>
        <div class="lib-header">
          <div class="lib-id"># {{ lib.id }}</div>
          <div class="lib-icon-box">⚙️</div>
        </div>
        
        <h2 class="lib-name">{{ lib.name }}</h2>
        <div class="lib-meta">
          <span class="meta-label">المسار</span>
          <code class="meta-path">{{ lib.path }}</code>
        </div>
        
        <div class="lib-tag-wrapper">
          <span class="lib-tag">{{ lib.tag }}</span>
        </div>
        
        <p class="lib-desc">{{ lib.desc }}</p>
      </div>
    </main>
  </div>
</template>

<style scoped>
.blp-root {
  position: relative;
  min-height: 100vh;
  padding: calc(var(--vp-nav-height) + 2.5rem) 1.5rem 6rem;
  max-width: 900px;
  margin: 0 auto;
  font-family: 'Cairo', 'Inter', system-ui, sans-serif;
  color: #f8fafc;
}

/* ── Ambient Glows ── */
.blp-root::before {
  content: '';
  position: absolute;
  width: 600px; height: 600px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(234, 179, 8, 0.1), transparent 70%);
  filter: blur(80px);
  top: -100px; right: -200px;
  pointer-events: none; z-index: 0;
}
.blp-root::after {
  content: '';
  position: absolute;
  width: 500px; height: 500px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.08), transparent 70%);
  filter: blur(80px);
  bottom: 100px; left: -150px;
  pointer-events: none; z-index: 0;
}

.blp-header {
  position: relative;
  z-index: 1;
  text-align: center;
  margin-bottom: 4rem;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  font-weight: 700;
  color: #eab308;
  background: rgba(234, 179, 8, 0.1);
  padding: 0.4rem 1rem;
  border-radius: 100px;
  text-decoration: none !important;
  margin-bottom: 2rem;
  transition: all 0.3s ease;
  border: 1px solid rgba(234, 179, 8, 0.2);
}
.back-link:hover {
  background: rgba(234, 179, 8, 0.2);
  transform: translateX(-4px);
}

.blp-title {
  font-size: clamp(2.2rem, 5vw, 3.5rem);
  font-weight: 900;
  line-height: 1.3;
  margin: 0 0 1rem;
}
.gradient-text-yellow {
  background: linear-gradient(135deg, #eab308 0%, #facc15 50%, #fde047 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 15px rgba(234,179,8,0.3));
}

.blp-subtitle {
  font-size: 1.15rem;
  color: rgba(248, 250, 252, 0.7);
  max-width: 650px;
  margin: 0 auto 2rem;
  line-height: 1.7;
}

.blp-stats {
  display: flex;
  justify-content: center;
}
.stat-badge {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0.5rem 1.5rem;
  border-radius: 100px;
  font-size: 0.9rem;
  font-weight: 700;
  color: #fff;
  backdrop-filter: blur(10px);
}

.blp-grid {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
}

.lib-card {
  position: relative;
  background: rgba(15, 23, 42, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  padding: 2rem;
  text-align: center;
  backdrop-filter: blur(16px);
  overflow: hidden;
  transition: all 0.4s ease;
}
.lib-card:hover {
  transform: translateY(-5px);
  border-color: rgba(234, 179, 8, 0.4);
  box-shadow: 0 20px 40px rgba(0,0,0,0.2);
}

.lib-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at top right,
    rgba(234, 179, 8, 0.08) 0%,
    transparent 60%
  );
  opacity: 0;
  transition: opacity 0.4s ease;
}
.lib-card:hover .lib-glow { opacity: 1; }

.lib-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
}
.lib-id {
  font-size: 0.8rem;
  font-weight: 800;
  color: #eab308;
}
.lib-icon-box {
  width: 48px; height: 48px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.lib-name {
  font-size: 1.5rem;
  font-weight: 800;
  color: #fff;
  margin: 0 0 1rem;
}

.lib-meta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}
.meta-label {
  font-size: 0.85rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.4);
}
.meta-path {
  font-family: 'Space Mono', monospace;
  font-size: 0.85rem;
  color: #38bdf8;
  background: rgba(255, 255, 255, 0.05) !important;
  padding: 0.2rem 0.6rem !important;
  border-radius: 6px;
}

.lib-tag-wrapper {
  margin-bottom: 1.5rem;
}
.lib-tag {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 700;
  color: #93c5fd;
  background: rgba(59, 130, 246, 0.15);
  padding: 0.3rem 1rem;
  border-radius: 100px;
  border: 1px solid rgba(59, 130, 246, 0.3);
}

.lib-desc {
  font-size: 0.95rem;
  line-height: 1.7;
  color: rgba(248, 250, 252, 0.75);
  margin: 0;
  white-space: pre-wrap;
}
</style>
