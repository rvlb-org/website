<script setup>
import { ref, onMounted } from 'vue'

const messageTags = [
  { call: '0x100 (Request Token)', action: 'يستقبل app_id في mr[1] ويُولّد PolicyBadge بصلاحية ReadWrite لمسار /home/user ويُعيده في reply.mr[1].' },
  { call: '_ (Unknown)', action: 'يلتقط أي أمر غير معروف ويرد بـ Err لحماية النظام من الطلبات الغير شرعية.' }
]

const functions = [
  { id: '01', icon: '🏛️', title: 'مصدر الثقة الأمني الوحيد (Single Trusted Authority)', desc: 'تعمل كـ Trusted Authority مركزي — المصدر الوحيد في النظام المخوّل بإصدار تذاكر الأمان. لا يمكن لأي تطبيق الوصول لـ FS_Vault بدون الحصول على Badge صادر منها أولاً.' },
  { id: '02', icon: '🛡️', title: 'إدارة الصلاحيات في الـ User Space', desc: 'نظراً لأن نواة seL4 مثبتة رياضياً (Mathematically Proven) بأنها آمنة، فلا حاجة لتعقيد النواة بإدارة الصلاحيات. تتم إدارة جميع السياسات في الـ User Space عبر هذه الحاوية.' },
  { id: '03', icon: '🎫', title: 'توليد تذاكر الأمان (Security Token Generation)', desc: 'تُولّد PolicyBadge مُشفَّرة تحمل هوية التطبيق (app_id) وصلاحياته (Permission) وهاش المسار المسموح به (FNV-1a). تُعاد كرقم 64-bit واحد يحمل كل هذه المعلومات مضغوطة.' },
  { id: '04', icon: '🔐', title: 'ترميز الصلاحيات في 64-bit (Badge Word Encoding)', desc: 'تُرمّز كل صلاحية في كلمة 64-bit واحدة: الـ 16 bit العليا = app_id | الـ 8 bits التالية = نوع الصلاحية | الـ 32 bit السفلى = hash المسار. هذا يجعل التحقق من الـ Badge عملية بسيطة وسريعة جداً.' },
  { id: '05', icon: '#️⃣', title: 'تشفير المسارات بخوارزمية FNV-1a', desc: 'تستخدم خوارزمية FNV-1a 32-bit لتحويل مسارات الملفات (مثل /home/user) إلى أرقام hash ثابتة وفريدة. يجب أن يتطابق الـ hash بين ما تُصدره auth وما تتحقق منه FS_Vault لقبول أي طلب.' },
  { id: '06', icon: '🔄', title: 'إدارة دورة حياة الـ Allocator (BumpAllocator)', desc: 'تمتلك Global Allocator خاص بها (BumpAllocator) للذاكرة الديناميكية. هذا يُميّزها عن باقي الحاويات ويسمح لها بتخصيص هياكل بيانات Policy أكثر تعقيداً مستقبلاً.' },
  { id: '07', icon: '🔑', title: 'إدارة Capability Slots الأمنية', desc: 'تحتفظ بـ Slot 0 لاستماع طلبات التوثيق وSlot 1 محجوز لـ FS_Vault لحفظ سجلات الأمان مستقبلاً. هذا الفصل يضمن أن Auth_Vault لا تملك صلاحيات أكثر مما تحتاجه.' },
  { id: '08', icon: '⚠️', title: 'رفض الطلبات المجهولة (Unknown Request Rejection)', desc: 'أي أمر خارج النطاق المعروف يُرفض فوراً بـ MessageTag::Err. هذا يحمي النظام من أي محاولة للوصول عبر أوامر غير موثقة أو هجمات من نوع command injection.' }
]

