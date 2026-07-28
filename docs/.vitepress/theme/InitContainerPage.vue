<script setup>
import { ref, onMounted } from 'vue'

const messageTags = [
  { call: '0x0200 (LaunchApp)', action: 'يستقبل طلب تشغيل برنامج جديد من واجهة سطح المكتب (Desktop). يقرأ اسم البرنامج من MR[1..4] ويبحث عنه في سجل البرامج (Registry) ليقوم بإطلاقه.' },
  { call: '_ (Unknown/Fault)', action: 'يطبع معلومات عن أي اتصال IPC غير متوقع أو خطأ (Fault) للمساعدة في تصحيح أخطاء النظام (Debugging).' }
]

const functions = [
  { id: '01', icon: '🌱', title: 'الحاوية الأم (The RootTask)', desc: 'الحاوية الأولى والوحيدة التي تبدأها نواة seL4 مباشرة. هي نقطة انطلاق مساحة المستخدم (User Space) وأساس النظام.' },
  { id: '02', icon: '🧠', title: 'إدارة الذاكرة الأولية (Memory Allocation)', desc: 'تمتلك كل الذاكرة الحرة في النظام عند بدء التشغيل وتديرها عبر UntypedAllocator لمنحها لباقي الحاويات عند إنشائها.' },
  { id: '03', icon: '🎫', title: 'إدارة القدرات (Capability Management)', desc: 'مسؤولة عن توزيع صلاحيات الوصول (Capabilities) من خلال SlotAllocator لربط الحاويات مع بعضها بشكل آمن.' },
  { id: '04', icon: '🚀', title: 'إقلاع النظام (System Bootstrapping)', desc: 'تقوم بفك ضغط وتحميل وإطلاق جميع الحاويات الأساسية بترتيب دقيق: (Crypto, Net, Disk, FS, Auth, Bus, Desktop, Input).' },
  { id: '05', icon: '🔗', title: 'إنشاء قنوات الاتصال (IPC Endpoints)', desc: 'تُنشئ قنوات اتصال IPC وتربطها بين الحاويات. على سبيل المثال، تمرر نقطة اتصال FS_Vault إلى Desktop ليتمكن من التفاعل معه.' },
  { id: '06', icon: '🤝', title: 'إعداد الذاكرة المشتركة (Shared Memory)', desc: 'تنشئ وتربط الذاكرة المشتركة للعمليات التي تتطلب نقل بيانات كبير، مثل ربط Disk_Vault مع FS_Vault عبر عنوان 0x600000.' },
  { id: '07', icon: '📦', title: 'إدارة سجل البرامج (Program Registry)', desc: 'تحمل أرشيف البرامج والتطبيقات المتاحة وتقوم بإعدادها للتشغيل بناءً على طلب المستخدم عبر واجهة سطح المكتب.' },
  { id: '08', icon: '🛡️', title: 'معالجة الانهيار (Panic Handler)', desc: 'تحتوي على آلية أمان للتعامل مع أخطاء الانهيار الحرج (Panic) لإيقاف تنفيذ النظام بشكل آمن ومنع أي سلوك غير محدد.' }
]

const files = [
  {
    id: '01', name: 'src/main.rs', path: 'containers/init/src/main.rs', icon: '🦀', tag: 'Root Entry', size: '~200 سطر',
    desc: 'الملف الأهم في النظام. يحتوي على تسلسل الإقلاع، إعداد مديرات الذاكرة (Allocators)، وتحميل كل حاوية من صورة ELF الخاصة بها عبر وحدات setup منفصلة.',
    highlights: [
      { label: 'دالة البداية', value: '_start -> rust_main' },
      { label: 'الذاكرة', value: 'untyped_allocator & slot_allocator' },
      { label: 'الذاكرة المشتركة', value: 'seL4_X86_Page_Map' },
      { label: 'حلقة الاستماع', value: 'LaunchApp Listener (0x0200)' },
    ],
    sections: [
      { title: 'تسلسل الإقلاع', desc: 'Crypto -> Net -> Disk -> FS -> Auth -> Bus -> Desktop -> Input' },
      { title: 'تشغيل البرامج', desc: 'program_manager::launch_app_by_name()' },
    ]
  },
  {
    id: '02', name: 'src/*_setup.rs', path: 'containers/init/src/', icon: '🛠️', tag: 'Setup Modules', size: 'متعدد الملفات',
    desc: 'مجموعة من الملفات الفرعية (مثل auth_setup.rs, fs_setup.rs) كل منها مختص بإعداد الـ VSpace والـ CNode وتمرير القدرات (Capabilities) لحاوية معينة.',
    highlights: [
      { label: 'التفويض (Delegation)', value: 'نسخ Endpoints من init للحاوية الجديدة' },
      { label: 'إعداد الـ Stack', value: 'تجهيز مساحة مكدس مؤمنة لكل حاوية' }
    ]
  },
  {
    id: '03', name: 'Cargo.toml', path: 'containers/init/Cargo.toml', icon: '📦', tag: 'Package Config', size: '~18 سطر',
    desc: 'يعرف الاعتماديات الجوهرية لحاوية الإقلاع والتي تشمل مكتبات النظام ومكتبات الطرف الثالث الموثقة التي يعتمد عليها النظام لبناء الحاويات الأخرى.',
    highlights: [
      { label: 'الاسم', value: 'init (v0.1.0)' },
      { label: 'الذاكرة (Heap)', value: 'talc = "4" & spin = "0.9"' },
      { label: 'تحليل ELF', value: 'xmas-elf = "0.9"' },
    ]
  }
]

const libraries = [
  { id: '01', name: 'xmas-elf', path: 'crates.io', tag: 'External', is_external: true, desc: 'مكتبة خارجية موثقة ومختبرة عالمياً تُستخدم بدلاً من `elf-parser` القديمة لتحليل مقاطع ملفات ELF بأمان وفاعلية.' },
  { id: '02', name: 'talc', path: 'crates.io', tag: 'External', is_external: true, desc: 'مكتبة خارجية عالية الأداء لإدارة تخصيص الذاكرة (O(1) allocation) استُخدمت كبديل لـ bump-alloc القديمة لتوفير دعم للـ Heap بشكل آمن في init.' },
  { id: '03', name: 'sel4-sys', path: 'libs/sel4-sys', tag: 'seL4 API', is_external: false, desc: 'تستخدم بشكل مكثف جداً في Init لإنشاء الـ CNode، الـ VSpace، توزيع الـ Untyped Memory، ونداءات الـ Page Mapping.' }
]

