<script setup>
import { ref } from 'vue'

const activeTab = ref('all')

const items = [
  {
    id: 'kernel',
    cat: 'core',
    icon: '🏛️',
    title: 'النواة والميكروكيرنل الأصلي (seL4 Microkernel)',
    path: 'kernel/seL4',
    owner: 'seL4 Foundation / Data61 / UNSW',
    ownerUrl: 'https://sel4.systems',
    color: '#3b82f6',
    desc: 'النواة الصغرى المصنوعة بلغة C والمدعومة بإثباتات التحقق الرياضي الصارم (Formally Verified). تُشكل الأساس الأمني الصلب لنظام Hisn-seL4 عبر توفير إدارة الذاكرة، والتجريد الأدنى، وقنوات الاتصال البدائية (IPC).',
    thanks: 'نوجه أسمى آيات الشكر والتقدير لمؤسسة seL4 Foundation وجميع الباحثين والمهندسين القائمين على هذا المشروع التاريخي الذي غير مفاهيم أمان نظم التشغيل ووضع معايير الأمان الرياضي المعزز في العالم.',
    subItems: []
  },
  {
    id: 'tools',
    cat: 'core',
    icon: '🛠️',
    title: 'أدوات بناء النواة ومُحمل الصور (seL4 Tools & Elfloader)',
    path: 'kernel/seL4_tools',
    owner: 'فريق تطوير seL4 الرسميون',
    color: '#06b6d4',
    desc: 'مجموعة الأدوات المساعدة الرسمية والمكونة من سكريبتات CMake و Python ومحمل الـ elfloader. تقوم هذه الأدوات ببناء وتجميع كود النواة، وتحويل ملفات الـ ELF، وتجهيز هيكل seL4_BootInfo لبدء تنفيذ أول مهمة في مساحة المستخدم (Root Task).',
    thanks: 'كل الشكر لفرق التطوير والأدوات في مجتمع seL4 لتوفير بيئة بناء متكاملة ومستقرة تسهل أتمتة تجميع صور الإقلاع.',
    subItems: []
  },
  {
    id: 'util-libs',
    cat: 'core',
    icon: '📦',
    title: 'مكتبات C الداعمة للنواة (seL4 C Support Libraries)',
    path: 'kernel/util_libs',
    owner: 'مشروع seL4 الرسمي',
    color: '#8b5cf6',
    desc: 'حزمة من المكتبات المساعدة المكتوبة بلغة C (مثل libsel4, libmuslc, libelf, libcpio). تُستخدم هذه المكتبات في مرحلة البناء والإقلاع الابتدائي لتوفير الهياكل الأساسية وتأمين متطلبات التجميع قبل الانتقال الكامل لبيئة Rust.',
    thanks: 'نقدر جهود مطوري مكتبات C الداعمة على تفانيهم في صيانة هذه المكتبات وتأمين توافقها العالي مع المعالجات المختلفة.',
    subItems: []
  },
  {
    id: 'rust-crypto',
    cat: 'crypto',
    icon: '🦀',
    title: 'مكتبات التشفير الخارجية المعتمدة من مجتمع Rust (RustCrypto Crates)',
    path: 'libs/ & containers/',
    owner: 'منظمة RustCrypto Org والمجتمع المفتوح',
    color: '#ec4899',
    desc: 'حزمة من مكتبات التشفير الخارجية الموثوقة والمطابقة للمعايير العالمية، تعمل في بيئة no_std لتأمين أعلى مستويات حماية البيانات وأداء التشفير في جميع حاويات النظام:',
    thanks: 'نعبر عن امتناننا العميق لمنظمة RustCrypto Org ولجميع المساهمين في مجتمع Rust التشفيري لتقديمهم مكتبات مفتوحة المصدر، فائقة الأداء، وآمنة الذاكرة جعلت التشفير المتقدم ممكناً على مستوى العتاد بدون نظام تشغيل تقليدي.',
    subItems: [
      {
        name: 'chacha20poly1305',
        path: 'libs/vault-crypto/Cargo.toml',
        desc: 'خوارزمية تشفير المفاتيح التناظرية القياسية (AEAD) التي تجمع بين شفرة ChaCha20 وتوثيق Poly1305 لتشفير وحماية سرية بيانات الحاويات وتأمين الهوية.'
      },
      {
        name: 'chacha20',
        path: 'libs/vault-crypto/Cargo.toml',
        desc: 'الشفرة التدفقية السريعة (Stream Cipher) فائقة الأداء المستخدمة لتشفير التوافقات وتدفقات البيانات الحساسة بدون الاعتماد على مكتبات النظام standard.'
      },
      {
        name: 'poly1305',
        path: 'libs/vault-crypto/Cargo.toml',
        desc: 'الخوارزمية الرياضية فائقة السرعة لتوليد وتدقيق رمز توثيق الرسائل (MAC) للتحقق من سلامة المحتوى وحمايته من أي تلاعب في الذاكرة.'
      },
      {
        name: 'subtle',
        path: 'libs/vault-crypto/Cargo.toml',
        desc: 'مكتبة التنفيذ بالزمن الثابت (Constant-Time Operations) التي تحمي خوارزميات التشفير من هجمات القنوات الجانبية (Side-Channel & Timing Attacks).'
      },
      {
        name: 'aes',
        path: 'containers/tor/Cargo.toml',
        desc: 'تنفيذ معيار التشفير المتقدم (Rijndael AES) المستخدم لتشفير وفك تشفير طبقات الخلايا في شبكة التوجيه البصلي Tor.'
      },
      {
        name: 'sha2',
        path: 'containers/tor/Cargo.toml',
        desc: 'خوارزميات الهاش التلخيصي القياسية (SHA-256 / SHA-512) لبناء بصمات الهوية الإلكترونية وتأمين توقيعات شبكة Tor.'
      },
      {
        name: 'curve25519-dalek',
        path: 'containers/tor/Cargo.toml',
        desc: 'تشفير المنحنيات البيضاوية عالية الأمان المستخدمة لتنفيذ بروتوكول تبادل المفاتيح الآمن Diffie-Hellman أثناء فتح المسارات المعماة.'
      }
    ]
  },
  {
    id: 'boot-env',
    cat: 'boot',
    icon: '🖥️',
    title: 'بيئة البوت والمحاكاة (Multiboot2 & QEMU Ecosystem)',
    path: 'iso_root/boot/grub/ & CMakeLists.txt',
    owner: 'مشروع GNU (GRUB) & مطورو QEMU',
    color: '#10b981',
    desc: 'حزمة معايير إقلاع Multiboot2 المحمولة ومحاكي العتاد الشامل QEMU. تتيح هذه الأدوات إمكانية بناء ملفات صور الـ ISO وإقلاع نظام Hisn-seL4 وتجربته عبر المعالجات الحقيقية والأجهزة الافتراضية بنفس الكفاءة.',
    thanks: 'جزيل الشكر لمؤسسة Free Software Foundation ولمطوري QEMU و GRUB على تفانيهم في تطوير أفضل بيئات الإقلاع والمحاكاة في عالم البرمجيات الحرة.',
    subItems: []
  }
]

