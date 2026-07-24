<template>
  <div class="ifp-root">


    <!-- Header -->
    <header class="ifp-header">
      <a href="/hisn/containers/init/" class="ifp-breadcrumb">← حاوية init</a>
      <div class="ifp-badge">⚡ وظائف الحاوية</div>
      <h1 class="ifp-title">الوظائف التي تقوم بها <span class="hl">init</span></h1>
      <p class="ifp-sub">
        حاوية <code>init</code> هي أول كود يُنفَّذ فوق نواة <strong>seL4</strong> مباشرةً. تحصل على كامل الصلاحيات الأولية والذاكرة الخام، وتبني جميع حاويات النظام التسع من الصفر.
      </p>
      <div class="ifp-count-pill">
        <span class="pill-num">{{ functions.length }}</span>
        <span class="pill-lbl">وظيفة تخصصية</span>
      </div>
    </header>

    <!-- Functions list -->
    <main class="ifp-list">
      <article
        v-for="(fn, i) in functions"
        :key="i"
        class="fn-card"
        :class="{ 'is-open': openIdx === i }"
        @click="openIdx = openIdx === i ? -1 : i"
      >
        <div class="fn-accent"></div>
        <div class="fn-header">
          <div class="fn-icon-wrap">
            <span class="fn-icon">{{ fn.icon }}</span>
          </div>
          <div class="fn-header-text">
            <div class="fn-num-badge"># {{ String(i + 1).padStart(2, '0') }}</div>
            <h2 class="fn-title">{{ fn.title }}</h2>
          </div>
          <span class="fn-chevron" :class="{ rotated: openIdx === i }">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </span>
        </div>

        <div class="fn-body" v-show="openIdx === i" @click.stop>
          <p class="fn-desc" v-html="fn.desc"></p>
          <ul class="fn-points" v-if="fn.points?.length">
            <li v-for="(pt, j) in fn.points" :key="j" v-html="pt"></li>
          </ul>
          <div class="fn-tags" v-if="fn.tags?.length">
            <span class="fn-tag" v-for="(t, j) in fn.tags" :key="j">{{ t }}</span>
          </div>
        </div>
      </article>
    </main>

    <!-- Summary table -->
    <section class="ifp-summary">
      <h2 class="ifp-summary-title">📋 الجدول الشامل</h2>
      <div class="summary-table-wrap">
        <table class="summary-table">
          <thead>
            <tr>
              <th>#</th>
              <th>الوظيفة</th>
              <th>التوضيح المختصر</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(fn, i) in functions" :key="i">
              <td class="st-num">{{ String(i + 1).padStart(2, '0') }}</td>
              <td class="st-name"><span class="st-icon">{{ fn.icon }}</span> {{ fn.shortTitle }}</td>
              <td class="st-desc">{{ fn.summary }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Nav -->
    <footer class="ifp-footer">
      <a href="/hisn/containers/init/" class="nav-btn">← حاوية init</a>
      <a href="/hisn/containers/init/libraries" class="nav-btn nav-btn-accent">📚 المكتبات ←</a>
      <a href="/hisn/containers/" class="nav-btn">قائمة الحاويات ←</a>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const openIdx = ref(-1)

const functions = [
  {
    icon: '🧰',
    title: 'إدارة الذاكرة الخام وتخصيص الكائنات',
    shortTitle: 'إدارة الذاكرة',
    summary: 'تقطيع وتحويل الذاكرة الخام لإنشاء كائنات النظام',
    desc: 'تستلم <code>init</code> كتل الذاكرة غير المصنفة (<code>Untyped Memory</code>) من النواة عبر هيكل <code>seL4_BootInfo</code> وتُقسّمها (<code>seL4_Untyped_Retype</code>) لبناء كائنات النظام الأساسية:',
    points: [
      '<strong>أدمغة الحاويات (TCB Objects):</strong> للتحكم في تنفيذ وسجلات كل حاوية.',
      '<strong>جداول الذاكرة (VSpaces):</strong> لتحديد حدود المساحات الافتراضية.',
      '<strong>قنوات الاتصال (Endpoints):</strong> لتسهيل تبادل الرسائل والبيانات.',
      '<strong>صناديق الصلاحيات (CNodes):</strong> يستخدم <code>SlotAllocator</code> لتوزيع الصلاحيات بدقة.',
    ],
    tags: ['seL4_Untyped_Retype', 'TCB', 'CNode', 'BumpAllocator'],
  },
  {
    icon: '🗂️',
    title: 'بناء وتأمين مساحات العناوين الافتراضية',
    shortTitle: 'بناء الـ VSpace',
    summary: 'عزل ذاكرة كل حاوية عن الأخرى تماماً',
    desc: 'تبني <code>init</code> هياكل الـ Paging الرباعية لمعمارية x86_64 (<code>PML4 → PDPT → PageDirectory → PageTable</code>) لكل حاوية على حدة. تضع كل حاوية في "عالم ذاكرة معزول" عبر <code>ASID Pool</code> مستقل — لا حاوية تستطيع رؤية ذاكرة أخت لها.',
    tags: ['PML4', 'PDPT', 'PageTable', 'ASID Pool', 'VSpace'],
  },
  {
    icon: '📦',
    title: 'تحليل وتحميل صور الحاويات التنفيذية',
    shortTitle: 'تحميل الـ ELF',
    summary: 'نسخ وتشغيل كود الحاويات في المساحات المخصصة',
    desc: 'تُدمج ملفات ELF المترجمة للحاويات مباشرة داخل ثنائي <code>init</code> عبر <code>include_bytes!</code>. عند التشغيل تستخدم تقنية <strong>Scratch Mapping</strong>:',
    points: [
      'تحليل بنية ELF عبر مكتبة <code>elf_parser</code>.',
      'تعيين صفحات الذاكرة مؤقتاً ونسخ المقاطع التنفيذية والبيانات.',
      'نقل الصفحات إلى مساحة الذاكرة الخاصة بالحاوية وتجهيز الـ Stack.',
    ],
    tags: ['include_bytes!', 'Scratch Mapping', 'ELF Segments', 'Stack Setup'],
  },
  {
    icon: '🚦',
    title: 'إنشاء وتوزيع قنوات التواصل الآمن',
    shortTitle: 'توزيع الصلاحيات',
    summary: 'إنشاء قنوات IPC محددة بمبدأ الحد الأدنى من الصلاحيات',
    desc: 'تلتزم <code>init</code> بمبدأ الحد الأدنى من الصلاحيات (<strong>Principle of Least Privilege</strong>): تنشئ <code>Endpoint</code> لكل حاوية وتنسخ القنوات (<code>seL4_CNode_Copy</code>) بين الحاويات المعنية بالتواصل فقط — لا حاوية تستطيع الاتصال بأخرى إلا عبر القناة المصرح بها.',
    tags: ['Least Privilege', 'seL4_CNode_Copy', 'Endpoint Badges', 'IPC'],
  },
  {
    icon: '🔍',
    title: 'كشف العتاد وتهيئة برامج التشغيل',
    shortTitle: 'كشف العتاد',
    summary: 'مسح ناقل الـ PCI وتهيئة بطاقات VirtIO Net',
    desc: 'تمسح <code>init</code> الناقل الفيزيائي عبر منافذ التكوين <code>0xCF8–0xCFF</code>:',
    points: [
      'التعرف على أجهزة VirtIO Net بالتوقيع <code>0x1AF4:0x1000</code>.',
      'تخصيص واستخراج عناوين BAR0 وتأمين الصلاحيات.',
      'تنفيذ تسلسل <code>Reset → ACK → DRIVER → DRIVER_OK</code> لتجهيز الشبكة.',
    ],
    tags: ['PCI', '0xCF8–0xCFF', 'VirtIO Net', 'BAR0'],
  },
  {
    icon: '🔒',
    title: 'منح وإدارة صلاحيات المنافذ الفيزيائية',
    shortTitle: 'إدارة I/O Ports',
    summary: 'منح الحاويات المستحقة صلاحيات الوصول لمنافذ العتاد',
    desc: 'بصفتها Root Task الوحيد الذي يملك <code>IOPortControl</code>، تمنح <code>init</code>:',
    points: [
      '<code>Disk_Vault</code>: نطاق <code>0x1F0–0x3F6</code> للتعامل مع قرص IDE/SATA.',
      '<code>Input_Vault</code>: نطاق <code>0x60–0x64</code> لشريحة PS/2 (كيبورد + ماوس).',
    ],
    tags: ['seL4_X86_IOPortControlIssue', 'Disk_Vault', 'Input_Vault', 'PS/2'],
  },
  {
    icon: '🏗️',
    title: 'تسلسل وتنسيق إقلاع الحاويات',
    shortTitle: 'التسلسل المنظم',
    summary: 'إقلاع الحاويات بالترتيب المعتمد على التبعيات',
    desc: 'ترتيب الإقلاع يعكس التبعيات الصارمة: لا حاوية تبدأ قبل أن تكون الخدمات التي تعتمد عليها جاهزة.',
    points: [
      '<strong>①</strong> Crypto_Vault → <strong>②</strong> Tor → <strong>③</strong> Disk_Vault',
      '<strong>④</strong> FS_Vault → <strong>⑤</strong> Auth_Vault → <strong>⑥</strong> Bus_Vault',
      '<strong>⑦</strong> Desktop → <strong>⑧</strong> Input_Vault → <strong>⑨</strong> Programs',
    ],
    tags: ['Boot Sequence', 'Dependency Order', 'setup_*()'],
  },
  {
    icon: '🧱',
    title: 'إنشاء مناطق الذاكرة المشتركة',
    shortTitle: 'الذاكرة المشتركة',
    summary: 'إنشاء مساحات تبادل بيانات سريعة بين الحاويات',
    desc: 'لنقل البيانات الكبيرة بدون إثقال قنوات IPC، تُخصِّص <code>init</code> إطارات ذاكرة مشتركة (<code>seL4_X86_4K</code>) وتعيّن العنوان الفيزيائي ذاته في مساحات حاويتين مختلفتين — مثل الربط بين <code>FS_Vault</code> و <code>Disk_Vault</code> لنقل الملفات بأعلى كفاءة.',
    tags: ['Shared Memory', 'seL4_X86_4K', 'FS_Vault', 'Disk_Vault'],
  },
  {
    icon: '🖥️',
    title: 'تهيئة الشاشة وربط الـ Framebuffer',
    shortTitle: 'إعداد الشاشة',
    summary: 'ربط الـ Framebuffer بحاوية الواجهة Desktop',
    desc: 'تقرأ <code>init</code> العنوان الفيزيائي للذاكرة الرسومية من بيانات Multiboot2، تحوّله عبر <code>retype_device_frame</code> وتعيّنه داخل VSpace حاوية <code>Desktop</code> عند <code>0x10000000</code>. ثم ترسل أبعاد الشاشة (العرض، الارتفاع، Pitch، BPP) عبر IPC لتبدأ الواجهة بالرسم.',
    tags: ['Multiboot2', 'Framebuffer', '0x10000000', 'Desktop'],
  },
  {
    icon: '⌨️',
    title: 'ربط المقاطعات وتوجيه المدخلات',
    shortTitle: 'معالجة المدخلات',
    summary: 'توجيه مقاطعات الكيبورد والماوس لحاوية Input_Vault',
    desc: 'تستخرج <code>init</code> صلاحيات المقاطعات (<code>IRQ Control Caps</code>) من الـ IOAPIC:',
    points: [
      'المقاطعة 1 للكيبورد، المقاطعة 12 للماوس.',
      'إنشاء <code>Notification</code> وتزويده بـ Badges تمييزية.',
      'ربط كل مقاطعة بالإشعار عبر <code>seL4_IRQHandler_SetNotification</code>.',
    ],
    tags: ['IOAPIC', 'IRQ 1', 'IRQ 12', 'Notification', 'Input_Vault'],
  },
  {
    icon: '🧪',
    title: 'الفحص والتحقق الذاتي بعد التشغيل',
    shortTitle: 'الفحص الذاتي',
    summary: 'التأكد الفوري من سلامة التشفير والتواصل فور الإقلاع',
    desc: 'تجري <code>init</code> اختبارات تحقق فورية بعد إقلاع الحاويات الحساسة:',
    points: [
      '<strong>اختبار Ping/Pong:</strong> للتأكد من استجابة قنوات IPC.',
      '<strong>اختبار Shamir Secret Sharing:</strong> إرسال مفتاح سري لـ Crypto_Vault وتقسيمه واستعادته للتحقق من سلامة منطق التشفير.',
    ],
    tags: ['Ping/Pong', 'Shamir Secret Sharing', 'Crypto_Vault', 'Post-Boot Test'],
  },
  {
    icon: '⚡',
    title: 'تهيئة مخصص الذاكرة المحلي',
    shortTitle: 'مخصص الذاكرة',
    summary: 'إدارة ذاكرة Heap محلية لـ init على مستوى العتاد',
    desc: 'تحتوي <code>init</code> على مخصص ذاكرة مدمج (<code>BumpAllocator</code>) يُهيَّأ ويُختبر فور الإقلاع لتأمين احتياجاتها الداخلية من الهياكل الديناميكية — بدون أي اعتماد على C Runtime أو Standard Heap.',
    tags: ['BumpAllocator', 'no_std', 'Heap', 'Bare-Metal'],
  },
  {
    icon: '🔁',
    title: 'حلقة الاستماع والتشغيل الديناميكي',
    shortTitle: 'التشغيل الديناميكي',
    summary: 'الاستجابة لطلبات إطلاق التطبيقات أثناء عمل النظام',
    desc: 'بعد اكتمال إقلاع كل الحاويات، تتحول <code>init</code> إلى Program Manager — تستمع على <code>launch_ep</code> لطلبات من <code>Desktop</code> (Tag: <code>0x0200</code>)، تبحث عن التطبيق في <code>PROGRAM_REGISTRY</code>، وتنشئ له VSpace + TCB مستقلَّين تماماً في بيئة معزولة.',
    tags: ['launch_ep', 'PROGRAM_REGISTRY', 'Program Manager', 'SVP Packages'],
  },
]
</script>

<style scoped>
.ifp-root {
  position: relative;
  min-height: 100vh;
  padding: calc(var(--vp-nav-height) + 2.5rem) 1.5rem 6rem;
  max-width: 860px;
  margin: 0 auto;
  font-family: 'Cairo', 'Inter', system-ui, sans-serif;
  overflow: hidden;
}

.ifp-root::before {
  content: '';
  position: absolute;
  width: 500px; height: 500px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(99,102,241,0.12), transparent 70%);
  filter: blur(80px);
  top: -100px; right: -150px;
  pointer-events: none; z-index: 0;
}
.ifp-root::after {
  content: '';
  position: absolute;
  width: 400px; height: 400px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(168,85,247,0.12), transparent 70%);
  filter: blur(80px);
  bottom: -100px; left: -150px;
  pointer-events: none; z-index: 0;
}