const terminalLines = ref([
  { text: '[Kernel] Starting RootTask...', color: 'text-gray-500' },
  { text: '[Init] Booting HISN-seL4 User Space...', color: 'text-cyan-400 font-bold' },
  { text: '[Init] Initializing UntypedAllocator & SlotAllocator...', color: 'text-blue-300' },
  { text: '[Init] Crypto_Vault successfully loaded and started!', color: 'text-green-400' },
  { text: '[Init] Network Gateway successfully loaded and started!', color: 'text-green-400' },
  { text: '[Init] Disk Vault successfully loaded and started!', color: 'text-green-400' },
  { text: '[Init] FS Vault successfully loaded and started!', color: 'text-green-400' },
  { text: '[Init] Shared memory mapped between FS and Disk successfully at 0x600000!', color: 'text-yellow-300' },
  { text: '[Init] Auth Vault successfully loaded and started!', color: 'text-green-400' },
  { text: '[Init] Bus_Vault successfully loaded and started!', color: 'text-green-400' },
  { text: '[Init] Desktop container loaded successfully.', color: 'text-green-400' },
  { text: '[Init] Input_Vault container loaded successfully.', color: 'text-green-400' },
  { text: '[Init] All containers launched. Listening for app launch requests...', color: 'text-cyan-300 font-bold' },
  { text: '--------------------------------------------------------', color: 'text-gray-600' }
])
</script>