function filteredItems() {
  if (activeTab.value === 'all') return items
  return items.filter(i => i.cat === activeTab.value)
}
</script>

<template>
  <div class="tp-root">
    <!-- Header Section -->
    <header class="tp-header">
      <div class="tp-badge">
        <span class="badge-dot"></span>
        <span>HISN-SEL4 EXTERNAL ECOSYSTEM</span>
      </div>

      <div class="tp-icon-wrapper">
        <div class="icon-ring ring-outer"></div>
        <div class="icon-ring ring-inner"></div>
        <span class="tp-main-icon">🤝</span>
      </div>

      <h1 class="tp-title">
        <span class="gradient-text-white">المكونات والاعتمادات</span>
        <span class="gradient-text-pink"> الخارجية</span>
      </h1>

      <p class="tp-subtitle">
        الشركاء والركائز المفتوحة المصدر التي تستند إليها بنية نظام <strong>Hisn-seL4</strong> مع أسمى آيات التقدير والشكر لمطوريها
      </p>

      <!-- Stats Bar -->
      <div class="tp-stats-bar">
        <div class="stat-pill">
          <span class="stat-icon">🏛️</span>
          <span class="stat-val">seL4 Kernel</span>
          <span class="stat-tag">Formally Verified</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-pill">
          <span class="stat-icon">🦀</span>
          <span class="stat-val">7 Crates</span>
          <span class="stat-tag">RustCrypto</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-pill">
          <span class="stat-icon">🌐</span>
          <span class="stat-val">100%</span>
          <span class="stat-tag">Open Source</span>
        </div>
      </div>

      <!-- Filters -->
      <div class="tp-tabs">
        <button
          class="tab-btn"
          :class="{ active: activeTab === 'all' }"
          @click="activeTab = 'all'"
        >
          🌐 الكل ({{ items.length }})
        </button>
        <button
          class="tab-btn"
          :class="{ active: activeTab === 'core' }"
          @click="activeTab = 'core'"
        >
          🏛️ النواة والأدوات (3)
        </button>
        <button
          class="tab-btn"
          :class="{ active: activeTab === 'crypto' }"
          @click="activeTab = 'crypto'"
        >
          🦀 مكتبات التشفير (1)
        </button>
        <button
          class="tab-btn"
          :class="{ active: activeTab === 'boot' }"
          @click="activeTab = 'boot'"
        >
          🖥️ البوت والمحاكاة (1)
        </button>
      </div>
    </header>

    <!-- Content Cards List -->
    <main class="tp-cards-list">
      <div
        v-for="item in filteredItems()"
        :key="item.id"
        class="tp-card"
        :style="{ '--accent': item.color }"
      >
        <div class="card-glow"></div>
        <div class="card-top-accent"></div>

        <!-- Card Header -->
        <div class="card-header">
          <div class="card-icon-box">
            <span class="c-icon">{{ item.icon }}</span>
          </div>

          <div class="card-title-group">
            <h2 class="c-title">{{ item.title }}</h2>
            <div class="c-meta-row">
              <span class="c-badge path-badge">
                <span class="b-icon">📁</span>
                <code>{{ item.path }}</code>
              </span>
              <span class="c-badge owner-badge">
                <span class="b-icon">👤</span>
                <span>{{ item.owner }}</span>
              </span>
            </div>
          </div>
        </div>

        <!-- Description -->
        <p class="c-desc">{{ item.desc }}</p>

        <!-- Sub Items (Rust Crypto crates list) -->
        <div v-if="item.subItems && item.subItems.length > 0" class="sub-crates-grid">
          <div
            v-for="crateItem in item.subItems"
            :key="crateItem.name"
            class="crate-card"
          >
            <div class="crate-header">
              <span class="crate-name">📦 {{ crateItem.name }}</span>
              <span class="crate-path"><code>{{ crateItem.path }}</code></span>
            </div>
            <p class="crate-desc">{{ crateItem.desc }}</p>
          </div>
        </div>

        <!-- Thanks Box -->
        <div class="thanks-box">
          <div class="thanks-header">
            <span class="heart-icon">💖</span>
            <span class="thanks-title">كلمة شكر وتقدير</span>
          </div>
          <p class="thanks-text">{{ item.thanks }}</p>
        </div>
      </div>
    </main>

    <!-- Footer Links -->
    <footer class="tp-footer">
      <a href="/hisn/" class="footer-btn">
        <span>←</span>
        <span>العودة للرئيسية</span>
      </a>
      <a href="/hisn/containers/" class="footer-btn">
        <span>📦</span>
        <span>قائمة الحاويات</span>
      </a>
    </footer>
  </div>
