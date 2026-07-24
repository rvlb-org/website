<script setup>
const files = [
  {
    id: '01',
    name: 'src/main.rs',
    path: 'containers/bus/src/main.rs',
    icon: '🦀',
    tag: 'Entry Point',
    size: '~202 سطر',
    desc: 'الملف الرئيسي الوحيد في حاوية bus. يحتوي على نقطة الدخول `_start` وحلقة الخدمة `server.serve()` الكاملة التي تعالج جميع رسائل IPC الواردة.',
    highlights: [
      { label: 'نقطة الدخول', value: '_start(ipc_buffer, endpoint_slot)' },
      { label: 'حلقة الخدمة', value: 'server.serve(|req| { ... })' },
      { label: 'التوجيه', value: 'match req.tag { MessageTag::... }' },
      { label: 'الحافظة', value: 'static mut CLIPBOARD: [u8; 256]' },
      { label: 'إعادة التوجيه', value: 'forward_to_fs(req, ipc_buf)' },
    ],
    sections: [
      { title: 'Capability Slots', desc: 'Slot 0 = نفسه (يستمع) | Slot 1 = FS_Vault | Slot 2 = Auth_Vault' },
      { title: 'عمليات الملفات', desc: 'CreateFile, WriteFile, ReadFile, DeleteFile, DeleteDir, CreateDir, ListDir' },
      { title: 'العمليات المركبة', desc: 'CopyFile (قراءة + كتابة) و MoveFile (نسخ + حذف مشروط)' },
      { title: 'سطح المكتب', desc: 'CreateShortcut, DeleteShortcut, RegisterApp عبر FS_Vault' },
      { title: 'الحافظة', desc: 'ClipboardCopy, ClipboardPaste, ClipboardClear في ذاكرة محلية' },
      { title: 'الشبكة (Placeholder)', desc: 'NetConnect, NetRequest — مجهزة لـ Tor_Vault مستقبلاً' },
    ]
  },
  {
    id: '02',
    name: 'Cargo.toml',
    path: 'containers/bus/Cargo.toml',
    icon: '📦',
    tag: 'Package Config',
    size: '~17 سطر',
    desc: 'ملف إعداد حزمة Rust للحاوية. يُعرّف الاعتمادات والإعدادات الخاصة بالبناء لضمان أصغر حجم ممكن للمخرج مع أعلى أداء.',
    highlights: [
      { label: 'الاسم', value: 'bus  (v0.1.0)' },
      { label: 'إصدار Rust', value: 'edition = "2024"' },
      { label: 'sel4-sys', value: 'path = "../../libs/sel4-sys"' },
      { label: 'ipc-sync', value: 'path = "../../libs/ipc-sync"' },
    ],
    sections: [
      { title: 'Profile Release', desc: 'opt-level = 3 | lto = true | panic = "abort" — أقصى أداء، أصغر حجم' },
      { title: 'Profile Dev', desc: 'panic = "abort" — يمنع unwinding في كلا الوضعين لتجنب تضخم الكود' },
    ]
  }
]
</script>

<template>
  <div class="blgp-root">
    <!-- Ambient Glows -->
    <div class="blgp-root::before"></div>
    <div class="blgp-root::after"></div>

    <header class="blgp-header">
      <a href="/hisn/containers/bus/" class="back-link">
        <span>←</span> حاوية bus
      </a>

      <h1 class="blgp-title">
        توثيق الملفات — <span class="gradient-text-yellow">bus</span>
      </h1>

      <p class="blgp-subtitle">
        عرض تفصيلي لكل ملف برمجي داخل حاوية <code>bus</code> ومحتوياته ووظيفته.
      </p>

      <div class="blgp-stats">
        <span class="stat-badge">{{ files.length }} ملفات</span>
        <span class="stat-badge stat-rust">🦀 Rust / no_std</span>
      </div>
    </header>

    <main class="blgp-list">
      <div v-for="file in files" :key="file.id" class="file-card">
        <div class="file-glow"></div>
        <div class="file-top-bar"></div>

        <!-- File Header -->
        <div class="file-header">
          <div class="file-icon-box">{{ file.icon }}</div>
          <div class="file-meta">
            <div class="file-name-row">
              <h2 class="file-name">{{ file.name }}</h2>
              <span class="file-tag">{{ file.tag }}</span>
            </div>
            <code class="file-path">{{ file.path }}</code>
          </div>
          <div class="file-size">{{ file.size }}</div>
        </div>

        <!-- Description -->
        <p class="file-desc">{{ file.desc }}</p>

        <!-- Highlights -->
        <div class="highlights-block">
          <div class="block-label">🔍 أهم العناصر البرمجية</div>
          <div class="highlights-grid">
            <div v-for="(h, i) in file.highlights" :key="i" class="hl-item">
              <span class="hl-label">{{ h.label }}</span>
              <code class="hl-value">{{ h.value }}</code>
            </div>
          </div>
        </div>

        <!-- Sections -->
        <div class="sections-block">
          <div class="block-label">📋 الأقسام والوحدات</div>
          <div class="sections-list">
            <div v-for="(s, i) in file.sections" :key="i" class="section-item">
              <div class="sec-dot"></div>
              <div>
                <span class="sec-title">{{ s.title }}</span>
                <span class="sec-divider">—</span>
                <span class="sec-desc">{{ s.desc }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.blgp-root {
  position: relative;
  min-height: 100vh;
  padding: calc(var(--vp-nav-height) + 2.5rem) 1.5rem 6rem;
  max-width: 900px;
  margin: 0 auto;
  font-family: 'Cairo', 'Inter', system-ui, sans-serif;
  color: #f8fafc;
}

/* ── Ambient Glows ── */
.blgp-root::before {
  content: '';
  position: absolute;
  width: 600px; height: 600px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(234, 179, 8, 0.1), transparent 70%);
  filter: blur(80px);
  top: -100px; right: -200px;
  pointer-events: none; z-index: 0;
}
.blgp-root::after {
  content: '';
  position: absolute;
  width: 500px; height: 500px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.08), transparent 70%);
  filter: blur(80px);
  bottom: 100px; left: -150px;
  pointer-events: none; z-index: 0;
}