<template>
  <div class="init-root">
    <!-- Glowing background effects -->
    <div class="ambient-glow glow-top"></div>
    <div class="ambient-glow glow-bottom"></div>
    <div class="stars-bg"></div>

    <!-- Header Section -->
    <header class="init-header">
      <div class="init-badge-container">
        <div class="init-badge">
          <span class="badge-pulse"></span>
          <span>ROOTTASK / PID 1</span>
        </div>
        <div class="genesis-badge glow-cyan-box">
          <span class="us-icon">🌱</span>
          <span>The Genesis Container</span>
        </div>
      </div>

      <div class="init-icon-wrapper">
        <div class="core-orb"></div>
        <div class="orbit-path path-1"><div class="satellite sat-1"></div></div>
        <div class="orbit-path path-2"><div class="satellite sat-2"></div></div>
        <div class="orbit-path path-3"><div class="satellite sat-3"></div></div>
        <span class="init-main-icon">🌟</span>
      </div>

      <h1 class="init-title">
        <span class="gradient-text-white">حاوية </span>
        <span class="gradient-text-cyan">init</span>
      </h1>

      <p class="init-subtitle">
        نقطة البداية لكل شيء <strong>(The RootTask)</strong>. الحاوية الأم التي توقظها النواة وتُسلّمها كل موارد النظام.
        مسؤولة عن <strong>خلق</strong> جميع الحاويات الأخرى، توزيع الذاكرة، وبناء شجرة القدرات (Capabilities) للنظام بأكمله.
      </p>

      <div class="init-stats-bar">
        <div class="stat-pill"><span class="stat-icon">👑</span><span class="stat-val">RootTask</span><span class="stat-tag">Supreme</span></div>
        <div class="stat-divider"></div>
        <div class="stat-pill"><span class="stat-icon">🧠</span><span class="stat-val">Untyped Memory</span><span class="stat-tag">Manager</span></div>
        <div class="stat-divider"></div>
        <div class="stat-pill"><span class="stat-icon">🏗️</span><span class="stat-val">ELF Loader</span><span class="stat-tag">Bootstrapper</span></div>
        <div class="stat-divider"></div>
        <div class="stat-pill"><span class="stat-icon">🚀</span><span class="stat-val">App Launcher</span><span class="stat-tag bg-cyan">IPC Listener</span></div>
      </div>
    </header>

    <main class="init-content">

      <!-- Genesis Tree (The Boot Sequence) -->
      <section class="init-section">
        <div class="section-header">
          <div class="sh-icon glow-cyan">🌳</div>
          <h2 class="sh-title">شجرة الإقلاع (The Genesis Tree)</h2>
          <div class="line-decorator-cyan"></div>
        </div>
        
        <div class="philosophical-note-init glass-panel">
          <div class="pn-icon">💡</div>
          <div class="pn-text">
            <strong>مبدأ التفويض المطلق (Delegation)</strong>
            في هندسة `seL4`، النواة لا تنشئ العمليات! النواة تكتفي بإنشاء مساحة مستخدم واحدة فقط تسمى `RootTask` (وهي حاوية `init`). تُعطي النواة هذه الحاوية الصلاحية المطلقة على كل الذاكرة وكل العتاد، ثم تقع مسؤولية بناء النظام بالكامل وتوزيع الصلاحيات على عاتق `init`.
          </div>
        </div>
        
        <div class="genesis-visualizer glass-panel mt-6">
          <div class="tree-container" dir="ltr">
            
            <!-- Level 1: Kernel -->
            <div class="tree-level">
              <div class="tree-node kernel-node">
                <span class="node-icon">⚙️</span>
                <div class="node-details">
                  <span class="node-title">seL4 Kernel</span>
                  <span class="node-ar-title">نواة النظام</span>
                  <span class="node-sub">Hardware Mode</span>
                </div>
              </div>
            </div>

            <div class="tree-trunk-main"></div>

            <!-- Level 2: Init (RootTask) -->
            <div class="tree-level">
              <div class="tree-node init-node pulse-cyan">
                <span class="node-icon">🌟</span>
                <div class="node-details">
                  <span class="node-title">Init (RootTask)</span>
                  <span class="node-ar-title">الحاوية الأم</span>
                  <span class="node-sub">PID 1 / User Space</span>
                </div>
              </div>
            </div>

            <!-- Branches -->
            <div class="tree-branches-container">
              <div class="tree-branch-line branch-left"></div>
              <div class="tree-branch-line branch-center"></div>
              <div class="tree-branch-line branch-right"></div>
            </div>

            <!-- Level 3: Resources -->
            <div class="tree-level resources-level">
              <div class="tree-node resource-node">
                <span class="node-icon">🧠</span>
                <div class="node-details">
                  <span class="node-title">Untyped Memory</span>
                  <span class="node-ar-title">الذاكرة الحرة</span>
                  <span class="node-sub">Allocator</span>
                </div>
              </div>
              <div class="tree-node resource-node">
                <span class="node-icon">🎫</span>
                <div class="node-details">
                  <span class="node-title">Slot Allocator</span>
                  <span class="node-ar-title">إدارة القدرات</span>
                  <span class="node-sub">Capabilities</span>
                </div>
              </div>
              <div class="tree-node resource-node">
                <span class="node-icon">🏗️</span>
                <div class="node-details">
                  <span class="node-title">ELF Loader</span>
                  <span class="node-ar-title">مُحمّل البرامج</span>
                  <span class="node-sub">Binary Parser</span>
                </div>
              </div>
            </div>

            <div class="tree-trunk-multi"></div>

            <!-- Level 4: Spawned Vaults -->
            <div class="tree-level vaults-level">
              <div class="vault-container">
                <div class="tree-node vault-node border-green">
                  <div class="vault-text">
                    <span class="node-title">Crypto</span>
                    <span class="node-ar-title">تشفير</span>
                  </div>
                </div>
                <div class="tree-node vault-node border-blue">
                  <div class="vault-text">
                    <span class="node-title">Net</span>
                    <span class="node-ar-title">الشبكة</span>
                  </div>
                </div>
                <div class="tree-node vault-node border-orange">
                  <div class="vault-text">
                    <span class="node-title">Disk</span>
                    <span class="node-ar-title">الأقراص</span>
                  </div>
                </div>
                <div class="tree-node vault-node border-yellow">
                  <div class="vault-text">
                    <span class="node-title">FS</span>
                    <span class="node-ar-title">نظام الملفات</span>
                  </div>
                </div>
                <div class="tree-node vault-node border-red">
                  <div class="vault-text">
                    <span class="node-title">Auth</span>
                    <span class="node-ar-title">الصلاحيات</span>
                  </div>
                </div>
                <div class="tree-node vault-node border-purple">
                  <div class="vault-text">
                    <span class="node-title">Bus</span>
                    <span class="node-ar-title">الناقل</span>
                  </div>
                </div>
                <div class="tree-node vault-node border-cyan">
                  <div class="vault-text">
                    <span class="node-title">Desktop</span>
                    <span class="node-ar-title">سطح المكتب</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Shared Memory Highlight -->
            <div class="shared-memory-link">
              <svg width="200" height="40" viewBox="0 0 200 40" class="sm-svg">
                <path d="M 0,0 C 50,40 150,40 200,0" stroke="#fde047" stroke-width="2" fill="none" stroke-dasharray="5,5" class="animated-path"/>
              </svg>
              <div class="sm-label">
                <span class="sm-en">Shared Memory (0x600000) mapped by Init</span>
                <span class="sm-ar">ذاكرة مشتركة تم تعيينها بواسطة Init</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      <!-- Flowchart Section -->
      <section class="init-section mt-10">
        <div class="section-header">
          <div class="sh-icon glow-purple">🌊</div>
          <h2 class="sh-title">دورة حياة الذاكرة (Memory Lifecycle)</h2>
          <div class="line-decorator-cyan"></div>
        </div>
        <div class="flowchart-container glass-panel mt-6" dir="ltr">
          <div class="fc-node fc-untyped">
            <span class="fc-icon">🧠</span>
            <span class="fc-text">Untyped Memory<br><small>(managed by talc)</small></span>
          </div>
          <div class="fc-arrow"><div class="fc-pulse"></div></div>
          
          <div class="fc-node fc-slot">
            <span class="fc-icon">🎫</span>
            <span class="fc-text">Slot Allocator<br><small>(Capabilities)</small></span>
          </div>
          <div class="fc-arrow"><div class="fc-pulse" style="animation-delay: 0.5s;"></div></div>

          <div class="fc-node fc-vspace">
            <span class="fc-icon">🗂️</span>
            <span class="fc-text">VSpace / CNode<br><small>(Memory Map)</small></span>
          </div>
          <div class="fc-arrow"><div class="fc-pulse" style="animation-delay: 1s;"></div></div>

          <div class="fc-node fc-elf">
            <span class="fc-icon">🧩</span>
            <span class="fc-text">ELF Loader<br><small>(xmas-elf)</small></span>
          </div>
          <div class="fc-arrow"><div class="fc-pulse" style="animation-delay: 1.5s;"></div></div>

          <div class="fc-node fc-container glow-cyan-box">
            <span class="fc-icon">🚀</span>
            <span class="fc-text">Ready Container<br><small>(User Space)</small></span>
          </div>
        </div>
      </section>

      <!-- Boot Sequence Terminal -->
      <section class="init-section mt-10">
        <div class="section-header">
          <div class="sh-icon glow-green">💻</div>
          <h2 class="sh-title">تسلسل الإقلاع (Live Boot Sequence)</h2>
          <div class="line-decorator-cyan"></div>
        </div>
        
        <div class="terminal-window glass-panel">
          <div class="tw-header">
            <div class="tw-dots"><span></span><span></span><span></span></div>
            <div class="tw-title">kernel_log_tty0</div>
            <div class="tw-action">dmesg</div>
          </div>
          <div class="tw-body" dir="ltr">
            <div v-for="(line, index) in terminalLines" :key="index" class="tw-line" :class="line.color">
              {{ line.text }}
            </div>
            <div class="tw-line text-yellow-300 mt-4 font-bold">> [Init] Launch request for: Terminal</div>
            <div class="tw-line text-purple-400 font-bold">> [Init] Loading Terminal ELF from Registry...</div>
            <div class="tw-cursor">_</div>
          </div>
        </div>
      </section>

      <!-- Message Tags Section -->
      <section class="init-section mt-10">
        <div class="section-header">
          <div class="sh-icon glow-blue">📡</div>
          <h2 class="sh-title">حلقة الاستماع (App Launcher IPC)</h2>
          <div class="line-decorator-cyan"></div>
        </div>
        <p class="sh-desc">بعد إقلاع النظام، تتحول حاوية <code>init</code> إلى خادم ينتظر طلبات تشغيل التطبيقات من حاوية <code>Desktop</code>.</p>
        <div class="tags-grid">
          <div v-for="(tag, i) in messageTags" :key="i" class="tag-row glass-panel hover-glow-cyan">
            <div class="tag-call" dir="ltr">{{ tag.call }}</div>
            <div class="tag-action">{{ tag.action }}</div>
          </div>
        </div>
      </section>

      <!-- Functions Section -->
      <section class="init-section mt-10">
        <div class="section-header">
          <div class="sh-icon glow-purple">⚙️</div>
          <h2 class="sh-title">المسؤوليات الجوهرية (Core Responsibilities)</h2>
          <div class="line-decorator-cyan"></div>
        </div>
        <div class="afp-list">
          <div v-for="fn in functions" :key="fn.id" class="fn-card glass-panel hover-glow-cyan">
            <div class="fn-glow-cyan"></div>
            <div class="fn-header">
              <span class="fn-id"># {{ fn.id }}</span>
              <div class="fn-icon">{{ fn.icon }}</div>
            </div>
            <div class="fn-content">
              <h2 class="fn-name">{{ fn.title }}</h2>
              <p class="fn-desc">{{ fn.desc }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Files Section -->
      <section class="init-section mt-10">
        <div class="section-header">
          <div class="sh-icon glow-orange">📁</div>
          <h2 class="sh-title">البنية البرمجية (Source Files)</h2>
          <div class="line-decorator-cyan"></div>
        </div>
        <div class="files-list">
          <div v-for="file in files" :key="file.id" class="file-card glass-panel hover-border-cyan">
            <div class="file-top-bar-cyan"></div>
            <div class="file-header">
              <div class="file-icon-box">{{ file.icon }}</div>
              <div class="file-meta">
                <div class="file-name-row">
                  <h2 class="file-name" dir="ltr">{{ file.name }}</h2>
                  <span class="file-tag">{{ file.tag }}</span>
                </div>
                <code class="file-path" dir="ltr">{{ file.path }}</code>
              </div>
              <div class="file-size" dir="ltr">{{ file.size }}</div>
            </div>

            <p class="file-desc">{{ file.desc }}</p>

            <div class="highlights-block">
              <div class="block-label">🔍 المكونات الأساسية</div>
              <div class="highlights-grid">
                <div v-for="(h, i) in file.highlights" :key="i" class="hl-item glass-inset">
                  <span class="hl-label">{{ h.label }}</span>
                  <div class="hl-value">{{ h.value }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Libraries Section -->
      <section class="init-section mt-10">
        <div class="section-header">
          <div class="sh-icon glow-yellow">📚</div>
          <h2 class="sh-title">المكتبات المساعدة (Dependencies)</h2>
          <div class="line-decorator-cyan"></div>
        </div>
        <div class="libs-grid">
          <div v-for="lib in libraries" :key="lib.id" class="lib-card glass-panel hover-float-cyan">
            <div class="lib-header">
              <div class="lib-id"># {{ lib.id }}</div>
              <div class="lib-icon-box">⚙️</div>
            </div>
            <h2 class="lib-name" dir="ltr">{{ lib.name }}</h2>
            <div class="lib-meta">
              <code class="meta-path" dir="ltr">{{ lib.path }}</code>
            </div>
            <div class="lib-tags mt-2">
              <span v-if="lib.is_external" class="pr-tag origin-tag tag-external">🌐 مكتبة خارجية</span>
              <span v-else class="pr-tag origin-tag tag-local">🛠️ مكتبتنا</span>
            </div>
            <p class="lib-desc mt-2">{{ lib.desc }}</p>
          </div>
        </div>
      </section>

    </main>
  </div>
</template>

<style scoped>
.origin-tag { font-weight: 800; border-width: 1px; font-size: 0.75rem; padding: 2px 8px; border-radius: 4px; display: inline-block; margin-bottom: 8px; }
.tag-local { background: color-mix(in srgb, #22c55e 15%, transparent) !important; color: #4ade80 !important; border-color: color-mix(in srgb, #22c55e 40%, transparent) !important; }
.tag-external { background: color-mix(in srgb, #f59e0b 15%, transparent) !important; color: #fbbf24 !important; border-color: color-mix(in srgb, #f59e0b 40%, transparent) !important; }

.init-root {
  position: relative;
  min-height: 100vh;
  padding: calc(var(--vp-nav-height) + 3rem) 1.5rem 8rem;
  font-family: 'Cairo', 'Inter', system-ui, sans-serif;
  color: #f8fafc;
  overflow: hidden;
  max-width: 1000px;
  margin: 0 auto;
}

/* ── Ambient Background ── */
.ambient-glow { position: absolute; border-radius: 50%; filter: blur(120px); pointer-events: none; z-index: 0; }
.glow-top { width: 800px; height: 800px; background: radial-gradient(circle, rgba(34, 211, 238, 0.08), transparent 70%); top: -200px; right: -200px; }
.glow-bottom { width: 900px; height: 900px; background: radial-gradient(circle, rgba(16, 185, 129, 0.06), transparent 70%); bottom: -300px; left: -300px; }
.stars-bg { position: absolute; inset: 0; z-index: 0; background-image: radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px); background-size: 50px 50px; opacity: 0.5; pointer-events: none; }

/* ── Glass Components ── */
.glass-panel { background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px); border: 1px solid rgba(255, 255, 255, 0.1); box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3); }
.glass-inset { background: rgba(0, 0, 0, 0.3); box-shadow: inset 0 2px 8px rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.05); }

/* Hover Effects (Cyan/Green Theme) */
.hover-glow-cyan:hover { border-color: rgba(34, 211, 238, 0.4); box-shadow: 0 10px 40px rgba(34, 211, 238, 0.15); transform: translateY(-2px); }
.hover-border-cyan:hover { border-color: rgba(34, 211, 238, 0.5); box-shadow: 0 15px 40px rgba(0,0,0,0.4); transform: translateY(-4px); }
.hover-float-cyan:hover { transform: translateY(-6px); border-color: rgba(16, 185, 129, 0.4); box-shadow: 0 20px 40px rgba(0,0,0,0.3); }
.mt-6 { margin-top: 1.5rem; }
.mt-10 { margin-top: 5rem; }

/* ── Header ── */
.init-header { position: relative; z-index: 1; text-align: center; margin-bottom: 5rem; }
.init-badge-container { display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap; margin-bottom: 2rem; }
.init-badge { display: inline-flex; align-items: center; gap: 0.5rem; font-size: 0.75rem; font-weight: 800; letter-spacing: 0.2em; color: rgba(248, 250, 252, 0.9); border: 1px solid rgba(34, 211, 238, 0.4); border-radius: 100px; padding: 0.6rem 1.5rem; background: rgba(34, 211, 238, 0.1); backdrop-filter: blur(12px); box-shadow: 0 0 20px rgba(34, 211, 238, 0.2); }
.genesis-badge { display: inline-flex; align-items: center; gap: 0.5rem; font-size: 0.75rem; font-weight: 800; letter-spacing: 0.1em; color: #6ee7b7; border-radius: 100px; padding: 0.6rem 1.5rem; background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.4); }
.glow-cyan-box { box-shadow: 0 0 25px rgba(16, 185, 129, 0.25); }
.badge-pulse { width: 8px; height: 8px; border-radius: 50%; background: #22d3ee; box-shadow: 0 0 12px #22d3ee, 0 0 20px #22d3ee; animation: pulse-cyan 2s infinite; }
@keyframes pulse-cyan { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.5); } }

/* Init Animated Icon */
.init-icon-wrapper { position: relative; width: 140px; height: 140px; margin: 0 auto 1.5rem; display: flex; align-items: center; justify-content: center; }
.core-orb { position: absolute; inset: 20px; border-radius: 50%; background: radial-gradient(circle, rgba(34, 211, 238, 0.4) 0%, transparent 70%); box-shadow: 0 0 40px rgba(34, 211, 238, 0.3); animation: pulse-core 3s ease-in-out infinite alternate; }
.orbit-path { position: absolute; border: 1px solid rgba(255,255,255,0.1); border-radius: 50%; }
.path-1 { inset: -10px; animation: orbit-spin 8s linear infinite; border-top-color: rgba(34, 211, 238, 0.8); }
.path-2 { inset: -25px; animation: orbit-spin-rev 12s linear infinite; border-bottom-color: rgba(16, 185, 129, 0.8); }
.path-3 { inset: -40px; animation: orbit-spin 18s linear infinite; border-left-color: rgba(250, 204, 21, 0.8); border-style: dashed; }
.satellite { position: absolute; width: 8px; height: 8px; border-radius: 50%; top: -4px; left: 50%; transform: translateX(-50%); }
.sat-1 { background: #22d3ee; box-shadow: 0 0 10px #22d3ee; }
.sat-2 { background: #10b981; box-shadow: 0 0 10px #10b981; }
.sat-3 { background: #facc15; box-shadow: 0 0 10px #facc15; }
.init-main-icon { font-size: 4rem; z-index: 2; filter: drop-shadow(0 0 15px rgba(255,255,255,0.8)); }
@keyframes orbit-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
@keyframes orbit-spin-rev { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
@keyframes pulse-core { from { transform: scale(0.9); opacity: 0.6; } to { transform: scale(1.1); opacity: 1; } }

.init-title { font-size: clamp(3rem, 7vw, 4.5rem); font-weight: 900; line-height: 1.2; margin: 0 0 1.5rem; letter-spacing: -0.02em; }
.gradient-text-white { background: linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.gradient-text-cyan { background: linear-gradient(135deg, #22d3ee 0%, #38bdf8 50%, #818cf8 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; filter: drop-shadow(0 0 30px rgba(34,211,238,0.4)); }
.init-subtitle { font-size: 1.25rem; color: rgba(248, 250, 252, 0.75); max-width: 800px; margin: 0 auto 3rem; line-height: 1.8; }

.init-stats-bar { display: flex; align-items: center; justify-content: center; gap: 2rem; padding: 1.2rem 2.5rem; background: linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%); border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 100px; backdrop-filter: blur(24px); width: fit-content; margin: 0 auto; box-shadow: 0 20px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1); flex-wrap: wrap; }
.stat-pill { display: flex; align-items: center; gap: 0.85rem; font-size: 1rem; }
.stat-icon { font-size: 1.3rem; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5)); }
.stat-val { font-weight: 900; color: #fff; letter-spacing: 0.05em; }
.stat-tag { font-size: 0.75rem; padding: 0.3rem 0.75rem; border-radius: 8px; background: rgba(34, 211, 238, 0.2); color: #a5f3fc; font-weight: 800; border: 1px solid rgba(34, 211, 238, 0.4); text-transform: uppercase; }
.bg-cyan { background: rgba(56, 189, 248, 0.2); color: #bae6fd; border-color: rgba(56, 189, 248, 0.4); }
.stat-divider { width: 2px; height: 30px; background: rgba(255,255,255,0.1); border-radius: 2px; }

/* ── Content Sections ── */
.init-content { position: relative; z-index: 1; display: flex; flex-direction: column; gap: 2rem; }
.section-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 0.5rem; position: relative; }
.sh-icon { font-size: 1.8rem; background: rgba(255,255,255,0.05); width: 55px; height: 55px; display: flex; align-items: center; justify-content: center; border-radius: 16px; border: 1px solid rgba(255,255,255,0.1); position: relative; z-index: 2; }
.glow-cyan { box-shadow: 0 0 20px rgba(34,211,238,0.3); border-color: rgba(34,211,238,0.5); }
.glow-green { box-shadow: 0 0 20px rgba(16,185,129,0.3); border-color: rgba(16,185,129,0.5); }
.glow-blue { box-shadow: 0 0 20px rgba(59,130,246,0.3); border-color: rgba(59,130,246,0.5); }
.glow-purple { box-shadow: 0 0 20px rgba(168,85,247,0.3); border-color: rgba(168,85,247,0.5); }
.glow-orange { box-shadow: 0 0 20px rgba(249,115,22,0.3); border-color: rgba(249,115,22,0.5); }
.glow-yellow { box-shadow: 0 0 20px rgba(234,179,8,0.3); border-color: rgba(234,179,8,0.5); }
.glow-red { box-shadow: 0 0 20px rgba(239,68,68,0.3); border-color: rgba(239,68,68,0.5); }

.sh-title { font-size: 2rem; font-weight: 900; color: #fff; margin: 0; z-index: 2; letter-spacing: -0.02em; }
.line-decorator-cyan { flex: 1; height: 1px; background: linear-gradient(90deg, rgba(34,211,238,0.3), transparent); z-index: 1; margin-left: 1rem; }
.sh-desc { font-size: 1.1rem; color: rgba(248,250,252,0.65); margin: 0 0 2rem 5rem; }

/* ── Philosophical Note ── */
.philosophical-note-init { display: flex; gap: 1.5rem; padding: 1.5rem 2rem; border-radius: 16px; border-right: 4px solid #22d3ee; align-items: flex-start; }
.pn-icon { font-size: 2.5rem; flex-shrink: 0; filter: drop-shadow(0 0 10px rgba(34,211,238,0.4)); }
.pn-text { font-size: 1.05rem; line-height: 1.8; color: rgba(248,250,252,0.85); }
.pn-text strong { display: block; font-size: 1.2rem; color: #67e8f9; margin-bottom: 0.5rem; }

/* ── The Genesis Tree Visualizer ── */
.genesis-visualizer { padding: 3rem; border-radius: 24px; position: relative; overflow: hidden; background: rgba(15,23,42,0.7); }
.tree-container { display: flex; flex-direction: column; align-items: center; width: 100%; position: relative; font-family: 'Inter', system-ui, sans-serif; }
.tree-level { display: flex; justify-content: center; gap: 2rem; width: 100%; z-index: 2; }

.tree-node { display: flex; align-items: center; gap: 1rem; padding: 1rem 1.5rem; border-radius: 16px; background: rgba(30,41,59,0.9); border: 1px solid rgba(255,255,255,0.1); box-shadow: 0 10px 20px rgba(0,0,0,0.3); transition: all 0.3s; }
.tree-node:hover { transform: translateY(-3px); box-shadow: 0 15px 30px rgba(0,0,0,0.4); }
.node-icon { font-size: 2rem; }
.node-details { display: flex; flex-direction: column; }
.node-title { font-weight: 900; font-size: 1.1rem; color: #fff; }
.node-ar-title { font-family: 'Cairo', sans-serif; font-size: 0.9rem; font-weight: 700; color: #a5f3fc; margin-top: 0.1rem; letter-spacing: 0; }
.node-sub { font-family: 'Space Mono', monospace; font-size: 0.75rem; color: rgba(255,255,255,0.5); margin-top: 0.2rem; }

/* Specific Nodes */
.kernel-node { border-color: rgba(148,163,184,0.4); border-style: dashed; }
.init-node { background: rgba(34,211,238,0.15); border-color: rgba(34,211,238,0.5); padding: 1.25rem 2rem; }
.pulse-cyan { box-shadow: 0 0 30px rgba(34,211,238,0.3); }
.pulse-cyan .node-title { color: #a5f3fc; font-size: 1.3rem; }
.resource-node { flex-direction: column; text-align: center; gap: 0.5rem; padding: 1rem; width: 180px; }
.resource-node .node-icon { font-size: 2.5rem; }

/* Lines and Trunks */
.tree-trunk-main { width: 3px; height: 40px; background: linear-gradient(180deg, rgba(255,255,255,0.2), rgba(34,211,238,0.5)); margin: 0 auto; z-index: 1; }
.tree-branches-container { position: relative; width: 420px; height: 40px; margin: 0 auto; }
.tree-branch-line { position: absolute; top: 0; background: rgba(34,211,238,0.3); }
.branch-center { width: 3px; height: 100%; left: 50%; transform: translateX(-50%); }
.branch-left { width: 210px; height: 3px; top: 20px; left: 0; border-radius: 3px 0 0 3px; }
.branch-left::before { content: ''; position: absolute; width: 3px; height: 20px; background: inherit; left: 0; top: 0; }
.branch-right { width: 210px; height: 3px; top: 20px; right: 0; border-radius: 0 3px 3px 0; }
.branch-right::before { content: ''; position: absolute; width: 3px; height: 20px; background: inherit; right: 0; top: 0; }

.tree-trunk-multi { width: 3px; height: 40px; background: rgba(34,211,238,0.3); margin: 0 auto; z-index: 1; }
.vaults-level { width: 100%; max-width: 900px; }
.vault-container { display: flex; flex-wrap: wrap; justify-content: center; gap: 1rem; width: 100%; position: relative; padding-top: 20px; border-top: 3px solid rgba(34,211,238,0.2); }
.vault-container::before { content: ''; position: absolute; top: -3px; left: 50%; transform: translateX(-50%); width: 3px; height: 20px; background: rgba(34,211,238,0.3); }
.vault-node { flex-direction: row; justify-content: center; padding: 0.75rem 1.25rem; background: rgba(15,23,42,0.8); border-width: 2px; }
.vault-text { display: flex; flex-direction: column; align-items: center; }

/* Vault colors */
.border-green { border-color: rgba(34,197,94,0.6); }
.border-blue { border-color: rgba(59,130,246,0.6); }
.border-orange { border-color: rgba(249,115,22,0.6); }
.border-yellow { border-color: rgba(234,179,8,0.6); }
.border-red { border-color: rgba(239,68,68,0.6); }
.border-purple { border-color: rgba(168,85,247,0.6); }
.border-cyan { border-color: rgba(6,182,212,0.6); }

/* Shared memory */
.shared-memory-link { margin-top: 1rem; text-align: center; position: relative; display: flex; flex-direction: column; align-items: center; }
.sm-label { display: flex; flex-direction: column; align-items: center; background: rgba(234,179,8,0.15); padding: 0.4rem 1rem; border-radius: 12px; border: 1px solid rgba(234,179,8,0.3); margin-top: -10px; z-index: 2; }
.sm-en { font-family: 'Space Mono', monospace; font-size: 0.8rem; color: #fef08a; }
.sm-ar { font-family: 'Cairo', sans-serif; font-size: 0.8rem; font-weight: 700; color: #fde047; margin-top: 0.2rem; letter-spacing: 0; }
.animated-path { animation: dash 2s linear infinite; }
@keyframes dash { to { stroke-dashoffset: -10; } }

/* ── Terminal Window ── */
.terminal-window { border-radius: 16px; overflow: hidden; padding: 0; }
.tw-header { display: flex; align-items: center; justify-content: space-between; padding: 0.85rem 1.25rem; background: rgba(0,0,0,0.5); border-bottom: 1px solid rgba(255,255,255,0.1); }
.tw-dots { display: flex; gap: 8px; }
.tw-dots span { width: 14px; height: 14px; border-radius: 50%; }
.tw-dots span:nth-child(1) { background: #ff5f56; }
.tw-dots span:nth-child(2) { background: #ffbd2e; }
.tw-dots span:nth-child(3) { background: #27c93f; }
.tw-title { font-family: 'Space Mono', monospace; font-size: 0.85rem; color: rgba(255,255,255,0.5); font-weight: 700; }
.tw-action { font-family: 'Space Mono', monospace; font-size: 0.8rem; color: rgba(255,255,255,0.4); background: rgba(255,255,255,0.1); padding: 0.2rem 0.6rem; border-radius: 6px; }
.tw-body { padding: 2rem; font-family: 'Space Mono', monospace; font-size: 0.95rem; line-height: 1.7; background: rgba(0,0,0,0.3); overflow-x: auto; }
.tw-line { margin-bottom: 0.35rem; text-shadow: 0 0 5px rgba(255,255,255,0.1); }
.tw-cursor { display: inline-block; width: 10px; height: 18px; background: #fff; animation: blink 1s step-end infinite; margin-top: 1rem; }
@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
.text-gray-500 { color: #64748b; }
.text-gray-600 { color: #475569; }
.text-cyan-400 { color: #22d3ee; text-shadow: 0 0 10px rgba(34,211,238,0.4); }
.text-cyan-300 { color: #67e8f9; text-shadow: 0 0 10px rgba(103,232,249,0.4); }
.text-blue-300 { color: #93c5fd; }
.text-green-400 { color: #4ade80; }
.text-yellow-300 { color: #fde047; }
.text-purple-400 { color: #c084fc; }

/* ── Tags Grid ── */
.tags-grid { display: flex; flex-direction: column; gap: 0.75rem; }
.tag-row { display: flex; align-items: center; gap: 1.5rem; padding: 1.25rem 1.75rem; border-radius: 16px; transition: all 0.3s ease; }
.tag-call { flex-basis: 260px; flex-shrink: 0; font-family: 'Space Mono', monospace; font-size: 1rem; font-weight: 800; color: #22d3ee; background: rgba(34,211,238,0.1); padding: 0.5rem 1rem; border-radius: 8px; border: 1px solid rgba(34,211,238,0.2); text-align: center; }
.tag-action { flex: 1; font-size: 1.05rem; color: rgba(248,250,252,0.9); line-height: 1.7; }

/* ── Functions List ── */
.afp-list { display: grid; grid-template-columns: repeat(auto-fill, minmax(400px, 1fr)); gap: 1.5rem; }
.fn-card { border-radius: 20px; padding: 2rem; display: flex; flex-direction: column; gap: 1.25rem; transition: all 0.4s ease; position: relative; overflow: hidden; }
.fn-header { display: flex; align-items: center; gap: 1rem; }
.fn-id { font-size: 0.8rem; font-weight: 900; color: #22d3ee; background: rgba(34,211,238,0.15); padding: 0.3rem 0.75rem; border-radius: 8px; border: 1px solid rgba(34,211,238,0.3); }
.fn-icon { font-size: 2.5rem; filter: drop-shadow(0 4px 8px rgba(0,0,0,0.4)); }
.fn-name { font-size: 1.3rem; font-weight: 900; color: #fff; margin: 0; line-height: 1.4; }
.fn-desc { font-size: 1.05rem; line-height: 1.7; color: rgba(248,250,252,0.8); margin: 0; }
.fn-glow-cyan { position: absolute; top: -50px; right: -50px; width: 100px; height: 100px; background: rgba(34,211,238,0.2); filter: blur(40px); border-radius: 50%; }

/* ── Files List ── */
.files-list { display: flex; flex-direction: column; gap: 2rem; }
.file-card { border-radius: 24px; padding: 2.5rem; position: relative; overflow: hidden; transition: all 0.4s ease; }
.file-top-bar-cyan { position: absolute; top: 0; left: 0; right: 0; height: 4px; background: linear-gradient(90deg, transparent, rgba(34,211,238,0.8), transparent); }
.file-header { display: flex; align-items: center; gap: 1.5rem; margin-bottom: 2rem; }
.file-icon-box { font-size: 3rem; width: 70px; height: 70px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; display: flex; align-items: center; justify-content: center; box-shadow: inset 0 0 20px rgba(255,255,255,0.02); }
.file-meta { flex: 1; }
.file-name-row { display: flex; align-items: center; gap: 1rem; margin-bottom: 0.5rem; flex-wrap: wrap; }
.file-name { font-size: 1.8rem; font-weight: 900; color: #fff; margin: 0; font-family: 'Space Mono', monospace; }
.file-tag { font-size: 0.8rem; font-weight: 800; padding: 0.3rem 1rem; border-radius: 8px; background: rgba(34,211,238,0.15); color: #67e8f9; border: 1px solid rgba(34,211,238,0.4); text-transform: uppercase; }
.file-path { font-family: 'Space Mono', monospace; font-size: 0.95rem; color: #a5f3fc; background: rgba(34,211,238,0.1) !important; padding: 0.3rem 0.8rem !important; border-radius: 8px; border: 1px solid rgba(34,211,238,0.2); }
.file-size { font-size: 1rem; color: rgba(255,255,255,0.5); font-weight: 800; background: rgba(0,0,0,0.3); padding: 0.5rem 1rem; border-radius: 12px; }
.file-desc { font-size: 1.1rem; line-height: 1.8; color: rgba(248,250,252,0.85); margin: 0 0 2rem; padding: 1.5rem; background: rgba(0,0,0,0.3); border-radius: 16px; border-right: 4px solid #22d3ee; }
.block-label { font-size: 0.9rem; font-weight: 900; color: rgba(255,255,255,0.6); letter-spacing: 0.1em; margin-bottom: 1.25rem; text-transform: uppercase; }
.highlights-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1rem; }
.hl-item { display: flex; flex-direction: column; gap: 0.6rem; border-radius: 12px; padding: 1rem 1.25rem; transition: border-color 0.3s ease; }
.hl-label { font-size: 0.8rem; font-weight: 800; color: rgba(255,255,255,0.5); text-transform: uppercase; }
.hl-value { font-family: 'Cairo', 'Space Mono', monospace; font-size: 0.95rem; font-weight: 700; color: #67e8f9; line-height: 1.6; word-wrap: break-word; }

/* ── Libraries List ── */
.libs-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(400px, 1fr)); gap: 1.5rem; }
.lib-card { border-radius: 24px; padding: 2rem; transition: all 0.4s ease; display: flex; flex-direction: column; gap: 1rem; }
.lib-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem; }
.lib-id { font-size: 0.9rem; font-weight: 900; color: #22d3ee; background: rgba(34,211,238,0.15); padding: 0.3rem 0.8rem; border-radius: 8px; border: 1px solid rgba(34,211,238,0.3); }
.lib-icon-box { width: 50px; height: 50px; border-radius: 14px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center; font-size: 1.8rem; }
.lib-name { font-size: 1.6rem; font-weight: 900; color: #fff; margin: 0; font-family: 'Space Mono', monospace; }
.lib-meta { display: flex; align-items: center; gap: 0.5rem; }
.meta-path { font-family: 'Space Mono', monospace; font-size: 0.9rem; color: #6ee7b7; background: rgba(16,185,129,0.1) !important; padding: 0.3rem 0.8rem !important; border-radius: 8px; border: 1px solid rgba(16,185,129,0.2); }
.lib-desc { font-size: 1.05rem; line-height: 1.7; color: rgba(248,250,252,0.8); margin: 0; margin-top: auto; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.1); }

@media (max-width: 900px) {
  .afp-list, .libs-grid { grid-template-columns: 1fr; }
  .init-stats-bar { flex-direction: column; border-radius: 24px; gap: 1rem; padding: 1.5rem 3rem; }
  .stat-divider { display: none; }
  .tag-row { flex-direction: column; align-items: flex-start; gap: 1rem; }
  .tag-call { width: 100%; flex-basis: auto; }
  
  /* Tree adjustments */
  .tree-branches-container { width: 280px; }
  .branch-left { width: 140px; }
  .branch-right { width: 140px; }
  .resource-node { width: 120px; }
}
@media (max-width: 640px) {
  .file-header { flex-direction: column; align-items: flex-start; }
  .genesis-badge { align-self: center; }
}

/* ── Flowchart ── */
.flowchart-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 3rem 2rem;
  overflow-x: auto;
  border-radius: 16px;
}
.fc-node {
  background: rgba(30, 41, 59, 0.7);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 12px;
  padding: 1.5rem 1rem;
  text-align: center;
  min-width: 140px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.3);
  z-index: 2;
  position: relative;
}
.fc-icon { font-size: 2rem; }
.fc-text { font-family: monospace; font-size: 0.9rem; font-weight: bold; color: #e2e8f0; }
.fc-text small { color: #94a3b8; font-size: 0.7rem; display: block; margin-top: 4px; }
.fc-arrow {
  flex: 1;
  height: 4px;
  background: rgba(255,255,255,0.1);
  position: relative;
  min-width: 40px;
  margin: 0 10px;
}
.fc-pulse {
  position: absolute;
  top: -3px;
  left: 0;
  width: 10px;
  height: 10px;
  background: #22d3ee;
  border-radius: 50%;
  box-shadow: 0 0 10px #22d3ee, 0 0 20px #22d3ee;
  animation: pulse-move 2s infinite linear;
}
@keyframes pulse-move {
  0% { left: 0; opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { left: calc(100% - 10px); opacity: 0; }
}
.fc-container { border-color: #22d3ee; }
.fc-untyped { border-color: #f59e0b; }
.fc-slot { border-color: #10b981; }
.fc-vspace { border-color: #8b5cf6; }
.fc-elf { border-color: #f43f5e; }

@media (max-width: 640px) {
  .file-header { flex-direction: column; align-items: flex-start; }
  .highlights-grid { grid-template-columns: 1fr; }
  .sh-desc { margin-left: 0; }
  .philosophical-note-init { flex-direction: column; }
  
  /* Tree adjustments */
  .tree-branches-container { display: none; }
  .resources-level { flex-direction: column; align-items: center; gap: 1rem; }
  .resource-node { width: 100%; max-width: 250px; flex-direction: row; text-align: left; }
  .tree-trunk-multi { height: 20px; }
  .vault-container { flex-direction: column; align-items: center; }
  .vault-node { width: 100%; max-width: 250px; }
}
</style>
