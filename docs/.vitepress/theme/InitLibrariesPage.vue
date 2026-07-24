<template>
  <div class="ilp-root">


    <!-- Header -->
    <header class="ilp-header">
      <a href="/hisn/containers/init/" class="ilp-breadcrumb">← حاوية init</a>
      <div class="ilp-badge">📚 مكتبات الحاوية</div>
      <h1 class="ilp-title">المكتبات التي تستخدمها <span class="hl">init</span></h1>
      <p class="ilp-sub">
        تستند حاوية <code>init</code> إلى <strong>7 مكتبات داخلية</strong> مطوّرة في مجلد <code>libs</code>. جميعها تعمل في بيئة <code>no_std</code> — لا C Runtime، ولا Standard Library، ولا تبعيات نظام.
      </p>
      <div class="ilp-count-pill">
        <span class="pill-num">7</span>
        <span class="pill-lbl">مكتبات من مجلد <code>libs</code></span>
      </div>
    </header>

    <!-- Libraries grid -->
    <main class="ilp-grid">
      <article
        v-for="(lib, i) in libraries"
        :key="i"
        class="lib-card"
        :style="{ '--accent': lib.color }"
      >
        <div class="lib-top-bar"></div>

        <div class="lib-head">
          <div class="lib-icon-wrap">
            <span class="lib-icon">{{ lib.icon }}</span>
          </div>
          <div class="lib-head-text">
            <span class="lib-num"># {{ String(i + 1).padStart(2, '0') }}</span>
            <h2 class="lib-name"><code>{{ lib.name }}</code></h2>
          </div>
        </div>

        <div class="lib-path">
          <span class="path-label">المسار</span>
          <code class="path-val">{{ lib.path }}</code>
        </div>

        <div class="lib-type-row">
          <span class="lib-type-pill">{{ lib.type }}</span>
        </div>

        <p class="lib-desc" v-html="lib.desc"></p>

        <ul class="lib-points" v-if="lib.points?.length">
          <li v-for="(pt, j) in lib.points" :key="j" v-html="pt"></li>
        </ul>
      </article>
    </main>

    <!-- Summary table -->
    <section class="ilp-summary">
      <h2 class="summary-title">📊 جدول ملخص المكتبات</h2>
      <div class="table-wrap">
        <table class="sum-table">
          <thead>
            <tr>
              <th>المكتبة</th>
              <th>المسار</th>
              <th>الغرض داخل init</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(lib, i) in libraries" :key="i">
              <td><span class="lib-icon-sm">{{ lib.icon }}</span> <code>{{ lib.name }}</code></td>
              <td><code class="path-dim">{{ lib.path }}</code></td>
              <td>{{ lib.summary }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Nav -->
    <footer class="ilp-footer">
      <a href="/hisn/containers/init/functions" class="nav-btn">← الوظائف</a>
      <a href="/hisn/containers/init/" class="nav-btn nav-btn-accent">🚀 حاوية init ←</a>
      <a href="/hisn/containers/" class="nav-btn">قائمة الحاويات ←</a>
    </footer>
  </div>
</template>

<script setup>
const libraries = [
  {
    icon: '⚙️',
    name: 'sel4-sys',
    path: 'libs/sel4-sys',
    type: 'Low-Level Binding لنواة seL4',
    color: '#6366f1',
    desc: 'المكتبة الأهم في حاوية <code>init</code>. تُوفر كل نداءات النظام (<strong>System Calls</strong>) اللازمة للتواصل مع نواة seL4:',
    points: [
      'استلام هيكل بيانات الإقلاع <code>seL4_BootInfo</code>.',
      'تحويل الذاكرة الخام <code>seL4_Untyped_Retype</code> لإنشاء TCB و Endpoints و VSpaces.',
      'نسخ الصلاحيات <code>seL4_CNode_Copy</code> و <code>seL4_CNode_Mint</code>.',
      'خرائط جداول الصفحات: <code>seL4_X86_PDPT_Map</code>، <code>seL4_X86_PageDirectory_Map</code>، <code>seL4_X86_Page_Map</code>.',
      'إعداد وتشغيل أشواط التنفيذ: <code>seL4_TCB_Configure</code> و <code>seL4_TCB_WriteRegisters</code>.',
      'استخراج صلاحيات I/O Ports: <code>seL4_X86_IOPortControl_Issue</code>.',
    ],
    summary: 'تنفيذ System Calls مع نواة seL4 وتوزيع الصلاحيات وخرائط الذاكرة',
  },
  {
    icon: '🗄️',
    name: 'bump-alloc',
    path: 'libs/bump-alloc',
    type: 'Bare-Metal Bump Allocator',
    color: '#f59e0b',
    desc: 'تُستخدم كمُخصص الذاكرة العالمي (<code>#[global_allocator]</code>) الخاص بحاوية <code>init</code>. توفر تخصيصاً ديناميكياً للذاكرة لهياكل البيانات المؤقتة على مستوى العتاد المباشر — بدون C Runtime أو Standard Heap.',
    summary: 'مخصص الذاكرة المحلي (Heap Allocator) الخاص بكود init نفسه',
  },
  {
    icon: '💬',
    name: 'ipc-sync',
    path: 'libs/ipc-sync',
    type: 'Synchronous IPC Engine',
    color: '#3b82f6',
    desc: 'تُنسّق الرسائل التزامنية المتبادلة بين <code>init</code> والحاويات الأخرى:',
    points: [
      'إنشاء هيكل الرسالة <code>IpcMessage</code> وتحديد الـ Tags والـ Payload.',
      'إرسال رسائل فحص اتصال (<code>Ping/Pong</code>) بعد تشغيل كل حاوية.',
      'تنفيذ بروتوكول اختبار التشفير: <code>SplitSecret</code> و <code>ReconstructSecret</code> مع <code>Crypto_Vault</code>.',
    ],
    summary: 'صياغة وتبادل رسائل الـ IPC واختبار الاتصال بالحاويات',
  },
  {
    icon: '📄',
    name: 'elf-parser',
    path: 'libs/elf-parser',
    type: 'ELF Binary Parser',
    color: '#10b981',
    desc: 'تُستخدم في مرحلتي الإقلاع وتشغيل التطبيقات لتحليل ملفات ELF:',
    points: [
      'فحص وتحليل الهيكل التنفيذي لملفات الـ ELF المدمجة.',
      'استخراج نقطة البدء للتنفيذ (<code>e_entry</code>).',
      'تصفح مقاطع الذاكرة القابلة للتحميل (<code>Loadable Segments</code>) وقراءة العناوين الافتراضية وحجم كل مقطع.',
    ],
    summary: 'قراءة واستخراج مقاطع الـ ELF ونقاط البدء لكل حاوية وتطبيق',
  },
  {
    icon: '🌐',
    name: 'net-driver',
    path: 'libs/net-driver',
    type: 'VirtIO Net Driver',
    color: '#8b5cf6',
    desc: 'تُستدعى في وحدة <code>utils_mod/net.rs</code> لاكتشاف وتهيئة شبكة النظام:',
    points: [
      'مسح ناقل PCI عبر منافذ <code>0xCF8–0xCFF</code>.',
      'التعرف على VirtIO Net عند التوقيع <code>0x1AF4:0x1000</code>.',
      'تهيئة BAR0 وتنفيذ: <code>Reset → ACK → DRIVER → DRIVER_OK</code>.',
    ],
    summary: 'استكشاف ناقل PCI وتهيئة بطاقة الشبكة VirtIO Net',
  },
  {
    icon: '🔐',
    name: 'vault-crypto',
    path: 'libs/vault-crypto',
    type: 'Cryptography & Key Management',
    color: '#ef4444',
    desc: 'تُستخدم في مرحلة الاختبارات الأولية والتحقق الذاتي من سلامة التشفير. توفر الأدوات التشفيرية المعتمدة لحماية البيانات قبل تمريرها، وتُستخدم كمرجع خوارزميات مشترك لربط عمليات التشفير بين الحاويات.',
    summary: 'دعم عمليات فحص وتكامل بروتوكولات التشفير والمفاتيح',
  },
  {
    icon: '📦',
    name: 'pkg-format',
    path: 'libs/pkg-format',
    type: 'SVP Package Reader',
    color: '#f97316',
    desc: 'تُستدعى في <code>program_manager.rs</code> لإدارة تشغيل التطبيقات الديناميكية:',
    points: [
      'قراءة وفك ضغط سجل البرامج المدمج <code>manifest.bin</code> عبر <code>RegistryIter</code>.',
      'استخراج معلومات الحزم (<code>SVP Package</code>): الاسم، الحجم، وكود الـ ELF.',
      'البحث عن التطبيقات بالاسم وتشغيلها ديناميكياً عند استلام طلب الإطلاق من <code>Desktop</code>.',
    ],
    summary: 'قراءة سجل التطبيقات manifest.bin وتشغيل الحزم الديناميكية',
  },
]
</script>

<style scoped>
.ilp-root {
  position: relative;
  min-height: 100vh;
  padding: calc(var(--vp-nav-height) + 2.5rem) 1.5rem 6rem;
  max-width: 900px;
  margin: 0 auto;
  font-family: 'Cairo', 'Inter', system-ui, sans-serif;
  overflow: hidden;
}

.ilp-root::before {
  content: '';
  position: absolute;
  width: 500px; height: 500px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(16,185,129,0.12), transparent 70%);
  filter: blur(80px);
  top: -100px; right: -100px;
  pointer-events: none; z-index: 0;
}
.ilp-root::after {
  content: '';
  position: absolute;
  width: 400px; height: 400px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(59,130,246,0.12), transparent 70%);
  filter: blur(80px);
  bottom: -100px; left: -100px;
  pointer-events: none; z-index: 0;
}

