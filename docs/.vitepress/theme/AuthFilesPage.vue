<script setup>
const files = [
  {
    id: '01',
    name: 'src/main.rs',
    path: 'containers/auth/src/main.rs',
    icon: '🦀',
    tag: 'Entry Point',
    size: '~75 سطر',
    desc: 'الملف الرئيسي لحاوية Auth_Vault. يحتوي على نقطة الدخول _start التي تُفوّض إلى rust_main، وحلقة الخدمة التي تستقبل طلبات التوثيق وتُولّد PolicyBadge مُشفَّرة.',
    highlights: [
      { label: 'نقطة الدخول', value: '_start → rust_main()' },
      { label: 'Global Allocator', value: 'BumpAllocator' },
      { label: 'الأمر الوحيد', value: '0x100 (Request Token)' },
      { label: 'المعامل', value: 'mr[1] = app_id (u16)' },
      { label: 'الرد', value: 'reply.mr[1] = badge.to_badge_word()' },
    ],
    sections: [
      { title: 'Capability Slots', desc: 'Slot 0 = Own Endpoint | Slot 1 = FS_Vault (مستقبلاً)' },
      { title: 'PolicyBadge::new()', desc: 'تُولّد badge بـ: app_id + Permission::ReadWrite + hash_path("/home/user")' },
      { title: 'السياسة الحالية', desc: 'جميع التطبيقات تحصل على ReadWrite تلقائياً — Placeholder للإصدار القادم' },
      { title: 'معالجة الأخطاء', desc: 'أي أمر مجهول يُعيد MessageTag::Err فوراً' },
    ]
  },
  {
    id: '02',
    name: 'Cargo.toml',
    path: 'containers/auth/Cargo.toml',
    icon: '📦',
    tag: 'Package Config',
    size: '~16 سطر',
    desc: 'ملف إعداد حزمة auth. يُعرّف 4 اعتماديات — أكثر من أي حاوية أخرى بسبب احتياجها لـ BumpAllocator و security-policy.',
    highlights: [
      { label: 'الاسم', value: 'auth (v0.1.0)' },
      { label: 'إصدار Rust', value: 'edition = "2024"' },
      { label: 'sel4-sys', value: 'path = "../../libs/sel4-sys"' },
      { label: 'ipc-sync', value: 'path = "../../libs/ipc-sync"' },
      { label: 'bump-alloc', value: 'path = "../../libs/bump-alloc"' },
      { label: 'security-policy', value: 'path = "../../libs/security-policy"' },
    ],
    sections: [
      { title: 'Profile Release', desc: 'opt-level = 3 | lto = true | panic = "abort"' },
    ]
  },
  {
    id: '03',
    name: '.cargo/config.toml',
    path: 'containers/auth/.cargo/config.toml',
    icon: '⚙️',
    tag: 'Build Config',
    size: '~9 سطور',
    desc: 'إعدادات البناء الخاصة بحاوية auth. تُحدد هدف الترجمة (Target) وخيارات الـ Linker اللازمة للعمل في بيئة seL4 بدون نظام تشغيل.',
    highlights: [
      { label: 'Target', value: 'x86_64-unknown-none' },
      { label: 'relocation-model', value: 'pie (Position Independent Executable)' },
      { label: 'code-model', value: 'kernel' },
    ],
    sections: [
      { title: 'PIE Model', desc: 'يسمح لـ seL4 بتحميل الحاوية في أي عنوان ذاكرة دون تعارض' },
      { title: 'Kernel Code Model', desc: 'يُحسّن توليد الكود لبيئات ذات عناوين عالية كما يتوقعها seL4' },
    ]
  }
]
</script>

<template>
  <div class="afip-root">
    <header class="afip-header">
      <a href="/hisn/containers/auth/" class="back-link">
        <span>←</span> حاوية auth
      </a>

      <h1 class="afip-title">
        توثيق الملفات — <span class="gradient-text-red">auth</span>
      </h1>

      <p class="afip-subtitle">
        عرض تفصيلي لكل ملف برمجي داخل حاوية <code>auth</code> ومحتوياته ووظيفته الدقيقة.
      </p>

      <div class="afip-stats">
        <span class="stat-badge">{{ files.length }} ملفات</span>
        <span class="stat-badge stat-rust">🦀 Rust / no_std + alloc</span>
      </div>
    </header>

    <main class="afip-list">
      <div v-for="file in files" :key="file.id" class="file-card">
        <div class="file-glow"></div>
        <div class="file-top-bar"></div>

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

        <p class="file-desc">{{ file.desc }}</p>

        <div class="highlights-block">
          <div class="block-label">🔍 أهم العناصر البرمجية</div>
          <div class="highlights-grid">
            <div v-for="(h, i) in file.highlights" :key="i" class="hl-item">
              <span class="hl-label">{{ h.label }}</span>
              <code class="hl-value">{{ h.value }}</code>
            </div>
          </div>
        </div>

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
.afip-root {
  position: relative;
  min-height: 100vh;
  padding: calc(var(--vp-nav-height) + 2.5rem) 1.5rem 6rem;
  max-width: 900px;
  margin: 0 auto;
  font-family: 'Cairo', 'Inter', system-ui, sans-serif;
  color: #f8fafc;
}
.afip-root::before {
  content: '';
  position: absolute;
  width: 600px; height: 600px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(239,68,68,0.1), transparent 70%);
  filter: blur(80px);
  top: -100px; right: -200px;
  pointer-events: none; z-index: 0;
}
.afip-root::after {
  content: '';
  position: absolute;
  width: 500px; height: 500px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(168,85,247,0.08), transparent 70%);
  filter: blur(80px);
  bottom: 100px; left: -150px;
  pointer-events: none; z-index: 0;
}