</template>

<style scoped>
.tp-root {
  position: relative;
  min-height: 100vh;
  padding: calc(var(--vp-nav-height) + 2rem) 1.5rem 6rem;
  font-family: 'Cairo', 'Inter', system-ui, sans-serif;
  color: #f8fafc;
  overflow: hidden;
  max-width: 1100px;
  margin: 0 auto;
}

/* ── Ambient Glows (Pseudo-elements) ── */
.tp-root::before {
  content: '';
  position: absolute;
  width: 700px; height: 700px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(236,72,153,0.15), transparent 70%);
  filter: blur(100px);
  top: -200px; right: -250px;
  pointer-events: none; z-index: 0;
}
.tp-root::after {
  content: '';
  position: absolute;
  width: 600px; height: 600px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(59,130,246,0.12), transparent 70%);
  filter: blur(100px);
  bottom: -150px; left: -200px;
  pointer-events: none; z-index: 0;
}

/* ── Header ── */
.tp-header {
  position: relative;
  z-index: 1;
  text-align: center;
  margin-bottom: 3.5rem;
}
.tp-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.15em;
  color: rgba(248, 250, 252, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 100px;
  padding: 0.5rem 1.25rem;
  margin-bottom: 2rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}
.badge-dot {
  width: 8px; height: 8px;
  border-radius: 50%;
  background: #ec4899;
  box-shadow: 0 0 12px #ec4899;
  animation: pulse-pink 2s infinite;
}
@keyframes pulse-pink {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.4); }
}