/* Header */
.ilp-header {
  position: relative; z-index: 1;
  text-align: center;
  margin-bottom: 2.5rem;
}
.ilp-breadcrumb {
  display: inline-flex; align-items: center; gap: 0.4rem;
  font-size: 0.82rem; font-weight: 700;
  color: var(--vp-c-brand-1);
  text-decoration: none; opacity: 0.8;
  transition: opacity 0.2s; margin-bottom: 1rem;
}
.ilp-breadcrumb:hover { opacity: 1; }
.ilp-badge {
  display: inline-flex;
  font-size: 0.7rem; font-weight: 800; letter-spacing: 0.12em;
  padding: 0.3rem 0.9rem; border-radius: 100px;
  background: color-mix(in srgb, #10b981 15%, transparent);
  color: #34d399;
  border: 1px solid color-mix(in srgb, #10b981 30%, transparent);
  margin-bottom: 0.75rem;
}
.ilp-title {
  font-size: clamp(1.75rem, 4.5vw, 2.75rem);
  font-weight: 900; margin: 0 0 0.5rem;
  color: var(--vp-c-text-1);
  border: none; padding: 0; line-height: 1.2;
}
.hl {
  background: linear-gradient(135deg, #10b981 0%, #3b82f6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.ilp-sub {
  font-size: 0.95rem; color: var(--vp-c-text-2);
  max-width: 600px; margin: 0 auto 1.25rem; line-height: 1.7;
}
.ilp-sub code, .ilp-sub strong {
  font-size: 0.9rem;
  background: var(--vp-c-bg-mute); padding: 1px 5px; border-radius: 4px;
}
.ilp-sub strong { background: transparent; }
.ilp-count-pill {
  display: inline-flex; align-items: center; gap: 0.5rem;
  padding: 0.4rem 1.2rem; border-radius: 100px;
  background: var(--vp-c-bg-soft); border: 1px solid var(--vp-c-divider);
  font-size: 0.82rem;
}
.pill-num { font-weight: 900; font-size: 1.1rem; color: #34d399; }
.pill-lbl { color: var(--vp-c-text-3); font-weight: 600; }
.pill-lbl code { font-size: 0.8rem; background: var(--vp-c-bg-mute); padding: 1px 4px; border-radius: 3px; }

/* Grid */
.ilp-grid {
  position: relative; z-index: 1;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 14px;
  margin-bottom: 3rem;
}

.lib-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  overflow: hidden;
  padding: 0 0 1.25rem;
  position: relative;
  transition: border-color 0.25s, box-shadow 0.25s, transform 0.2s;
}
.lib-card:hover {
  border-color: color-mix(in srgb, var(--accent, var(--vp-c-brand-1)) 50%, transparent);
  box-shadow: 0 6px 28px color-mix(in srgb, var(--accent, var(--vp-c-brand-1)) 12%, transparent);
  transform: translateY(-3px);
}

.lib-top-bar {
  height: 3px;
  background: linear-gradient(90deg, transparent, var(--accent, var(--vp-c-brand-1)), transparent);
}

.lib-head {
  display: flex; align-items: center; gap: 12px;
  padding: 1rem 1.25rem 0.5rem;
}
.lib-icon-wrap {
  width: 46px; height: 46px; border-radius: 12px;
  background: color-mix(in srgb, var(--accent, var(--vp-c-brand-1)) 12%, var(--vp-c-bg));
  border: 1px solid color-mix(in srgb, var(--accent, var(--vp-c-brand-1)) 20%, transparent);
  display: flex; align-items: center; justify-content: center;
  font-size: 1.4rem; flex-shrink: 0;
  transition: transform 0.3s;
}
.lib-card:hover .lib-icon-wrap { transform: scale(1.1) rotate(-5deg); }
.lib-head-text { flex: 1; min-width: 0; }
.lib-num {
  font-size: 0.62rem; font-weight: 800;
  letter-spacing: 0.1em;
  color: var(--accent, var(--vp-c-brand-1)); opacity: 0.65;
}
.lib-name {
  font-size: 1.05rem; font-weight: 800; margin: 2px 0 0;
  border: none; padding: 0;
}
.lib-name code {
  background: transparent !important;
  color: var(--accent, var(--vp-c-brand-1)) !important;
  font-size: 1.05rem; font-weight: 800;
}

.lib-path {
  display: flex; align-items: center; gap: 8px;
  padding: 0 1.25rem;
  margin-bottom: 0.6rem;
}
.path-label {
  font-size: 0.7rem; font-weight: 700;
  color: var(--vp-c-text-3); text-transform: uppercase; letter-spacing: 0.08em;
}
.path-val {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-mute) !important;
  padding: 2px 8px; border-radius: 6px;
}

.lib-type-row { padding: 0 1.25rem; margin-bottom: 0.8rem; }
.lib-type-pill {
  font-size: 0.68rem; font-weight: 700;
  padding: 2px 10px; border-radius: 100px;
  background: color-mix(in srgb, var(--accent, var(--vp-c-brand-1)) 12%, transparent);
  color: var(--accent, var(--vp-c-brand-1));
  border: 1px solid color-mix(in srgb, var(--accent, var(--vp-c-brand-1)) 22%, transparent);
}

.lib-desc {
  font-size: 0.88rem; color: var(--vp-c-text-2);
  line-height: 1.65; margin: 0 0 0.6rem;
  padding: 0 1.25rem;
}
.lib-desc :deep(code) {
  font-size: 0.82rem; background: var(--vp-c-bg-mute);
  padding: 2px 5px; border-radius: 4px;
}
.lib-desc :deep(strong) { color: var(--vp-c-text-1); }

.lib-points {
  margin: 0; padding: 0 1.25rem 0 0;
  padding-right: 2.25rem;
  font-size: 0.85rem; color: var(--vp-c-text-2); line-height: 1.6;
}
.lib-points li { margin-bottom: 0.3rem; }
.lib-points :deep(code) {
  font-size: 0.8rem; background: var(--vp-c-bg-mute);
  padding: 1px 5px; border-radius: 4px;
}

/* Summary table */
.ilp-summary {
  position: relative; z-index: 1; margin-bottom: 3rem;
}
.summary-title {
  font-size: 1.2rem; font-weight: 800; margin: 0 0 1rem;
  color: var(--vp-c-text-1); border: none; padding: 0;
}
.table-wrap {
  overflow-x: auto; border-radius: 14px;
  border: 1px solid var(--vp-c-divider);
}
.sum-table { width: 100%; border-collapse: collapse; font-size: 0.85rem; }
.sum-table thead tr {
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
}
.sum-table th {
  padding: 10px 14px; text-align: right; font-weight: 700;
  color: var(--vp-c-text-2); font-size: 0.78rem;
  letter-spacing: 0.05em; text-transform: uppercase;
}
.sum-table tbody tr {
  border-bottom: 1px solid var(--vp-c-divider); transition: background 0.15s;
}
.sum-table tbody tr:last-child { border-bottom: none; }
.sum-table tbody tr:hover { background: var(--vp-c-bg-soft); }
.sum-table td { padding: 9px 14px; vertical-align: middle; }
.sum-table td code { font-size: 0.82rem; background: var(--vp-c-bg-mute); padding: 1px 5px; border-radius: 4px; }
.lib-icon-sm { font-size: 1rem; margin-left: 6px; }
.path-dim { color: var(--vp-c-text-3) !important; }

/* Footer */
.ilp-footer {
  position: relative; z-index: 1;
  display: flex; flex-wrap: wrap; justify-content: center; gap: 10px;
}
.nav-btn {
  display: inline-flex; align-items: center; gap: 0.5rem;
  padding: 0.65rem 1.25rem; border-radius: 12px;
  font-weight: 700; font-size: 0.88rem;
  text-decoration: none !important;
  color: var(--vp-c-text-2) !important;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  transition: all 0.25s;
}
.nav-btn:hover {
  color: var(--vp-c-text-1) !important;
  border-color: color-mix(in srgb, var(--vp-c-brand-1) 40%, transparent);
  transform: translateY(-2px);
}
.nav-btn-accent {
  background: linear-gradient(135deg, #059669 0%, #10b981 100%);
  color: white !important;
  border-color: transparent !important;
  box-shadow: 0 4px 16px rgba(16, 185, 129, 0.35);
}
.nav-btn-accent:hover {
  color: white !important;
  box-shadow: 0 6px 24px rgba(16, 185, 129, 0.5);
}

@media (max-width: 640px) {
  .ilp-grid { grid-template-columns: 1fr; }
}
</style>