/* Header */
.ifp-header {
  position: relative; z-index: 1;
  text-align: center;
  margin-bottom: 2.5rem;
}
.ifp-breadcrumb {
  display: inline-flex; align-items: center; gap: 0.4rem;
  font-size: 0.82rem; font-weight: 700;
  color: var(--vp-c-brand-1);
  text-decoration: none; opacity: 0.8;
  transition: opacity 0.2s;
  margin-bottom: 1rem;
}
.ifp-breadcrumb:hover { opacity: 1; }
.ifp-badge {
  display: inline-flex;
  font-size: 0.7rem; font-weight: 800;
  letter-spacing: 0.12em;
  padding: 0.3rem 0.9rem;
  border-radius: 100px;
  background: color-mix(in srgb, #6366f1 15%, transparent);
  color: #818cf8;
  border: 1px solid color-mix(in srgb, #6366f1 30%, transparent);
  margin-bottom: 0.75rem;
}
.ifp-title {
  font-size: clamp(1.75rem, 4.5vw, 2.75rem);
  font-weight: 900; margin: 0 0 0.5rem;
  color: var(--vp-c-text-1);
  border: none; padding: 0; line-height: 1.2;
}
.hl {
  background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.ifp-sub {
  font-size: 0.95rem; color: var(--vp-c-text-2);
  max-width: 600px; margin: 0 auto 1.25rem;
  line-height: 1.7;
}
.ifp-sub code {
  font-size: 0.88rem;
  background: var(--vp-c-bg-mute);
  padding: 1px 5px; border-radius: 4px;
}
.ifp-count-pill {
  display: inline-flex; align-items: center; gap: 0.5rem;
  padding: 0.4rem 1.2rem;
  border-radius: 100px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  font-size: 0.82rem;
}
.pill-num { font-weight: 900; font-size: 1.1rem; color: #818cf8; }
.pill-lbl { color: var(--vp-c-text-3); font-weight: 600; }

/* Function cards */
.ifp-list {
  position: relative; z-index: 1;
  display: flex; flex-direction: column; gap: 6px;
  margin-bottom: 3rem;
}

.fn-card {
  position: relative;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  overflow: hidden;
  cursor: pointer;
  transition: border-color 0.25s, box-shadow 0.3s, transform 0.2s;
  user-select: none;
}
.fn-card:hover {
  border-color: color-mix(in srgb, var(--vp-c-brand-1) 40%, transparent);
  box-shadow: 0 4px 20px color-mix(in srgb, var(--vp-c-brand-1) 8%, transparent);
  transform: translateY(-1px);
}
.fn-card.is-open {
  border-color: color-mix(in srgb, var(--vp-c-brand-1) 60%, transparent);
}

.fn-accent {
  position: absolute; top: 0; left: 0; right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--vp-c-brand-1) 50%, transparent);
  opacity: 0; transition: opacity 0.3s;
}
.fn-card:hover .fn-accent,
.fn-card.is-open .fn-accent { opacity: 1; }

.fn-header {
  display: flex; align-items: center; gap: 12px;
  padding: 12px 16px;
}
.fn-icon-wrap {
  width: 42px; height: 42px; border-radius: 12px;
  background: color-mix(in srgb, var(--vp-c-brand-1) 10%, var(--vp-c-bg));
  border: 1px solid color-mix(in srgb, var(--vp-c-brand-1) 18%, transparent);
  display: flex; align-items: center; justify-content: center;
  font-size: 1.3rem; flex-shrink: 0;
  transition: transform 0.3s;
}
.fn-card:hover .fn-icon-wrap { transform: scale(1.1) rotate(-3deg); }

.fn-header-text { flex: 1; min-width: 0; }
.fn-num-badge {
  font-size: 0.62rem; font-weight: 800;
  letter-spacing: 0.1em;
  color: var(--vp-c-brand-1); opacity: 0.65;
}
.fn-title {
  font-size: 0.92rem; font-weight: 700; margin: 0;
  color: var(--vp-c-text-1);
  border: none; padding: 0; line-height: 1.4;
}

.fn-chevron {
  color: var(--vp-c-text-3);
  display: flex; align-items: center;
  transition: transform 0.3s, color 0.2s;
  flex-shrink: 0;
}
.fn-chevron.rotated {
  transform: rotate(180deg);
  color: var(--vp-c-brand-1);
}

.fn-body {
  border-top: 1px solid var(--vp-c-divider);
  padding: 16px 20px;
  cursor: default;
}
.fn-desc {
  font-size: 0.9rem; color: var(--vp-c-text-2);
  line-height: 1.7; margin: 0 0 0.75rem;
}
.fn-desc :deep(code),
.fn-body :deep(code) {
  font-size: 0.82rem;
  background: var(--vp-c-bg-mute);
  padding: 2px 6px; border-radius: 4px;
}
.fn-points {
  margin: 0 0 0.75rem;
  padding-right: 1.2rem;
  font-size: 0.88rem; color: var(--vp-c-text-2); line-height: 1.7;
}
.fn-points li { margin-bottom: 0.3rem; }
.fn-tags {
  display: flex; flex-wrap: wrap; gap: 6px;
  margin-top: 0.75rem;
}
.fn-tag {
  font-size: 0.7rem; font-weight: 700;
  padding: 2px 10px; border-radius: 100px;
  background: color-mix(in srgb, var(--vp-c-brand-1) 10%, transparent);
  color: var(--vp-c-brand-1);
  border: 1px solid color-mix(in srgb, var(--vp-c-brand-1) 20%, transparent);
  font-family: monospace;
}

/* Summary table */
.ifp-summary {
  position: relative; z-index: 1;
  margin-bottom: 3rem;
}
.ifp-summary-title {
  font-size: 1.2rem; font-weight: 800;
  margin: 0 0 1rem;
  color: var(--vp-c-text-1);
  border: none; padding: 0;
}
.summary-table-wrap {
  overflow-x: auto;
  border-radius: 14px;
  border: 1px solid var(--vp-c-divider);
}
.summary-table {
  width: 100%; border-collapse: collapse;
  font-size: 0.85rem;
}
.summary-table thead tr {
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
}
.summary-table th {
  padding: 10px 14px;
  text-align: right; font-weight: 700;
  color: var(--vp-c-text-2);
  font-size: 0.78rem; letter-spacing: 0.05em;
  text-transform: uppercase;
}
.summary-table tbody tr {
  border-bottom: 1px solid var(--vp-c-divider);
  transition: background 0.15s;
}
.summary-table tbody tr:last-child { border-bottom: none; }
.summary-table tbody tr:hover { background: var(--vp-c-bg-soft); }
.summary-table td { padding: 9px 14px; vertical-align: middle; }
.st-num { font-weight: 900; color: var(--vp-c-brand-1); opacity: 0.7; font-size: 0.75rem; white-space: nowrap; }
.st-name { font-weight: 700; color: var(--vp-c-text-1); display: flex; align-items: center; gap: 6px; white-space: nowrap; }
.st-icon { font-size: 1rem; }
.st-desc { color: var(--vp-c-text-2); line-height: 1.5; }

/* Footer nav */
.ifp-footer {
  position: relative; z-index: 1;
  display: flex; flex-wrap: wrap;
  justify-content: center; gap: 10px;
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
  background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
  color: white !important;
  border-color: transparent !important;
  box-shadow: 0 4px 16px rgba(99, 102, 241, 0.35);
}
.nav-btn-accent:hover {
  color: white !important;
  box-shadow: 0 6px 24px rgba(99, 102, 241, 0.5);
}
</style>
