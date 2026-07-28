<!-- GithubCinematic.vue — Cinematic Journey for GitHub Concepts -->
<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const emit = defineEmits(['close'])

// ── Data (GitHub Concepts) ─────────────────────
const concepts = [
  {
    id: 'repository', icon: '📁', color: '#8b949e', shortTitle: 'Repository', title: 'المستودع (Repo)',
    subtitle: 'المركز الرئيسي للمشروع',
    description: 'المستودع هو المجلد الذي يحتوي على كل ملفات مشروعك وتاريخ التعديلات. يمكن أن يكون محلياً على جهازك أو بعيداً على خوادم GitHub.',
    analogy: { icon: '🏦', text: 'كخزينة البنك؛ تحتوي على كل أصولك وتاريخ إيداعاتك وسحوباتك بالتفصيل، ولا يضيع فيها شيء أبداً.' }
  },
  {
    id: 'clone', icon: '📥', color: '#238636', shortTitle: 'Clone', title: 'الاستنساخ',
    subtitle: 'نقل المشروع إلى جهازك',
    description: 'عملية استنساخ المستودع من GitHub إلى حاسوبك الشخصي لتبدأ العمل عليه والبرمجة والتطوير بدون الحاجة للاتصال بالإنترنت بشكل دائم.',
    analogy: { icon: '🖨️', text: 'مثل طباعة نسخة من كتاب من المكتبة العامة لتتمكن من تدوين ملاحظاتك عليها في منزلك براحة.' }
  },
  {
    id: 'branch', icon: '🌿', color: '#3fb950', shortTitle: 'Branch', title: 'الفروع',
    subtitle: 'مسارات تطوير موازية',
    description: 'الفروع تسمح لك بتطوير ميزات جديدة أو إصلاح أخطاء بشكل منعزل تماماً عن الكود الرئيسي (main/master) حتى لا تتسبب بكسر المشروع للمستخدمين.',
    analogy: { icon: '🛤️', text: 'خط سكة حديد فرعي تذهب فيه لإجراء الصيانة أو البناء، بينما يستمر القطار الرئيسي بالعمل ونقل الركاب بأمان.' }
  },
  {
    id: 'commit', icon: '📌', color: '#f778ba', shortTitle: 'Commit', title: 'الالتزام (الحفظ)',
    subtitle: 'حفظ حالة الملفات',
    description: 'عندما تكمل جزءاً من العمل تقوم بعمل Commit، وهو بمثابة صورة (Snapshot) لحالة المشروع في تلك اللحظة، مع رسالة توضح ما تم إنجازه.',
    analogy: { icon: '📸', text: 'صورة تذكارية في رحلة؛ إذا ضعت في المستقبل، يمكنك دائماً العودة إلى هذه اللحظة والنظر في الخريطة كما كانت وقتها.' }
  },
  {
    id: 'pushpull', icon: '🔄', color: '#58a6ff', shortTitle: 'Push & Pull', title: 'المزامنة (Push / Pull)',
    subtitle: 'التواصل مع السحابة',
    description: 'Push يرسل الالتزامات (Commits) الخاصة بك إلى GitHub، بينما Pull يجلب التعديلات التي قام بها زملاؤك من GitHub إلى جهازك.',
    analogy: { icon: '☁️', text: 'كرفع ملفاتك الخاصة إلى سحابة Google Drive (Push) أو تنزيل مجلد شاركه معك صديقك (Pull).' }
  },
  {
    id: 'fork', icon: '🍴', color: '#e3b341', shortTitle: 'Fork', title: 'الاستنساخ السحابي (Fork)',
    subtitle: 'نسختك الخاصة من مشروع مفتوح المصدر',
    description: 'عندما تريد المساهمة في مشروع لا تملك صلاحية التعديل عليه، تقوم بعمل Fork؛ وهو إنشاء نسخة كاملة منه تحت حسابك على GitHub لتعدّلها براحتك.',
    analogy: { icon: '🧬', text: 'أخذ سلالة جديدة من شجرة تفاح لزراعتها في حديقتك. يمكنك تعديلها، وفي المستقبل قد تعطي ثماراً أفضل من الشجرة الأم.' }
  },
  {
    id: 'pr', icon: '🤝', color: '#2dba4e', shortTitle: 'Pull Request', title: 'الطلب بالسحب (PR)',
    subtitle: 'اقتراح التعديلات للمراجعة',
    description: 'عندما تنهي عملك في فرعك أو نسختك، تفتح Pull Request لتطلب من ملاّك المشروع سحب تعديلاتك ودمجها. هنا تبدأ النقاشات ومراجعة الكود.',
    analogy: { icon: '📝', text: 'تسليم مسودة مقالك لرئيس التحرير. سيقوم بمراجعتها وترك تعليقات، ولن تُنشر في الجريدة إلا بعد موافقته.' }
  },
  {
    id: 'merge', icon: '🔀', color: '#8957e5', shortTitle: 'Merge', title: 'الدمج',
    subtitle: 'توحيد المسارات',
    description: 'إذا كان الـ PR ممتازاً، يتم عمل Merge، وهو دمج الكود الجديد مع الكود الرئيسي (main). أحياناً تحدث تعارضات (Conflicts) ويجب حلها يدوياً.',
    analogy: { icon: '🛣️', text: 'عودة السيارات من التحويلة الفرعية إلى الطريق السريع الرئيسي. يجب التنظيم لتفادي الحوادث (Conflicts)!' }
  },
  {
    id: 'issues', icon: '🐞', color: '#d73a49', shortTitle: 'Issues', title: 'المشكلات والاقتراحات',
    subtitle: 'نظام تتبع الأخطاء',
    description: 'مكان لتسجيل الأخطاء (Bugs) أو اقتراح ميزات جديدة، أو حتى نقاش الأفكار. كل Issue له رقم ويمكن ربطه بالـ Commits أو الـ PRs لإغلاقه تلقائياً.',
    analogy: { icon: '📋', text: 'صندوق الشكاوى والمقترحات في الشركة. كل بطاقة لها متطوع يدرسها ويعمل على حلها.' }
  },
  {
    id: 'actions', icon: '🚀', color: '#2088ff', shortTitle: 'GitHub Actions', title: 'الإجراءات المؤتمتة',
    subtitle: 'CI/CD - الأتمتة الكاملة',
    description: 'خدمة قوية من GitHub تتيح لك تشغيل سكريبتات تلقائية بمجرد رفع الكود (مثلاً: تشغيل اختبارات، أو نشر الموقع فور الدمج).',
    analogy: { icon: '🤖', text: 'روبوت صغير يعمل كحارس بوابة؛ يرفض أي كود لا ينجح في الاختبارات، وإذا نجح، يطير ليضعه في خوادم الإنترنت الحية.' }
  }
]