/* ── Header ── */
.blgp-header {
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

.blgp-title {
  font-size: clamp(2rem, 5vw, 3.2rem);
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

.blgp-subtitle {
  font-size: 1.1rem;
  color: rgba(248, 250, 252, 0.7);
  max-width: 600px;
  margin: 0 auto 2rem;
  line-height: 1.7;
}

.blgp-stats {
  display: flex;
  justify-content: center;
  gap: 1rem;
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
.stat-rust {
  background: rgba(234, 88, 12, 0.1);
  border-color: rgba(234, 88, 12, 0.3);
  color: #fb923c;
}

/* ── File Cards ── */
.blgp-list {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.file-card {
  position: relative;
  background: rgba(15, 23, 42, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  padding: 2rem;
  backdrop-filter: blur(20px);
  overflow: hidden;
  transition: all 0.4s ease;
}
.file-card:hover {
  border-color: rgba(234, 179, 8, 0.25);
  box-shadow: 0 20px 40px rgba(0,0,0,0.2);
}

.file-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at top right,
    rgba(234, 179, 8, 0.06) 0%,
    transparent 60%
  );
  pointer-events: none;
}

.file-top-bar {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: linear-gradient(90deg, transparent, rgba(234, 179, 8, 0.6), transparent);
}

/* ── File Header ── */
.file-header {
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}
.file-icon-box {
  font-size: 2.5rem;
  width: 60px; height: 60px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.file-meta { flex: 1; }
.file-name-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.4rem;
  flex-wrap: wrap;
}
.file-name {
  font-size: 1.5rem;
  font-weight: 900;
  color: #fff;
  margin: 0;
  font-family: 'Space Mono', monospace;
}
.file-tag {
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.25rem 0.75rem;
  border-radius: 8px;
  background: rgba(234, 179, 8, 0.15);
  color: #fef08a;
  border: 1px solid rgba(234, 179, 8, 0.3);
}
.file-path {
  font-family: 'Space Mono', monospace;
  font-size: 0.8rem;
  color: #38bdf8;
  background: rgba(56, 189, 248, 0.08) !important;
  padding: 0.2rem 0.6rem !important;
  border-radius: 6px;
}
.file-size {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.4);
  font-weight: 700;
  white-space: nowrap;
  padding-top: 0.5rem;
}

/* ── Description ── */
.file-desc {
  font-size: 1rem;
  line-height: 1.75;
  color: rgba(248, 250, 252, 0.8);
  margin: 0 0 2rem;
  padding: 1.25rem 1.5rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  border-right: 3px solid rgba(234, 179, 8, 0.4);
}

/* ── Highlights ── */
.highlights-block,
.sections-block {
  margin-bottom: 1.75rem;
}
.block-label {
  font-size: 0.85rem;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.5);
  letter-spacing: 0.05em;
  margin-bottom: 1rem;
}

.highlights-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 0.75rem;
}
.hl-item {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 10px;
  padding: 0.85rem 1rem;
  transition: border-color 0.3s ease;
}
.hl-item:hover {
  border-color: rgba(234, 179, 8, 0.2);
}
.hl-label {
  font-size: 0.75rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.4);
}
.hl-value {
  font-family: 'Space Mono', monospace;
  font-size: 0.85rem;
  color: #a5f3fc;
  background: none !important;
  padding: 0 !important;
  word-break: break-all;
}

/* ── Sections ── */
.sections-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.section-item {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
  padding: 0.85rem 1.25rem;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
}
.section-item:hover {
  background: rgba(59, 130, 246, 0.07);
  border-color: rgba(59, 130, 246, 0.15);
}
.sec-dot {
  width: 8px; height: 8px;
  border-radius: 50%;
  background: #eab308;
  box-shadow: 0 0 8px rgba(234, 179, 8, 0.5);
  flex-shrink: 0;
  margin-top: 4px;
}
.sec-title {
  font-weight: 800;
  color: #fff;
  font-size: 0.95rem;
}
.sec-divider {
  color: rgba(255, 255, 255, 0.2);
  margin: 0 0.25rem;
}
.sec-desc {
  font-size: 0.9rem;
  color: rgba(248, 250, 252, 0.7);
  line-height: 1.5;
}

@media (max-width: 640px) {
  .file-header { flex-direction: column; align-items: flex-start; }
  .file-size { padding-top: 0; }
  .highlights-grid { grid-template-columns: 1fr; }
}
</style>