.tp-icon-wrapper {
  position: relative;
  width: 120px; height: 120px;
  margin: 0 auto 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.icon-ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 2px solid transparent;
}
.ring-outer {
  inset: -15px;
  border-top-color: rgba(236, 72, 153, 0.6);
  border-right-color: rgba(236, 72, 153, 0.2);
  border-bottom-color: transparent;
  border-left-color: transparent;
  animation: spin-slow 15s linear infinite;
}
.ring-inner {
  border-bottom-color: rgba(59, 130, 246, 0.6);
  border-left-color: rgba(59, 130, 246, 0.2);
  border-top-color: transparent;
  border-right-color: transparent;
  animation: spin-reverse 10s linear infinite;
}
@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
@keyframes spin-reverse {
  from { transform: rotate(360deg); }
  to { transform: rotate(0deg); }
}
.tp-main-icon {
  font-size: 4.5rem;
  filter: drop-shadow(0 10px 25px rgba(236, 72, 153, 0.4));
  z-index: 2;
}

.tp-title {
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 900;
  line-height: 1.2;
  margin: 0 0 1rem;
  border: none;
  padding: 0;
}
.gradient-text-white {
  background: linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.7) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.gradient-text-pink {
  background: linear-gradient(135deg, #ec4899 0%, #f43f5e 50%, #fb7185 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 20px rgba(236,72,153,0.4));
}

.tp-subtitle {
  font-size: 1.2rem;
  color: rgba(248, 250, 252, 0.7);
  max-width: 750px;
  margin: 0 auto 2.5rem;
  line-height: 1.8;
}

/* Stats Bar */
.tp-stats-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 1rem 2.5rem;
  background: linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 100px;
  backdrop-filter: blur(16px);
  width: fit-content;
  margin: 0 auto 3rem;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}
.stat-pill {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.95rem;
}
.stat-icon { font-size: 1.2rem; }
.stat-val { font-weight: 900; color: #fff; }
.stat-tag {
  font-size: 0.75rem;
  padding: 0.25rem 0.6rem;
  border-radius: 8px;
  background: rgba(236, 72, 153, 0.2);
  color: #fbcfe8;
  font-weight: 700;
  border: 1px solid rgba(236, 72, 153, 0.3);
}
.stat-divider {
  width: 2px; height: 24px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 2px;
}

/* Tabs */
.tp-tabs {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}
.tab-btn {
  padding: 0.75rem 1.5rem;
  border-radius: 16px;
  font-size: 0.95rem;
  font-weight: 700;
  color: rgba(248, 250, 252, 0.6);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: inherit;
}
.tab-btn:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.08);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.15);
}
.tab-btn.active {
  color: #fff;
  background: linear-gradient(135deg, rgba(236,72,153,0.8) 0%, rgba(79,70,229,0.8) 100%);
  border-color: transparent;
  box-shadow: 0 8px 25px rgba(236, 72, 153, 0.4);
}

/* ── Cards List ── */
.tp-cards-list {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.tp-card {
  position: relative;
  background: rgba(15, 23, 42, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 28px;
  padding: 2.5rem;
  backdrop-filter: blur(20px);
  overflow: hidden;
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 10px 30px rgba(0,0,0,0.15);
}
.tp-card:hover {
  transform: translateY(-6px);
  border-color: color-mix(in srgb, var(--accent) 50%, rgba(255,255,255,0.1));
  box-shadow: 0 25px 50px -15px color-mix(in srgb, var(--accent) 30%, transparent);
}

.card-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at 80% 20%,
    color-mix(in srgb, var(--accent) 20%, transparent) 0%,
    transparent 60%
  );
  pointer-events: none;
  opacity: 0.6;
  transition: opacity 0.4s ease;
}
.tp-card:hover .card-glow {
  opacity: 1;
}