// ── State ──────────────────────────────────────────────
const activeIndex = ref(0)
const activeConcept = computed(() => concepts[activeIndex.value])

// ── Auto-play ──────────────────────────────────────────
const autoSpeed    = ref(6)
const isAutoPlay   = ref(false)
const speedOptions = [3, 6, 10]
let autoTimer = null

function startAuto() {
  stopAuto()
  autoTimer = setInterval(() => {
    if (activeIndex.value < concepts.length - 1) {
      goTo(activeIndex.value + 1)
    } else {
      stopAuto()
    }
  }, autoSpeed.value * 1000)
}
function stopAuto() { clearInterval(autoTimer); autoTimer = null; isAutoPlay.value = false }
function toggleAuto() {
  if (isAutoPlay.value) { stopAuto() }
  else { isAutoPlay.value = true; startAuto() }
}
function setSpeed(s) { autoSpeed.value = s; if (isAutoPlay.value) startAuto() }

// ── Scroll ─────────────────────────────────────────────
const scrollProgress = ref(0)
const rootEl = ref(null)
const sectionRefs = []
const setRef = (el, i) => { if (el) sectionRefs[i] = el }
let observer = null

const onScroll = () => {
  if (!rootEl.value) return
  const el = rootEl.value
  const max = el.scrollHeight - el.clientHeight
  scrollProgress.value = max > 0 ? (el.scrollTop / max) * 100 : 0
}

const goTo = (i) => {
  if (i < 0 || i >= concepts.length) return
  if (sectionRefs[i]) sectionRefs[i].scrollIntoView({ behavior: 'smooth', block: 'start' })
}
const next = () => goTo(activeIndex.value + 1)
const prev = () => goTo(activeIndex.value - 1)