.afip-header { position: relative; z-index: 1; text-align: center; margin-bottom: 4rem; }

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  font-weight: 700;
  color: #ef4444;
  background: rgba(239,68,68,0.1);
  padding: 0.4rem 1rem;
  border-radius: 100px;
  text-decoration: none !important;
  margin-bottom: 2rem;
  transition: all 0.3s ease;
  border: 1px solid rgba(239,68,68,0.2);
}
.back-link:hover { background: rgba(239,68,68,0.2); transform: translateX(-4px); }

.afip-title { font-size: clamp(2rem, 5vw, 3.2rem); font-weight: 900; line-height: 1.3; margin: 0 0 1rem; }
.gradient-text-red {
  background: linear-gradient(135deg, #ef4444 0%, #f87171 50%, #fca5a5 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 15px rgba(239,68,68,0.3));
}
.afip-subtitle { font-size: 1.1rem; color: rgba(248,250,252,0.7); max-width: 600px; margin: 0 auto 2rem; line-height: 1.7; }

.afip-stats { display: flex; justify-content: center; gap: 1rem; }
.stat-badge {
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  padding: 0.5rem 1.5rem;
  border-radius: 100px;
  font-size: 0.9rem; font-weight: 700; color: #fff;
  backdrop-filter: blur(10px);
}
.stat-rust { background: rgba(239,68,68,0.1); border-color: rgba(239,68,68,0.25); color: #fca5a5; }

.afip-list { position: relative; z-index: 1; display: flex; flex-direction: column; gap: 2.5rem; }

.file-card {
  position: relative;
  background: rgba(15,23,42,0.5);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 24px;
  padding: 2rem;
  backdrop-filter: blur(20px);
  overflow: hidden;
  transition: all 0.4s ease;
}
.file-card:hover { border-color: rgba(239,68,68,0.25); box-shadow: 0 20px 40px rgba(0,0,0,0.2); }

.file-glow {
  position: absolute; inset: 0;
  background: radial-gradient(circle at top right, rgba(239,68,68,0.06) 0%, transparent 60%);
  pointer-events: none;
}
.file-top-bar {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: linear-gradient(90deg, transparent, rgba(239,68,68,0.6), transparent);
}

.file-header { display: flex; align-items: flex-start; gap: 1.5rem; margin-bottom: 1.5rem; }
.file-icon-box {
  font-size: 2.5rem;
  width: 60px; height: 60px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 16px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.file-meta { flex: 1; }
.file-name-row { display: flex; align-items: center; gap: 1rem; margin-bottom: 0.4rem; flex-wrap: wrap; }
.file-name { font-size: 1.5rem; font-weight: 900; color: #fff; margin: 0; font-family: 'Space Mono', monospace; }
.file-tag {
  font-size: 0.75rem; font-weight: 700;
  padding: 0.25rem 0.75rem;
  border-radius: 8px;
  background: rgba(239,68,68,0.15);
  color: #fca5a5;
  border: 1px solid rgba(239,68,68,0.3);
}
.file-path {
  font-family: 'Space Mono', monospace;
  font-size: 0.8rem;
  color: #38bdf8;
  background: rgba(56,189,248,0.08) !important;
  padding: 0.2rem 0.6rem !important;
  border-radius: 6px;
}
.file-size { font-size: 0.85rem; color: rgba(255,255,255,0.4); font-weight: 700; white-space: nowrap; padding-top: 0.5rem; }

.file-desc {
  font-size: 1rem; line-height: 1.75;
  color: rgba(248,250,252,0.8);
  margin: 0 0 2rem;
  padding: 1.25rem 1.5rem;
  background: rgba(255,255,255,0.03);
  border-radius: 12px;
  border-right: 3px solid rgba(239,68,68,0.4);
}

.highlights-block, .sections-block { margin-bottom: 1.75rem; }
.block-label { font-size: 0.85rem; font-weight: 800; color: rgba(255,255,255,0.5); letter-spacing: 0.05em; margin-bottom: 1rem; }

.highlights-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 0.75rem; }
.hl-item {
  display: flex; flex-direction: column; gap: 0.3rem;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 10px;
  padding: 0.85rem 1rem;
  transition: border-color 0.3s ease;
}
.hl-item:hover { border-color: rgba(239,68,68,0.2); }
.hl-label { font-size: 0.75rem; font-weight: 700; color: rgba(255,255,255,0.4); }
.hl-value { font-family: 'Space Mono', monospace; font-size: 0.85rem; color: #a5f3fc; background: none !important; padding: 0 !important; word-break: break-all; }

.sections-list { display: flex; flex-direction: column; gap: 0.75rem; }
.section-item {
  display: flex; align-items: baseline; gap: 0.75rem;
  padding: 0.85rem 1.25rem;
  background: rgba(255,255,255,0.02);
  border-radius: 10px;
  border: 1px solid rgba(255,255,255,0.05);
  transition: all 0.3s ease;
}
.section-item:hover { background: rgba(239,68,68,0.06); border-color: rgba(239,68,68,0.12); }
.sec-dot { width: 8px; height: 8px; border-radius: 50%; background: #ef4444; box-shadow: 0 0 8px rgba(239,68,68,0.5); flex-shrink: 0; margin-top: 4px; }
.sec-title { font-weight: 800; color: #fff; font-size: 0.95rem; }
.sec-divider { color: rgba(255,255,255,0.2); margin: 0 0.25rem; }
.sec-desc { font-size: 0.9rem; color: rgba(248,250,252,0.7); line-height: 1.5; }

@media (max-width: 640px) {
  .file-header { flex-direction: column; align-items: flex-start; }
  .highlights-grid { grid-template-columns: 1fr; }
}
</style>