const files = [
  {
    id: '01', name: 'src/main.rs', path: 'containers/auth/src/main.rs', icon: '🦀', tag: 'Entry Point', size: '~75 سطر',
    desc: 'الملف الرئيسي لحاوية Auth_Vault. يحتوي على نقطة الدخول _start التي تُفوّض إلى rust_main، وحلقة الخدمة التي تستقبل طلبات التوثيق وتُولّد PolicyBadge مُشفَّرة.',
    highlights: [
      { label: 'نقطة الدخول', value: '_start → rust_main()' },
      { label: 'Global Allocator', value: 'BumpAllocator' },
      { label: 'الأمر الوحيد', value: '0x100 (Request Token)' },
      { label: 'الرد', value: 'reply.mr[1] = badge.to_badge_word()' },
    ],
    sections: [
      { title: 'PolicyBadge::new()', desc: 'تُولّد badge بـ: app_id + Permission::ReadWrite + hash_path("/home/user")' },
      { title: 'معالجة الأخطاء', desc: 'أي أمر مجهول يُعيد MessageTag::Err فوراً' },
    ]
  },
  {
    id: '02', name: 'Cargo.toml', path: 'containers/auth/Cargo.toml', icon: '📦', tag: 'Package Config', size: '~16 سطر',
    desc: 'ملف إعداد حزمة auth. يُعرّف 4 اعتماديات — أكثر من أي حاوية أخرى بسبب احتياجها لـ BumpAllocator و security-policy.',
    highlights: [
      { label: 'الاسم', value: 'auth (v0.1.0)' },
      { label: 'bump-alloc', value: 'path = "../../libs/bump-alloc"' },
      { label: 'security-policy', value: 'path = "../../libs/security-policy"' },
    ],
    sections: [
      { title: 'Profile Release', desc: 'opt-level = 3 | lto = true | panic = "abort"' },
    ]
  },
  {
    id: '03', name: '.cargo/config.toml', path: 'containers/auth/.cargo/config.toml', icon: '⚙️', tag: 'Build Config', size: '~9 سطور',
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

const libraries = [
  { id: '01', name: 'sel4-sys', path: 'libs/sel4-sys', tag: 'seL4 Low-Level Binding', desc: 'ربط المستوى المنخفض مع نواة seL4. تُوفر نداءات النظام اللازمة للتواصل مع الـ Kernel فقط للمهام الأساسية.' },
  { id: '02', name: 'ipc-sync', path: 'libs/ipc-sync', tag: 'Internal IPC Library', desc: 'مكتبة داخلية لتوحيد بناء هياكل IpcMessage ولف عمليات Receiver.serve().' },
  { id: '03', name: 'bump-alloc', path: 'libs/bump-alloc', tag: 'Dynamic Memory Allocator', desc: 'Bump Allocator بسيط وسريع كـ Global Allocator لبيئة no_std في الـ User Space.' },
  { id: '04', name: 'security-policy', path: 'libs/security-policy', tag: 'Shared Security Library', desc: 'تُعرّف هيكل PolicyBadge ودالة hash_path() بخوارزمية FNV-1a 32-bit.' }
]

const terminalLines = ref([
  { text: '[Auth_Vault] ===========================================', color: 'text-gray-500' },
  { text: '[Auth_Vault]  seL4-Vault Security & Policy Container v0.1', color: 'text-red-400 font-bold' },
  { text: '[Auth_Vault] ===========================================', color: 'text-gray-500' },
  { text: '[Auth_Vault] [USER SPACE] Initializing policies isolated from Kernel...', color: 'text-blue-300 font-bold' },
  { text: '[Auth_Vault] Loading Global BumpAllocator...', color: 'text-blue-300' },
  { text: '[Auth_Vault] Setting up Endpoint Capability in Slot 0...', color: 'text-purple-300' },
  { text: '[Auth_Vault] Ready. Entering IPC event loop...', color: 'text-green-400' },
  { text: '--------------------------------------------------------', color: 'text-gray-600' }
])

const rustSnippet = `impl PolicyBadge {
    pub fn new(app_id: u16, permission: Permission, path_hash: u32) -> Self {
        Self { app_id, permission, path_hash }
    }
    
    // ضغط البيانات في كلمة 64-bit واحدة
    pub fn to_badge_word(&self) -> u64 {
        ((self.app_id as u64) << 48) |
        ((self.permission as u8 as u64) << 32) |
        (self.path_hash as u64)
    }
}`
</script>

<template>
  <div class="auth-root">
    <!-- Animated background grid and floating particles -->
    <div class="bg-grid"></div>
    <div class="particles">
      <div v-for="i in 15" :key="i" class="particle" :style="`--x: ${Math.random() * 100}vw; --y: ${Math.random() * 100}vh; --d: ${Math.random() * 5 + 3}s; --s: ${Math.random() * 4 + 2}px;`"></div>
    </div>

    <!-- Header Section -->
    <header class="auth-header">
      <div class="auth-badge-container">
        <div class="auth-badge">
          <span class="badge-dot"></span>
          <span>HISN-SEL4 SECURITY LAYER</span>
        </div>
        <div class="user-space-badge glow-purple-box">
          <span class="us-icon">🛡️</span>
          <span>100% User Space Isolated</span>
        </div>
      </div>

      <div class="auth-icon-wrapper">
        <div class="icon-ring ring-outer"></div>
        <div class="icon-ring ring-inner"></div>
        <div class="icon-pulse"></div>
        <div class="icon-orbit orbit-1"><div class="orbit-dot"></div></div>
        <div class="icon-orbit orbit-2"><div class="orbit-dot"></div></div>
        <span class="auth-main-icon">🔑</span>
      </div>

      <h1 class="auth-title">
        <span class="gradient-text-white">حاوية </span>
        <span class="gradient-text-red">auth</span>
      </h1>

      <p class="auth-subtitle">
        قلب الأمان النابض في النظام. مسؤولة حصرياً عن توليد <strong>تذاكر الأمان (PolicyBadges)</strong> وتشفير السياسات في مساحة المستخدم 
        <strong class="text-red-400">(User Space)</strong> لتعزيز مبدأ العزل التام.
      </p>

      <div class="auth-stats-bar">
        <div class="stat-pill"><span class="stat-icon">🔑</span><span class="stat-val">Trusted Authority</span><span class="stat-tag">Level 1</span></div>
        <div class="stat-divider"></div>
        <div class="stat-pill"><span class="stat-icon">🎫</span><span class="stat-val">PolicyBadge</span><span class="stat-tag">64-bit Token</span></div>
        <div class="stat-divider"></div>
        <div class="stat-pill"><span class="stat-icon">#️⃣</span><span class="stat-val">FNV-1a</span><span class="stat-tag">Hashing</span></div>
        <div class="stat-divider"></div>
        <div class="stat-pill"><span class="stat-icon">🔒</span><span class="stat-val">Isolated</span><span class="stat-tag bg-purple">User Space</span></div>
      </div>
    </header>

    <main class="auth-content">

      <!-- Architecture Visualizer (Aesthetic Addition) -->
      <section class="auth-section">
        <div class="section-header">
          <div class="sh-icon glow-blue">🔄</div>
          <h2 class="sh-title">فلسفة الأمان (User Space Flow)</h2>
          <div class="line-decorator"></div>
        </div>
        
        <div class="philosophical-note glass-panel">
          <div class="pn-icon">🧠</div>
          <div class="pn-text">
            <strong>لماذا في الـ User Space؟</strong>
            نواة <code>seL4</code> مُثبتة رياضياً (Mathematically Proven) بأنها آمنة تماماً وخالية من الثغرات. لذلك، إضافة أي منطق لإدارة صلاحيات الملفات داخل النواة سيزيد من تعقيدها ويُهدد هذا الإثبات الرياضي. بدلاً من ذلك، نستخدم النواة فقط لتمرير الرسائل (IPC)، ونبني نظام الصلاحيات بالكامل كحاوية معزولة في <strong>User Space</strong>!
          </div>
        </div>
        
        <div class="architecture-flow glass-panel mt-6">
          <div class="arch-layer kernel-layer">
            <span class="layer-label">seL4 Kernel (Kernel Space)</span>
            <p class="layer-desc">نواة مثبتة رياضياً: دورها يقتصر على تأمين قنوات الاتصال (IPC) بصرامة، ولا تفهم معنى "ملف" أو "صلاحية".</p>
          </div>
          
          <div class="arch-separator">
            <div class="dashed-line"></div>
            <span class="sep-text">Boundary (العزل الصارم)</span>
            <div class="dashed-line"></div>
          </div>

          <div class="arch-layer user-layer">
            <span class="layer-label text-purple-400">User Space (مساحة المستخدم)</span>
            
            <div class="new-flow-diagram" dir="ltr">
              <!-- Step 1 & 2 -->
              <div class="flow-row">
                <div class="flow-node app-node">
                  <span class="node-title">App</span>
                  <span class="node-sub">(ID: 0x4B2)</span>
                </div>
                
                <div class="flow-path horizontal">
                  <div class="path-line"></div>
                  <div class="path-msg forward">
                    <span class="msg-num">1</span>
                    <span class="msg-text">Request Token</span>
                    <span class="msg-arrow">➔</span>
                  </div>
                  <div class="path-msg backward">
                    <span class="msg-arrow">←</span>
                    <span class="msg-text">Returns Badge</span>
                    <span class="msg-num">2</span>
                  </div>
                </div>

                <div class="flow-node auth-node glow-red-box">
                  <span class="node-icon">🔑</span>
                  <span class="node-title">Auth Vault</span>
                </div>
              </div>

              <!-- Step 3 & 4 -->
              <div class="flow-row mt-8">
                <div class="flow-node app-node">
                  <span class="node-title">App</span>
                  <span class="node-sub">Has Badge</span>
                </div>
                
                <div class="flow-path horizontal">
                  <div class="path-line"></div>
                  <div class="path-msg forward single-msg">
                    <span class="msg-num">3</span>
                    <span class="msg-text">IPC Msg + Badge</span>
                    <span class="msg-arrow">➔</span>
                  </div>
                </div>

                <div class="flow-node fs-node glow-green-box">
                  <span class="node-icon">📁</span>
                  <span class="node-title">FS Vault</span>
                  <span class="node-sub">Verifies Badge</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Interactive Terminal View -->
      <section class="auth-section mt-10">
        <div class="section-header">
          <div class="sh-icon glow-red">💻</div>
          <h2 class="sh-title">مخرجات الحاوية الحية</h2>
          <div class="line-decorator"></div>
        </div>
        
        <div class="terminal-window glass-panel">
          <div class="tw-header">
            <div class="tw-dots"><span></span><span></span><span></span></div>
            <div class="tw-title">root@hisn:~/auth_vault_tty</div>
            <div class="tw-action">bash</div>
          </div>
          <div class="tw-body" dir="ltr">
            <div v-for="(line, index) in terminalLines" :key="index" class="tw-line" :class="line.color">
              {{ line.text }}
            </div>
            <div class="tw-line text-yellow-300 mt-4 font-bold">> [Auth_Vault] Received Token request (0x100) from App ID: 0x4B2</div>
            <div class="tw-line text-purple-400 font-bold">> [Auth_Vault] Token generated and sent. (Badge: 0x04B20200A59F123C)</div>
            <div class="tw-cursor">_</div>
          </div>
        </div>
      </section>

      <!-- Badge Encoding Visualizer -->
      <section class="auth-section mt-10">
        <div class="section-header">
          <div class="sh-icon glow-purple">🧬</div>
          <h2 class="sh-title">تشريح تذكرة الأمان (PolicyBadge)</h2>
          <div class="line-decorator"></div>
        </div>
        <p class="sh-desc">كيف يتم دمج (Packing) هوية التطبيق، الصلاحيات، وهاش المسار في 64-bit واحدة لتسريع التحقق (O(1) Verification).</p>
        
        <div class="badge-showcase">
          <div class="badge-visualizer glass-panel">
            <div class="bv-word" dir="ltr">
              <div class="bv-part bv-app" title="App ID (16 bits)">
                <span class="bv-val">16 bits (Top)</span>
                <span class="bv-label">App ID</span>
                <span class="bv-hex">0x04B2</span>
              </div>
              <div class="bv-part bv-perm" title="Permission (8 bits)">
                <span class="bv-val">8 bits</span>
                <span class="bv-label">Perm</span>
                <span class="bv-hex">0x02</span>
              </div>
              <div class="bv-part bv-pad" title="Padding (8 bits)">
                <span class="bv-val">8 bits</span>
                <span class="bv-label">Pad</span>
                <span class="bv-hex">0x00</span>
              </div>
              <div class="bv-part bv-hash" title="Path Hash (32 bits)">
                <span class="bv-val">32 bits (Bottom)</span>
                <span class="bv-label">FNV-1a Hash</span>
                <span class="bv-hex">0xA59F123C</span>
              </div>
            </div>
            <div class="bv-code-result" dir="ltr">
              <span class="res-label">Final u64 Token</span>
              <code>0x04B20200A59F123C</code>
            </div>
          </div>
          
          <!-- Code snippet block -->
          <div class="code-snippet-card glass-panel" dir="ltr">
            <div class="cs-header">
              <span class="cs-lang">🦀 Rust</span>
              <span class="cs-file">libs/security-policy/src/lib.rs</span>
            </div>
            <pre class="cs-body"><code>{{ rustSnippet }}</code></pre>
          </div>
        </div>
      </section>

      <!-- Message Tags Section -->
      <section class="auth-section mt-10">
        <div class="section-header">
          <div class="sh-icon glow-blue">📡</div>
          <h2 class="sh-title">أوامر الاستدعاء (Message Tags)</h2>
          <div class="line-decorator"></div>
        </div>
        <div class="tags-grid">
          <div v-for="(tag, i) in messageTags" :key="i" class="tag-row glass-panel hover-glow-red">
            <div class="tag-call" dir="ltr">{{ tag.call }}</div>
            <div class="tag-action">{{ tag.action }}</div>
          </div>
        </div>
      </section>

      <!-- Functions Section -->
      <section class="auth-section mt-10">
        <div class="section-header">
          <div class="sh-icon glow-green">⚙️</div>
          <h2 class="sh-title">الوظائف والمهام الأساسية</h2>
          <div class="line-decorator"></div>
        </div>
        <div class="afp-list">
          <div v-for="fn in functions" :key="fn.id" class="fn-card glass-panel hover-glow-red">
            <div class="fn-glow"></div>
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
      <section class="auth-section mt-10">
        <div class="section-header">
          <div class="sh-icon glow-orange">📁</div>
          <h2 class="sh-title">توثيق الملفات البرمجية</h2>
          <div class="line-decorator"></div>
        </div>
        <div class="files-list">
          <div v-for="file in files" :key="file.id" class="file-card glass-panel hover-border-red">
            <div class="file-top-bar"></div>
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
              <div class="block-label">🔍 أهم العناصر</div>
              <div class="highlights-grid">
                <div v-for="(h, i) in file.highlights" :key="i" class="hl-item glass-inset">
                  <span class="hl-label">{{ h.label }}</span>
                  <code class="hl-value" dir="ltr">{{ h.value }}</code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Libraries Section -->
      <section class="auth-section mt-10">
        <div class="section-header">
          <div class="sh-icon glow-yellow">📚</div>
          <h2 class="sh-title">المكتبات والاعتمادات (Dependencies)</h2>
          <div class="line-decorator"></div>
        </div>
        <div class="libs-grid">
          <div v-for="lib in libraries" :key="lib.id" class="lib-card glass-panel hover-float">
            <div class="lib-header">
              <div class="lib-id"># {{ lib.id }}</div>
              <div class="lib-icon-box">⚙️</div>
            </div>
            <h2 class="lib-name" dir="ltr">{{ lib.name }}</h2>
            <div class="lib-meta">
              <code class="meta-path" dir="ltr">{{ lib.path }}</code>
            </div>
            <p class="lib-desc">{{ lib.desc }}</p>
          </div>
        </div>
      </section>

    </main>
  </div>
</template>

<style scoped>
.auth-root {
  position: relative;
  min-height: 100vh;
  padding: calc(var(--vp-nav-height) + 3rem) 1.5rem 8rem;
  font-family: 'Cairo', 'Inter', system-ui, sans-serif;
  color: #f8fafc;
  overflow: hidden;
  max-width: 1000px;
  margin: 0 auto;
}

/* Background Grids & Orbs */
.bg-grid {
  position: absolute; inset: 0; z-index: 0; pointer-events: none;
  background-image: linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 40px 40px;
  mask-image: radial-gradient(circle at center, black, transparent 80%);
}
.auth-root::before {
  content: ''; position: absolute; width: 800px; height: 800px; border-radius: 50%;
  background: radial-gradient(circle, rgba(239, 68, 68, 0.08), transparent 70%);
  filter: blur(100px); top: -200px; right: -250px; pointer-events: none; z-index: 0;
}
.auth-root::after {
  content: ''; position: absolute; width: 600px; height: 600px; border-radius: 50%;
  background: radial-gradient(circle, rgba(168, 85, 247, 0.08), transparent 70%);
  filter: blur(100px); bottom: 10%; left: -200px; pointer-events: none; z-index: 0;
}

/* Particles */
.particles { position: absolute; inset: 0; z-index: 0; pointer-events: none; overflow: hidden; }
.particle {
  position: absolute; left: var(--x); top: var(--y); width: var(--s); height: var(--s);
  background: rgba(239, 68, 68, 0.4); border-radius: 50%;
  box-shadow: 0 0 10px rgba(239, 68, 68, 0.8);
  animation: float var(--d) linear infinite alternate;
}
@keyframes float {
  from { transform: translateY(0) scale(1); opacity: 0.2; }
  to { transform: translateY(-100px) scale(1.5); opacity: 0.8; }
}

/* Common Components */
.glass-panel {
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
}
.glass-inset { background: rgba(0, 0, 0, 0.3); box-shadow: inset 0 2px 8px rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.05); }
.hover-glow-red:hover { border-color: rgba(239, 68, 68, 0.4); box-shadow: 0 10px 40px rgba(239, 68, 68, 0.2); transform: translateY(-2px); }
.hover-border-red:hover { border-color: rgba(239, 68, 68, 0.4); box-shadow: 0 15px 40px rgba(0,0,0,0.4); transform: translateY(-4px); }
.hover-float:hover { transform: translateY(-6px); border-color: rgba(168, 85, 247, 0.4); box-shadow: 0 20px 40px rgba(0,0,0,0.3); }
.mt-6 { margin-top: 1.5rem; }
.mt-8 { margin-top: 2rem; }
.mt-10 { margin-top: 5rem; }

/* ── Header ── */
.auth-header { position: relative; z-index: 1; text-align: center; margin-bottom: 5rem; }
.auth-badge-container { display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap; margin-bottom: 2rem; }
.auth-badge { display: inline-flex; align-items: center; gap: 0.5rem; font-size: 0.75rem; font-weight: 800; letter-spacing: 0.2em; color: rgba(248, 250, 252, 0.9); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 100px; padding: 0.6rem 1.5rem; background: rgba(239, 68, 68, 0.1); backdrop-filter: blur(12px); box-shadow: 0 0 20px rgba(239,68,68,0.15); }
.user-space-badge { display: inline-flex; align-items: center; gap: 0.5rem; font-size: 0.75rem; font-weight: 800; letter-spacing: 0.1em; color: #d8b4fe; border-radius: 100px; padding: 0.6rem 1.5rem; background: rgba(168, 85, 247, 0.15); border: 1px solid rgba(168, 85, 247, 0.4); }
.glow-purple-box { box-shadow: 0 0 25px rgba(168, 85, 247, 0.25); }
.badge-dot { width: 8px; height: 8px; border-radius: 50%; background: #ef4444; box-shadow: 0 0 12px #ef4444, 0 0 20px #ef4444; animation: pulse-red 2s infinite; }
@keyframes pulse-red { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.5); } }

.auth-icon-wrapper { position: relative; width: 140px; height: 140px; margin: 0 auto 1.5rem; display: flex; align-items: center; justify-content: center; }
.icon-ring { position: absolute; inset: 0; border-radius: 50%; border: 2px solid transparent; }
.ring-outer { inset: -10px; border-top-color: rgba(239, 68, 68, 0.8); border-right-color: rgba(239, 68, 68, 0.2); animation: spin-slow 12s linear infinite; }
.ring-inner { inset: 5px; border-bottom-color: rgba(168, 85, 247, 0.8); border-left-color: rgba(168, 85, 247, 0.2); border-style: dashed; animation: spin-reverse 8s linear infinite; }
.icon-pulse { position: absolute; inset: 15px; border-radius: 50%; background: radial-gradient(circle, rgba(239,68,68,0.3) 0%, transparent 70%); animation: pulse-glow 3s ease-in-out infinite alternate; }
.icon-orbit { position: absolute; inset: -25px; border: 1px dashed rgba(255,255,255,0.1); border-radius: 50%; animation: spin-slow 20s linear infinite; }
.orbit-2 { inset: -40px; border-style: dotted; animation: spin-reverse 25s linear infinite; }
.orbit-dot { width: 10px; height: 10px; background: #a855f7; border-radius: 50%; position: absolute; top: -5px; left: 50%; transform: translateX(-50%); box-shadow: 0 0 10px #a855f7; }
@keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
@keyframes spin-reverse { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
@keyframes pulse-glow { from { opacity: 0.3; transform: scale(0.8); } to { opacity: 0.8; transform: scale(1.2); } }

.auth-main-icon { font-size: 5rem; filter: drop-shadow(0 10px 25px rgba(239, 68, 68, 0.5)); z-index: 2; margin-top: -5px; }
.auth-title { font-size: clamp(3rem, 7vw, 4.5rem); font-weight: 900; line-height: 1.2; margin: 0 0 1.5rem; letter-spacing: -0.02em; }
.gradient-text-white { background: linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.gradient-text-red { background: linear-gradient(135deg, #ef4444 0%, #f87171 50%, #fca5a5 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; filter: drop-shadow(0 0 30px rgba(239,68,68,0.4)); }
.auth-subtitle { font-size: 1.25rem; color: rgba(248, 250, 252, 0.75); max-width: 800px; margin: 0 auto 3rem; line-height: 1.8; }

.auth-stats-bar { display: flex; align-items: center; justify-content: center; gap: 2rem; padding: 1.2rem 2.5rem; background: linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%); border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 100px; backdrop-filter: blur(24px); width: fit-content; margin: 0 auto; box-shadow: 0 20px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1); flex-wrap: wrap; }
.stat-pill { display: flex; align-items: center; gap: 0.85rem; font-size: 1rem; }
.stat-icon { font-size: 1.3rem; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5)); }
.stat-val { font-weight: 900; color: #fff; letter-spacing: 0.05em; }
.stat-tag { font-size: 0.75rem; padding: 0.3rem 0.75rem; border-radius: 8px; background: rgba(239, 68, 68, 0.2); color: #fca5a5; font-weight: 800; border: 1px solid rgba(239, 68, 68, 0.4); text-transform: uppercase; }
.bg-purple { background: rgba(168, 85, 247, 0.2); color: #d8b4fe; border-color: rgba(168, 85, 247, 0.4); }
.stat-divider { width: 2px; height: 30px; background: rgba(255,255,255,0.1); border-radius: 2px; }

/* ── Content Sections ── */
.auth-content { position: relative; z-index: 1; display: flex; flex-direction: column; gap: 2rem; }
.section-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 0.5rem; position: relative; }
.sh-icon { font-size: 1.8rem; background: rgba(255,255,255,0.05); width: 55px; height: 55px; display: flex; align-items: center; justify-content: center; border-radius: 16px; border: 1px solid rgba(255,255,255,0.1); position: relative; z-index: 2; }
.glow-red { box-shadow: 0 0 20px rgba(239,68,68,0.3); border-color: rgba(239,68,68,0.5); }
.glow-purple { box-shadow: 0 0 20px rgba(168,85,247,0.3); border-color: rgba(168,85,247,0.5); }
.glow-blue { box-shadow: 0 0 20px rgba(59,130,246,0.3); border-color: rgba(59,130,246,0.5); }
.glow-green { box-shadow: 0 0 20px rgba(34,197,94,0.3); border-color: rgba(34,197,94,0.5); }
.glow-orange { box-shadow: 0 0 20px rgba(249,115,22,0.3); border-color: rgba(249,115,22,0.5); }
.glow-yellow { box-shadow: 0 0 20px rgba(234,179,8,0.3); border-color: rgba(234,179,8,0.5); }

.sh-title { font-size: 2rem; font-weight: 900; color: #fff; margin: 0; z-index: 2; letter-spacing: -0.02em; }
.line-decorator { flex: 1; height: 1px; background: linear-gradient(90deg, rgba(255,255,255,0.1), transparent); z-index: 1; margin-left: 1rem; }
.sh-desc { font-size: 1.1rem; color: rgba(248,250,252,0.65); margin: 0 0 2rem 5rem; }

/* ── Philosophical Note ── */
.philosophical-note { display: flex; gap: 1.5rem; padding: 1.5rem 2rem; border-radius: 16px; border-right: 4px solid #a855f7; align-items: flex-start; }
.pn-icon { font-size: 2.5rem; flex-shrink: 0; filter: drop-shadow(0 0 10px rgba(168,85,247,0.4)); }
.pn-text { font-size: 1.05rem; line-height: 1.8; color: rgba(248,250,252,0.85); }
.pn-text strong { display: block; font-size: 1.2rem; color: #d8b4fe; margin-bottom: 0.5rem; }

/* ── Architecture Flow (NEW Design) ── */
.architecture-flow { padding: 2.5rem; border-radius: 24px; display: flex; flex-direction: column; gap: 1.5rem; }
.arch-layer { display: flex; flex-direction: column; gap: 0.5rem; }
.kernel-layer { padding: 1.5rem; border: 1px dashed rgba(255,255,255,0.15); border-radius: 16px; background: rgba(0,0,0,0.4); text-align: center; }
.user-layer { padding: 2.5rem; border: 1px solid rgba(168, 85, 247, 0.4); border-radius: 20px; background: rgba(168, 85, 247, 0.05); box-shadow: inset 0 0 40px rgba(168, 85, 247, 0.08); }
.layer-label { font-size: 1.2rem; font-weight: 900; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(255,255,255,0.6); margin-bottom: 0.5rem; display: block; text-align: center; }
.kernel-layer .layer-label { color: rgba(255,255,255,0.4); }
.layer-desc { font-size: 0.95rem; color: rgba(255,255,255,0.5); margin: 0; line-height: 1.6; }
.arch-separator { display: flex; align-items: center; gap: 1rem; opacity: 0.8; margin: 1rem 0; }
.dashed-line { flex: 1; height: 2px; background: repeating-linear-gradient(90deg, rgba(255,255,255,0.2) 0, rgba(255,255,255,0.2) 6px, transparent 6px, transparent 12px); }
.sep-text { font-size: 0.85rem; font-family: 'Space Mono', monospace; color: #ef4444; font-weight: 800; text-transform: uppercase; letter-spacing: 0.15em; text-shadow: 0 0 10px rgba(239,68,68,0.5); }

/* New Flow Diagram - LTR enforced */
.new-flow-diagram { display: flex; flex-direction: column; width: 100%; font-family: 'Inter', system-ui, sans-serif; }
.flow-row { display: flex; align-items: center; justify-content: center; width: 100%; gap: 1rem; }
.flow-node { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 1.25rem 2rem; border-radius: 16px; border: 1px solid rgba(255,255,255,0.1); background: rgba(30, 41, 59, 0.8); box-shadow: 0 10px 20px rgba(0,0,0,0.3); min-width: 140px; text-align: center; z-index: 2; }
.app-node { border-color: rgba(148, 163, 184, 0.5); }
.node-icon { font-size: 2rem; margin-bottom: 0.5rem; }
.node-title { font-weight: 900; font-size: 1.2rem; color: #fff; }
.node-sub { font-family: 'Space Mono', monospace; font-size: 0.8rem; color: rgba(255,255,255,0.5); margin-top: 0.2rem; }
.glow-red-box { background: rgba(239, 68, 68, 0.15); border-color: rgba(239, 68, 68, 0.5); box-shadow: 0 0 30px rgba(239, 68, 68, 0.3); }
.glow-green-box { background: rgba(34, 197, 94, 0.15); border-color: rgba(34, 197, 94, 0.5); box-shadow: 0 0 30px rgba(34, 197, 94, 0.3); }
.glow-red-box .node-title { color: #fca5a5; }
.glow-green-box .node-title { color: #86efac; }

.flow-path { flex: 1; position: relative; height: 60px; display: flex; flex-direction: column; justify-content: center; }
.path-line { position: absolute; top: 50%; left: 0; right: 0; height: 2px; background: rgba(255,255,255,0.2); transform: translateY(-50%); z-index: 1; }
.path-msg { position: absolute; z-index: 2; background: #0f172a; padding: 0.25rem 0.75rem; border-radius: 100px; border: 1px solid rgba(255,255,255,0.1); display: flex; align-items: center; gap: 0.5rem; left: 50%; transform: translateX(-50%); white-space: nowrap; }
.forward { top: -15px; border-color: rgba(59,130,246,0.5); box-shadow: 0 0 15px rgba(59,130,246,0.2); }
.backward { bottom: -15px; border-color: rgba(168,85,247,0.5); box-shadow: 0 0 15px rgba(168,85,247,0.2); }
.single-msg { top: 50%; transform: translate(-50%, -50%); border-color: rgba(34,197,94,0.5); box-shadow: 0 0 15px rgba(34,197,94,0.2); }
.msg-num { background: rgba(255,255,255,0.1); width: 20px; height: 20px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.7rem; font-weight: 900; }
.forward .msg-num { color: #93c5fd; }
.backward .msg-num { color: #d8b4fe; }
.single-msg .msg-num { color: #86efac; }
.msg-text { font-family: 'Space Mono', monospace; font-size: 0.8rem; font-weight: 700; color: #e2e8f0; }
.msg-arrow { font-size: 1rem; color: rgba(255,255,255,0.5); }

/* ── Terminal Window ── */
.terminal-window { border-radius: 16px; overflow: hidden; padding: 0; }
.tw-header { display: flex; align-items: center; justify-content: space-between; padding: 0.85rem 1.25rem; background: rgba(0,0,0,0.5); border-bottom: 1px solid rgba(255,255,255,0.1); }
.tw-dots { display: flex; gap: 8px; }
.tw-dots span { width: 14px; height: 14px; border-radius: 50%; }
.tw-dots span:nth-child(1) { background: #ff5f56; box-shadow: 0 0 10px rgba(255,95,86,0.5); }
.tw-dots span:nth-child(2) { background: #ffbd2e; box-shadow: 0 0 10px rgba(255,189,46,0.5); }
.tw-dots span:nth-child(3) { background: #27c93f; box-shadow: 0 0 10px rgba(39,201,63,0.5); }
.tw-title { font-family: 'Space Mono', monospace; font-size: 0.85rem; color: rgba(255,255,255,0.5); font-weight: 700; }
.tw-action { font-family: 'Space Mono', monospace; font-size: 0.8rem; color: rgba(255,255,255,0.4); background: rgba(255,255,255,0.1); padding: 0.2rem 0.6rem; border-radius: 6px; }
.tw-body { padding: 2rem; font-family: 'Space Mono', monospace; font-size: 0.95rem; line-height: 1.7; background: rgba(0,0,0,0.3); }
.tw-line { margin-bottom: 0.35rem; text-shadow: 0 0 5px rgba(255,255,255,0.1); }
.tw-cursor { display: inline-block; width: 10px; height: 18px; background: #fff; animation: blink 1s step-end infinite; margin-top: 1rem; box-shadow: 0 0 10px #fff; }
@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
.text-gray-500 { color: #64748b; }
.text-gray-600 { color: #475569; }
.text-red-400 { color: #f87171; text-shadow: 0 0 10px rgba(248,113,113,0.4); }
.text-blue-300 { color: #93c5fd; }
.text-green-400 { color: #4ade80; }
.text-yellow-300 { color: #fde047; }
.text-purple-400 { color: #c084fc; text-shadow: 0 0 10px rgba(192,132,252,0.4); }
.text-purple-300 { color: #d8b4fe; }

/* ── Badge Showcase (Visualizer + Code) ── */
.badge-showcase { display: flex; flex-direction: column; gap: 1.5rem; }
.badge-visualizer { padding: 2.5rem; border-radius: 20px; display: flex; flex-direction: column; align-items: center; gap: 2.5rem; position: relative; overflow: hidden; }
.badge-visualizer::before { content: ''; position: absolute; inset: 0; background: linear-gradient(180deg, rgba(255,255,255,0.02) 0%, transparent 100%); pointer-events: none; }
.bv-word { display: flex; width: 100%; border-radius: 16px; overflow: hidden; border: 1px solid rgba(255,255,255,0.2); box-shadow: 0 15px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.2); }
.bv-part { padding: 1.25rem 1rem; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.4rem; position: relative; transition: all 0.3s ease; }
.bv-part:hover { background-blend-mode: overlay; background-color: rgba(255,255,255,0.15); }
.bv-app { flex: 2; background: linear-gradient(135deg, rgba(239, 68, 68, 0.3), rgba(239, 68, 68, 0.15)); border-right: 1px solid rgba(0,0,0,0.4); }
.bv-perm { flex: 1; background: linear-gradient(135deg, rgba(168, 85, 247, 0.3), rgba(168, 85, 247, 0.15)); border-right: 1px solid rgba(0,0,0,0.4); }
.bv-pad { flex: 1; background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.03)); border-right: 1px solid rgba(0,0,0,0.4); }
.bv-hash { flex: 4; background: linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(59, 130, 246, 0.15)); }
.bv-val { font-family: 'Space Mono', monospace; font-size: 0.8rem; font-weight: 800; color: rgba(255,255,255,0.6); text-transform: uppercase; letter-spacing: 0.05em; }
.bv-label { font-weight: 900; font-size: 1.3rem; color: #fff; text-shadow: 0 2px 4px rgba(0,0,0,0.6); }
.bv-hex { font-family: 'Space Mono', monospace; font-size: 1.1rem; color: #a5f3fc; background: rgba(0,0,0,0.4); padding: 0.3rem 0.85rem; border-radius: 8px; margin-top: 0.5rem; border: 1px solid rgba(255,255,255,0.15); box-shadow: inset 0 2px 5px rgba(0,0,0,0.3); }
.bv-code-result { display: flex; flex-direction: column; align-items: center; gap: 0.75rem; }
.res-label { font-size: 0.9rem; font-weight: 900; color: rgba(255,255,255,0.5); text-transform: uppercase; letter-spacing: 0.15em; }
.bv-code-result code { font-family: 'Space Mono', monospace; font-size: 2rem; font-weight: 900; color: #fca5a5; background: rgba(0,0,0,0.5); padding: 1.25rem 3rem; border-radius: 100px; border: 2px solid rgba(239,68,68,0.5); box-shadow: 0 0 40px rgba(239,68,68,0.25), inset 0 0 20px rgba(0,0,0,0.6); text-shadow: 0 0 15px rgba(252,165,165,0.6); letter-spacing: 0.05em; }

/* Code Snippet Card */
.code-snippet-card { border-radius: 16px; overflow: hidden; padding: 0; }
.cs-header { display: flex; align-items: center; justify-content: space-between; padding: 1rem 1.5rem; background: rgba(0,0,0,0.4); border-bottom: 1px solid rgba(255,255,255,0.1); }
.cs-lang { font-weight: 900; font-size: 1rem; color: #fca5a5; }
.cs-file { font-family: 'Space Mono', monospace; font-size: 0.9rem; color: rgba(255,255,255,0.5); }
.cs-body { margin: 0; padding: 2rem; background: rgba(0,0,0,0.3); color: #e2e8f0; font-family: 'Space Mono', monospace; font-size: 1.05rem; line-height: 1.6; overflow-x: auto; }

/* ── Tags Grid ── */
.tags-grid { display: flex; flex-direction: column; gap: 0.75rem; }
.tag-row { display: flex; align-items: center; gap: 1.5rem; padding: 1.25rem 1.75rem; border-radius: 16px; transition: all 0.3s ease; }
.tag-call { flex-basis: 260px; flex-shrink: 0; font-family: 'Space Mono', monospace; font-size: 1rem; font-weight: 800; color: #f87171; background: rgba(239,68,68,0.1); padding: 0.5rem 1rem; border-radius: 8px; border: 1px solid rgba(239,68,68,0.2); text-align: center; }
.tag-action { flex: 1; font-size: 1.05rem; color: rgba(248,250,252,0.9); line-height: 1.7; }

/* ── Functions List ── */
.afp-list { display: grid; grid-template-columns: repeat(auto-fill, minmax(400px, 1fr)); gap: 1.5rem; }
.fn-card { border-radius: 20px; padding: 2rem; display: flex; flex-direction: column; gap: 1.25rem; transition: all 0.4s ease; position: relative; overflow: hidden; }
.fn-header { display: flex; align-items: center; gap: 1rem; }
.fn-id { font-size: 0.8rem; font-weight: 900; color: #ef4444; background: rgba(239,68,68,0.15); padding: 0.3rem 0.75rem; border-radius: 8px; border: 1px solid rgba(239,68,68,0.3); }
.fn-icon { font-size: 2.5rem; filter: drop-shadow(0 4px 8px rgba(0,0,0,0.4)); }
.fn-name { font-size: 1.3rem; font-weight: 900; color: #fff; margin: 0; line-height: 1.4; }
.fn-desc { font-size: 1.05rem; line-height: 1.7; color: rgba(248,250,252,0.8); margin: 0; }

/* ── Files List ── */
.files-list { display: flex; flex-direction: column; gap: 2rem; }
.file-card { border-radius: 24px; padding: 2.5rem; position: relative; overflow: hidden; transition: all 0.4s ease; }
.file-top-bar { position: absolute; top: 0; left: 0; right: 0; height: 4px; background: linear-gradient(90deg, transparent, rgba(239,68,68,0.8), transparent); }
.file-header { display: flex; align-items: center; gap: 1.5rem; margin-bottom: 2rem; }
.file-icon-box { font-size: 3rem; width: 70px; height: 70px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; display: flex; align-items: center; justify-content: center; box-shadow: inset 0 0 20px rgba(255,255,255,0.02); }
.file-meta { flex: 1; }
.file-name-row { display: flex; align-items: center; gap: 1rem; margin-bottom: 0.5rem; flex-wrap: wrap; }
.file-name { font-size: 1.8rem; font-weight: 900; color: #fff; margin: 0; font-family: 'Space Mono', monospace; }
.file-tag { font-size: 0.8rem; font-weight: 800; padding: 0.3rem 1rem; border-radius: 8px; background: rgba(239,68,68,0.15); color: #fca5a5; border: 1px solid rgba(239,68,68,0.4); text-transform: uppercase; }
.file-path { font-family: 'Space Mono', monospace; font-size: 0.95rem; color: #38bdf8; background: rgba(56,189,248,0.1) !important; padding: 0.3rem 0.8rem !important; border-radius: 8px; border: 1px solid rgba(56,189,248,0.2); }
.file-size { font-size: 1rem; color: rgba(255,255,255,0.5); font-weight: 800; background: rgba(0,0,0,0.3); padding: 0.5rem 1rem; border-radius: 12px; }
.file-desc { font-size: 1.1rem; line-height: 1.8; color: rgba(248,250,252,0.85); margin: 0 0 2rem; padding: 1.5rem; background: rgba(0,0,0,0.3); border-radius: 16px; border-right: 4px solid #ef4444; }
.block-label { font-size: 0.9rem; font-weight: 900; color: rgba(255,255,255,0.6); letter-spacing: 0.1em; margin-bottom: 1.25rem; text-transform: uppercase; }
.highlights-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1rem; }
.hl-item { display: flex; flex-direction: column; gap: 0.4rem; border-radius: 12px; padding: 1rem 1.25rem; transition: border-color 0.3s ease; }
.hl-label { font-size: 0.8rem; font-weight: 800; color: rgba(255,255,255,0.5); text-transform: uppercase; }
.hl-value { font-family: 'Space Mono', monospace; font-size: 0.95rem; font-weight: 700; color: #a5f3fc; background: none !important; padding: 0 !important; word-break: break-all; }

/* ── Libraries List ── */
.libs-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(400px, 1fr)); gap: 1.5rem; }
.lib-card { border-radius: 24px; padding: 2rem; transition: all 0.4s ease; display: flex; flex-direction: column; gap: 1rem; }
.lib-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem; }
.lib-id { font-size: 0.9rem; font-weight: 900; color: #ef4444; background: rgba(239,68,68,0.15); padding: 0.3rem 0.8rem; border-radius: 8px; border: 1px solid rgba(239,68,68,0.3); }
.lib-icon-box { width: 50px; height: 50px; border-radius: 14px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center; font-size: 1.8rem; }
.lib-name { font-size: 1.6rem; font-weight: 900; color: #fff; margin: 0; font-family: 'Space Mono', monospace; }
.lib-meta { display: flex; align-items: center; gap: 0.5rem; }
.meta-path { font-family: 'Space Mono', monospace; font-size: 0.9rem; color: #d8b4fe; background: rgba(168,85,247,0.1) !important; padding: 0.3rem 0.8rem !important; border-radius: 8px; border: 1px solid rgba(168,85,247,0.2); }
.lib-desc { font-size: 1.05rem; line-height: 1.7; color: rgba(248,250,252,0.8); margin: 0; margin-top: auto; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.1); }

@media (max-width: 900px) {
  .afp-list, .libs-grid { grid-template-columns: 1fr; }
  .auth-stats-bar { flex-direction: column; border-radius: 24px; gap: 1rem; padding: 1.5rem 3rem; }
  .stat-divider { display: none; }
  .tag-row { flex-direction: column; align-items: flex-start; gap: 1rem; }
  .tag-call { width: 100%; flex-basis: auto; }
  .bv-word { flex-direction: column; }
  .bv-part { border-right: none; border-bottom: 1px solid rgba(0,0,0,0.3); }
  .bv-code-result code { font-size: 1.5rem; padding: 1rem 2rem; }
  .flow-row { flex-direction: column; gap: 1rem; }
  .flow-path { height: auto; min-height: 80px; width: 100%; }
  .path-line { width: 2px; height: 100%; top: 0; bottom: 0; left: 50%; transform: translateX(-50%); }
  .path-msg { position: relative; left: 0; transform: none; margin: 0.5rem auto; width: fit-content; top: 0; bottom: 0; }
  .forward .msg-arrow { transform: rotate(90deg); margin-left: 0.5rem; }
  .backward { flex-direction: row-reverse; }
  .backward .msg-arrow { transform: rotate(-90deg); margin-right: 0.5rem; }
  .single-msg .msg-arrow { transform: rotate(90deg); margin-left: 0.5rem; }
}
@media (max-width: 640px) {
  .file-header { flex-direction: column; align-items: flex-start; }
  .file-size { align-self: flex-start; }
  .highlights-grid { grid-template-columns: 1fr; }
  .sh-desc { margin-left: 0; }
  .philosophical-note { flex-direction: column; }
}
</style>