const onKey = (e) => {
  if (e.key === 'Escape')     emit('close')
  if (e.key === 'ArrowDown')  next()
  if (e.key === 'ArrowUp')    prev()
  if (e.key === ' ')          { e.preventDefault(); toggleAuto() }
}

onMounted(() => {
  if (rootEl.value) rootEl.value.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKey)

  observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) activeIndex.value = parseInt(e.target.getAttribute('data-index'), 10)
    })
  }, { root: rootEl.value, threshold: 0.5 })

  sectionRefs.forEach(r => { if (r) observer.observe(r) })

  requestAnimationFrame(() => {
    if (!rootEl.value) return
    rootEl.value.scrollTop = 0
    activeIndex.value = 0
  })
})

onUnmounted(() => {
  if (rootEl.value) rootEl.value.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKey)
  if (observer) observer.disconnect()
  stopAuto()
})
</script>

<template>
  <div class="rc-overlay">

    <!-- ── Desktop Side Buttons ── -->
    <button class="rc-side-btn rc-side-prev" :disabled="activeIndex === 0" @click="prev">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
    </button>
    <button class="rc-side-btn rc-side-next" :disabled="activeIndex === concepts.length - 1" @click="next">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
    </button>

    <!-- ── Desktop Top Bar ── -->
    <div class="rc-top-bar">
      <button class="rc-close-btn" @click="$emit('close')">✕ إغلاق</button>
      <div style="flex:1"></div>
      <span class="rc-progress-label">{{ activeIndex + 1 }} / {{ concepts.length }}</span>
      <div class="rc-auto-controls">
        <div class="rc-speed-group">
          <span class="rc-speed-label">التلقائي:</span>
          <button v-for="s in speedOptions" :key="s" class="rc-speed-btn" :class="{ active: autoSpeed === s }" @click="setSpeed(s)">{{ s }}s</button>
        </div>
        <button class="rc-play-btn" :class="{ playing: isAutoPlay }" @click="toggleAuto">
          <span v-if="isAutoPlay">⏸ إيقاف</span>
          <span v-else>▶ تشغيل تلقائي</span>
        </button>
      </div>
    </div>

    <!-- ── Mobile Bottom Bar ── -->
    <div class="rc-mobile-bar">
      <span class="rc-mob-counter">{{ activeIndex + 1 }} / {{ concepts.length }}</span>
      <div class="rc-mob-wire">
        <div class="rc-mob-wire-fill" :style="{ width: scrollProgress + '%', background: activeConcept.color }"></div>
      </div>
      <button class="rc-mob-close" @click="$emit('close')">✕</button>
    </div>

    <!-- ── Main Scroll ── -->
    <div class="rc-root" ref="rootEl">

      <!-- Dynamic color background -->
      <div class="rc-bg-container">
        <transition name="fade-bg">
          <div
            :key="activeConcept.id"
            class="rc-bg-gradient"
            :style="{ background: `radial-gradient(ellipse at 40% 40%, ${activeConcept.color}30 0%, #000 70%)` }"
          ></div>
        </transition>
        <div class="rc-grid-overlay"></div>
      </div>

      <!-- Wire (right side, vertical) -->
      <div class="rc-wire-container" :style="{ '--progress': scrollProgress + '%', '--color': activeConcept.color }">
        <div class="rc-wire-bg"></div>
        <div class="rc-wire-fill"></div>
        <div class="rc-packet"><div class="rc-packet-inner"></div></div>
      </div>

      <!-- Content -->
      <main class="rc-scroll-content">

        <!-- Hero -->
        <section class="rc-section rc-hero">
          <div class="hero-badge" style="border-color: rgba(255,255,255,0.25); background: rgba(255,255,255,0.06); color: #fff;">
            <span class="hero-badge-dot" style="background: #fff; box-shadow: 0 0 6px #fff;"></span>
            RVLB · GITHUB
          </div>
          <h1 class="hero-title" style="display: flex; justify-content: center; align-items: center; gap: 1rem;">
             GitHub <svg height="64" width="64" aria-hidden="true" viewBox="0 0 16 16" version="1.1" fill="currentColor"><path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path></svg>
          </h1>
          <p class="hero-subtitle">{{ concepts.length }} مفهوم · مرر لأسفل للبدء</p>
          <div class="scroll-indicator"><div class="mouse"></div></div>
        </section>

        <!-- Concept cards -->
        <section
          v-for="(c, i) in concepts"
          :key="c.id"
          :ref="el => setRef(el, i)"
          :data-index="i"
          class="rc-section"
        >
          <div class="glass-card" :class="{ 'is-active': activeIndex === i }" :style="{ '--card-color': c.color }">
            <div class="card-glow" :style="{ background: `radial-gradient(ellipse at 30% 20%, ${c.color}22 0%, transparent 70%)` }"></div>

            <div class="card-header">
              <span class="card-icon">{{ c.icon }}</span>
              <div class="card-titles">
                <span class="card-sub" :style="{ color: c.color }">{{ c.subtitle }}</span>
                <h2 class="card-title">{{ c.title }}</h2>
                <code class="card-code">{{ c.shortTitle }}</code>
              </div>
            </div>

            <div class="card-sep" :style="{ background: c.color + '44' }"></div>

            <p class="card-desc">{{ c.description }}</p>

            <div v-if="c.analogy" class="analogy-box" :style="{ borderColor: c.color + '44', background: c.color + '0d' }">
              <span class="analogy-icon">{{ c.analogy.icon }}</span>
              <p class="analogy-text">{{ c.analogy.text }}</p>
            </div>
          </div>
        </section>

        <!-- Footer -->
        <section class="rc-section rc-footer">
          <h2 class="hero-title" style="display: flex; justify-content: center; align-items: center; gap: 1rem;">
             تمت المهمة بنجاح <svg height="64" width="64" aria-hidden="true" viewBox="0 0 16 16" version="1.1" fill="currentColor"><path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path></svg>
          </h2>
          <p class="hero-subtitle">{{ concepts.length }} مفهوم — للتعاون وبناء البرمجيات باحترافية</p>
        </section>

      </main>
    </div>
  </div>