.card-top-accent {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 4px;
  background: linear-gradient(90deg, transparent, var(--accent), transparent);
  opacity: 0.8;
}

/* Card Header */
.card-header {
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  margin-bottom: 1.75rem;
}
.card-icon-box {
  width: 64px; height: 64px;
  border-radius: 18px;
  background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.02));
  border: 1px solid rgba(255, 255, 255, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.2rem;
  flex-shrink: 0;
  box-shadow: 0 10px 20px rgba(0,0,0,0.2), inset 0 2px 5px rgba(255,255,255,0.1);
}
.card-title-group { flex: 1; }
.c-title {
  font-size: 1.5rem;
  font-weight: 800;
  margin: 0 0 0.75rem;
  color: #fff;
  border: none;
  padding: 0;
  line-height: 1.4;
}

.c-meta-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}
.c-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  padding: 0.35rem 0.85rem;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: inset 0 1px 3px rgba(0,0,0,0.5);
}
.path-badge code {
  color: #38bdf8;
  font-family: 'Space Mono', monospace;
  font-size: 0.85rem;
  background: transparent !important;
  padding: 0 !important;
}
.owner-badge {
  color: #f472b6;
  font-weight: 700;
}

.c-desc {
  font-size: 1.05rem;
  line-height: 1.8;
  color: rgba(248, 250, 252, 0.8);
  margin: 0 0 2rem;
}

/* Sub Crates Grid */
.sub-crates-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.25rem;
  margin-bottom: 2rem;
}
.crate-card {
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 1.25rem 1.5rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}
.crate-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; width: 4px; height: 100%;
  background: var(--accent);
  opacity: 0.5;
  transition: opacity 0.3s;
}
.crate-card:hover {
  border-color: color-mix(in srgb, var(--accent) 40%, rgba(255,255,255,0.1));
  background: rgba(0, 0, 0, 0.6);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.2);
}
.crate-card:hover::before {
  opacity: 1;
}
.crate-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}
.crate-name {
  font-weight: 800;
  color: #e2e8f0;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}
.crate-path code {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.5);
  background: rgba(255,255,255,0.05) !important;
  padding: 0.2rem 0.5rem !important;
  border-radius: 6px;
}
.crate-desc {
  font-size: 0.9rem;
  line-height: 1.6;
  color: rgba(248, 250, 252, 0.7);
  margin: 0;
}

/* Thanks Box */
.thanks-box {
  background: linear-gradient(135deg, rgba(236, 72, 153, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%);
  border: 1px solid rgba(236, 72, 153, 0.3);
  border-radius: 20px;
  padding: 1.5rem 2rem;
  position: relative;
  overflow: hidden;
}
.thanks-box::before {
  content: '';
  position: absolute;
  top: -50px; right: -50px;
  width: 100px; height: 100px;
  background: rgba(236, 72, 153, 0.2);
  filter: blur(30px);
  border-radius: 50%;
}
.thanks-header {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 0.75rem;
  position: relative;
  z-index: 1;
}
.heart-icon { font-size: 1.25rem; }
.thanks-title {
  font-weight: 800;
  font-size: 1rem;
  color: #f472b6;
  letter-spacing: 0.05em;
}
.thanks-text {
  font-size: 0.95rem;
  line-height: 1.7;
  color: rgba(248, 250, 252, 0.9);
  margin: 0;
  position: relative;
  z-index: 1;
}

/* ── Footer ── */
.tp-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 5rem;
  position: relative;
  z-index: 1;
}
.footer-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  border-radius: 16px;
  font-weight: 800;
  font-size: 1rem;
  text-decoration: none !important;
  color: #fff !important;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}
.footer-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-4px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
}

@media (max-width: 768px) {
  .tp-stats-bar {
    flex-direction: column;
    border-radius: 24px;
    gap: 1rem;
    padding: 1.5rem;
  }
  .stat-divider { display: none; }
  .card-header { flex-direction: column; align-items: stretch; gap: 1rem; }
  .c-meta-row { flex-direction: column; align-items: stretch; }
  .c-badge { justify-content: center; }
  .sub-crates-grid { grid-template-columns: 1fr; }
  .tp-footer { flex-direction: column; width: 100%; }
  .footer-btn { justify-content: center; width: 100%; }
}
</style>