</template>

<style scoped>
.rc-overlay {
  position: fixed; inset: 0; z-index: 9999;
  background: #000;
  font-family: 'Cairo', 'Inter', sans-serif;
  direction: rtl;
}

/* Side buttons (desktop) */
.rc-side-btn {
  position: fixed; top: 50%; z-index: 10001;
  transform: translateY(-50%);
  width: 50px; height: 50px;
  background: rgba(0,0,0,0.6); backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.15); border-radius: 50%;
  color: white; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.25s;
}
.rc-side-btn:hover:not(:disabled) { background: rgba(255,255,255,0.15); transform: translateY(-50%) scale(1.1); }
.rc-side-btn:disabled { opacity: 0.2; cursor: not-allowed; }
.rc-side-prev { left: 20px; }
.rc-side-next { right: 20px; }

/* Top bar (desktop) */
.rc-top-bar {
  position: fixed; top: 0; left: 0; right: 0; z-index: 10001;
  display: flex; align-items: center; gap: 1rem;
  padding: 0.75rem 1.5rem; height: 58px;
  background: rgba(0,0,0,0.7); backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(255,255,255,0.07);
}
.rc-close-btn {
  background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.15);
  color: white; padding: 0.35rem 0.9rem; border-radius: 99px;
  cursor: pointer; font-family: inherit; font-weight: 600; font-size: 0.82rem;
  transition: all 0.2s;
}
.rc-close-btn:hover { background: rgba(255,255,255,0.2); }
.rc-progress-label { color: rgba(255,255,255,0.4); font-size: 0.82rem; font-weight: 700; white-space: nowrap; }
.rc-auto-controls { display: flex; align-items: center; gap: 0.75rem; }
.rc-speed-group {
  display: flex; align-items: center; gap: 0.3rem;
  background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
  border-radius: 99px; padding: 0.2rem 0.7rem;
}
.rc-speed-label { font-size: 0.72rem; color: rgba(255,255,255,0.35); white-space: nowrap; }
.rc-speed-btn {
  background: transparent; border: 1px solid transparent; color: rgba(255,255,255,0.4);
  padding: 0.15rem 0.45rem; border-radius: 99px; cursor: pointer; font-size: 0.72rem; font-weight: 700;
  transition: all 0.2s;
}
.rc-speed-btn.active { border-color: rgba(255,255,255,0.3); color: #fff; background: rgba(255,255,255,0.1); }
.rc-play-btn {
  background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.25); color: #fff;
  padding: 0.35rem 0.9rem; border-radius: 99px; cursor: pointer;
  font-family: inherit; font-weight: 700; font-size: 0.78rem; white-space: nowrap; transition: all 0.25s;
}
.rc-play-btn:hover { background: rgba(255,255,255,0.2); }
.rc-play-btn.playing { background: rgba(239,68,68,0.15); border-color: rgba(239,68,68,0.35); color: #ef4444; }

/* Mobile bottom bar (hidden on desktop) */
.rc-mobile-bar { display: none; }

/* Main scroll */
.rc-root {
  position: absolute; inset: 0;
  padding-top: 58px;
  color: #fff;
  overflow-y: scroll;
  overflow-x: hidden;
  scroll-snap-type: y mandatory;
  scroll-snap-stop: always;
  box-sizing: border-box;
}

/* Background */
.rc-bg-container { position: fixed; inset: 0; z-index: 1; pointer-events: none; }
.rc-bg-gradient { position: absolute; inset: 0; transition: opacity 0.6s ease; }
.rc-grid-overlay {
  position: absolute; inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
  background-size: 50px 50px;
}
.fade-bg-enter-active, .fade-bg-leave-active { transition: opacity 0.8s ease; position: absolute; inset: 0; }
.fade-bg-enter-from, .fade-bg-leave-to { opacity: 0; }

/* Wire */
.rc-wire-container {
  position: fixed; z-index: 20; pointer-events: none;
  top: 58px; bottom: 0; right: 10px; width: 3px;
}
.rc-wire-bg { position: absolute; inset: 0; background: rgba(255,255,255,0.07); border-radius: 2px; }
.rc-wire-fill {
  position: absolute; top: 0; left: 0; right: 0; border-radius: 2px;
  background: var(--color); height: var(--progress);
  transition: background 0.5s ease;
}
.rc-packet {
  position: absolute; z-index: 21;
  right: 50%; top: var(--progress);
  transform: translateY(-50%) translateX(50%);
  width: 16px; height: 16px;
  background: #000; border: 2.5px solid var(--color);
  box-shadow: 0 0 12px var(--color); border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  transition: border-color 0.5s, box-shadow 0.5s;
}
.rc-packet-inner {
  width: 5px; height: 5px; border-radius: 50%;
  background: var(--color); transition: background 0.5s;
  animation: pulse 1.5s infinite;
}
@keyframes pulse { 0%,100% { transform: scale(1); opacity:1; } 50% { transform: scale(0.4); opacity:0.4; } }

/* Content */
.rc-scroll-content {
  position: relative; z-index: 10;
  display: flex; flex-direction: column;
  padding-right: 26px; padding-left: 10px;
}
.rc-section {
  min-height: 100vh;
  display: flex; flex-direction: column; justify-content: center;
  scroll-snap-align: start;
  padding: 1.5rem 0;
}

/* Hero */
.rc-hero { text-align: center; align-items: center; }
.hero-badge {
  display: inline-flex; align-items: center; gap: 0.5rem;
  font-size: 0.65rem; font-weight: 800; letter-spacing: 0.15em;
  color: rgba(255,255,255,0.35);
  border: 1px solid rgba(255,255,255,0.25); border-radius: 99px;
  padding: 0.25rem 0.8rem; background: rgba(255,255,255,0.06);
  margin-bottom: 1.5rem;
}
.hero-badge-dot { width: 5px; height: 5px; border-radius: 50%; background: #fff; box-shadow: 0 0 6px #fff; }
.hero-title { font-size: 3.5rem; font-weight: 900; margin: 0 0 1rem; text-shadow: 0 0 30px rgba(255,255,255,0.15); }
.hero-subtitle { font-size: 1.15rem; color: rgba(255,255,255,0.55); margin: 0; }
.rc-footer { text-align: center; align-items: center; }

/* Scroll indicator */
.scroll-indicator { margin-top: 2.5rem; }
.mouse {
  width: 28px; height: 46px; border: 2px solid rgba(255,255,255,0.4); border-radius: 14px; position: relative;
}
.mouse::before {
  content: ''; position: absolute; top: 8px; left: 50%;
  transform: translateX(-50%); width: 5px; height: 5px;
  background: rgba(255,255,255,0.5); border-radius: 50%;
  animation: scrollAnim 1.5s infinite;
}
@keyframes scrollAnim { 0% { transform:translate(-50%,0); opacity:1; } 100% { transform:translate(-50%,18px); opacity:0; } }

/* Glass card */
.glass-card {
  position: relative;
  background: rgba(10,12,20,0.5);
  backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 22px; padding: 2.5rem;
  max-width: 680px; width: calc(100% - 1rem);
  margin: 0 auto;
  box-shadow: 0 20px 50px rgba(0,0,0,0.6);
  opacity: 0.1; transform: translateY(50px) scale(0.93);
  transition: all 0.9s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.glass-card.is-active { opacity: 1; transform: translateY(0) scale(1); }
.card-glow { position: absolute; inset: 0; pointer-events: none; border-radius: 22px; }
.card-header { display: flex; align-items: flex-start; gap: 1.2rem; margin-bottom: 1.2rem; position: relative; z-index: 1; }
.card-icon { font-size: 2.8rem; flex-shrink: 0; filter: drop-shadow(0 0 12px currentColor); }
.card-titles { display: flex; flex-direction: column; gap: 0.15rem; }
.card-sub { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; }
.card-title { font-size: 1.9rem; font-weight: 900; margin: 0; color: #fff; line-height: 1.15; }
.card-code {
  display: inline-block; font-family: 'Fira Code', monospace;
  font-size: 0.8rem; background: rgba(255,255,255,0.08);
  padding: 0.15em 0.55em; border-radius: 6px; color: var(--card-color);
  margin-top: 0.2rem;
}
.card-sep { height: 1px; margin-bottom: 1.2rem; opacity: 0.5; }
.card-desc { font-size: 1.05rem; line-height: 1.8; color: rgba(255,255,255,0.82); margin-bottom: 1.5rem; position: relative; z-index: 1; }
.analogy-box {
  display: flex; align-items: flex-start; gap: 0.8rem;
  border: 1px solid; border-radius: 14px; padding: 1rem 1.2rem;
  background: rgba(255,255,255,0.03); position: relative; z-index: 1;
}
.analogy-icon { font-size: 1.6rem; flex-shrink: 0; margin-top: 0.1rem; }
.analogy-text { font-size: 0.92rem; line-height: 1.7; color: rgba(255,255,255,0.72); margin: 0; }

/* Mobile */
@media (max-width: 768px) {
  .rc-top-bar { display: none; }
  .rc-side-btn { display: none; }
  .rc-root { padding-top: 0; padding-bottom: 50px; }

  .rc-mobile-bar {
    display: flex; position: fixed;
    bottom: 0; left: 0; right: 0; z-index: 10002;
    align-items: center; gap: 0.75rem;
    padding: 0 1rem; height: 50px;
    background: rgba(0,0,0,0.88); backdrop-filter: blur(16px);
    border-top: 1px solid rgba(255,255,255,0.07);
  }
  .rc-mob-counter { font-size: 0.75rem; font-weight: 700; color: rgba(255,255,255,0.4); white-space: nowrap; flex-shrink: 0; }
  .rc-mob-wire { flex: 1; height: 3px; background: rgba(255,255,255,0.08); border-radius: 2px; overflow: hidden; }
  .rc-mob-wire-fill { height: 100%; border-radius: 2px; transition: width 0.3s ease, background 0.5s ease; }
  .rc-mob-close {
    background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15);
    color: rgba(255,255,255,0.55); width: 32px; height: 32px;
    border-radius: 50%; display: flex; align-items: center; justify-content: center;
    cursor: pointer; font-size: 0.85rem; transition: all 0.2s; flex-shrink: 0;
  }

  .glass-card { padding: 1.4rem; border-radius: 16px; }
  .hero-title { font-size: 2.4rem; }
  .card-title { font-size: 1.5rem; }
  .card-icon { font-size: 2.2rem; }
  .card-desc { font-size: 0.93rem; }
  .rc-wire-container { top: 0; right: 8px; }
}
</style>
