<script setup>
import { ref, computed, onMounted } from 'vue'
import { concepts, groups as groupsObj } from './NetworkData.js'
import NetworkCinematic from './NetworkCinematic.vue'

// Convert groups object to array for iteration
const groups = Object.values(groupsObj).map(g => ({
  ...g,
  concepts: concepts.filter(c => c.group === g.id)
}))

const selectedId = ref(concepts[0].id)
const active = computed(() => concepts.find(c => c.id === selectedId.value))
const activeIdx = computed(() => concepts.findIndex(c => c.id === selectedId.value))
const activeGroupObj = computed(() => groupsObj[active.value?.group])

// Which group contains the initially selected concept
const initialGroup = groups.find(g => g.concepts.some(c => c.id === selectedId.value))?.id
const expandedGroups = ref(new Set([initialGroup]))

const showCinematic = ref(false)

// On mobile: open cinematic immediately
onMounted(() => {
  if (window.innerWidth <= 768) {
    showCinematic.value = true
  }
})

function toggleGroup(groupId) {
  const s = new Set(expandedGroups.value)
  s.has(groupId) ? s.delete(groupId) : s.add(groupId)
  expandedGroups.value = s
}

function selectConcept(conceptId, groupId) {
  selectedId.value = conceptId
  const s = new Set(expandedGroups.value)
  s.add(groupId)
  expandedGroups.value = s
}

// Mobile arrow navigation
function goNext() {
  const i = activeIdx.value
  if (i < concepts.length - 1) selectedId.value = concepts[i + 1].id
}
function goPrev() {
  const i = activeIdx.value
  if (i > 0) selectedId.value = concepts[i - 1].id
}
</script>

<template>
  <div class="rc-root">

    <!-- Ambient BG -->
    <div class="rc-bg">
      <div class="rc-orb orb-1"></div>
      <div class="rc-orb orb-2"></div>
      <div class="rc-grid"></div>
    </div>

    <!-- ── Hero / Top Bar ── -->
    <header class="rc-hero">
      <div class="rc-badge">
        <span class="badge-dot"></span>
        <span>RVLB · NETWORK CONCEPTS</span>
      </div>
      <div class="rc-title">
        <span class="title-en">Network</span>
        <span class="title-ar">— طبقة الشبكات</span>
      </div>
      <button class="cinematic-hero-btn" @click="showCinematic = true">
        <span>🎬</span>
        <span class="btn-text">العرض التقديمي</span>
      </button>
    </header>

    <!-- ── Main Layout (Desktop: sidebar + card) ── -->
    <div class="rc-layout">

      <!-- Sidebar (Desktop only) -->
      <aside class="rc-sidebar">
        <div v-for="group in groups" :key="group.id" class="rc-nav-group">
          <button class="rc-nav-group-btn" @click="toggleGroup(group.id)">
            <span class="gl-dot" :style="`background: ${group.color}`"></span>
            <span class="gl-label">{{ group.name }}</span>
            <span class="gl-chevron" :class="{ open: expandedGroups.has(group.id) }">›</span>
          </button>
          <transition name="accordion">
            <div v-if="expandedGroups.has(group.id)" class="rc-nav-items">
              <button
                v-for="c in group.concepts"
                :key="c.id"
                class="rc-nav-item"
                :class="{ active: selectedId === c.id }"
                :style="selectedId === c.id ? `--accent: ${c.color}` : ''"
                @click="selectConcept(c.id, group.id)"
              >
                <span class="nav-icon">{{ c.icon }}</span>
                <span class="nav-label">{{ c.shortTitle }}</span>
              </button>
            </div>
          </transition>
        </div>
      </aside>

      <!-- Content Area -->
      <main class="rc-main">
        <transition name="slide-fade" mode="out-in">
          <div class="rc-card" :key="active.id">
            <div class="card-glow" :style="`background: radial-gradient(ellipse at 30% 20%, ${active.color}28 0%, transparent 65%)`"></div>

            <div class="card-header">
              <span class="card-icon">{{ active.icon }}</span>
              <div class="card-title-group">
                <h2 class="card-title" :style="`color: ${active.color}`">
                  {{ active.title }} <code>{{ active.shortTitle }}</code>
                </h2>
                <span class="card-subtitle">{{ active.subtitle }}</span>
              </div>
            </div>

            <div class="card-sep" :style="`background: ${active.color}44`"></div>

            <div class="card-body">
              <div class="card-desc">
                <p>{{ active.description }}</p>
              </div>
              <div v-if="active.analogy" class="analogy-box" :style="`border-color: ${active.color}44; background: ${active.color}0d`">
                <div class="analogy-top">
                  <span class="analogy-emoji">{{ active.analogy.icon }}</span>
                  <h4 class="analogy-title" :style="`color: ${active.color}`">مثال من الحياة الواقعية:</h4>
                </div>
                <div class="analogy-parts">
                  <p>{{ active.analogy.text }}</p>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </main>
    </div>

    <!-- ── Mobile Bottom Nav Bar ── -->
    <nav class="rc-mobile-nav">
      <button class="mob-nav-btn" :disabled="activeIdx === 0" @click="goPrev">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
      </button>

      <div class="mob-nav-info">
        <span class="mob-group-dot" :style="`background: ${activeGroupObj?.color}`"></span>
        <div class="mob-nav-text">
          <span class="mob-group-name">{{ activeGroupObj?.name }}</span>
          <span class="mob-concept-name">{{ active.icon }} {{ active.shortTitle }}</span>
        </div>
        <span class="mob-counter">{{ activeIdx + 1 }}/{{ concepts.length }}</span>
      </div>

      <button class="mob-nav-btn" :disabled="activeIdx === concepts.length - 1" @click="goNext">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
    </nav>

    <!-- Overlay: Cinematic Journey -->
    <transition name="fade-overlay">
      <NetworkCinematic v-if="showCinematic" @close="showCinematic = false" class="cinematic-overlay" />
    </transition>
  </div>
</template>

<style scoped>
/* ── Root ── */
.rc-root {
  min-height: 100vh;
  background: #020206;
  color: #e2e8f0;
  font-family: 'Cairo', 'Inter', sans-serif;
  direction: rtl;
  position: relative;
  overflow-x: hidden;
}

/* ── Background ── */
.rc-bg { position: fixed; inset: 0; pointer-events: none; z-index: 0; }
.rc-orb {
  position: absolute; border-radius: 50%;
  filter: blur(80px); opacity: 0.18;
  animation: drift 18s ease-in-out infinite alternate;
}
.orb-1 { width: 600px; height: 600px; top: -120px; right: -120px; background: #3b82f6; }
.orb-2 { width: 500px; height: 500px; bottom: -80px; left: -100px; background: #10b981; animation-delay: -9s; }
.rc-grid {
  position: absolute; inset: 0;
  background-image: linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
  background-size: 60px 60px;
}
@keyframes drift { from { transform: translate(0,0) scale(1); } to { transform: translate(40px,30px) scale(1.08); } }

/* ── Hero ── */
.rc-hero {
  position: relative; z-index: 1;
  display: flex; align-items: center; gap: 1.5rem;
  padding: 0.85rem 2rem;
  border-bottom: 1px solid rgba(255,255,255,0.06);
  background: rgba(0,0,0,0.15);
  flex-wrap: wrap;
}
.rc-badge {
  display: inline-flex; align-items: center; gap: 0.45rem;
  font-size: 0.62rem; font-weight: 800; letter-spacing: 0.16em;
  color: rgba(255,255,255,0.4);
  border: 1px solid rgba(59,130,246,0.2); border-radius: 100px;
  padding: 0.25rem 0.75rem; background: rgba(59,130,246,0.05); flex-shrink: 0;
}
.badge-dot { width: 5px; height: 5px; border-radius: 50%; background: #3b82f6; box-shadow: 0 0 6px #3b82f6; }
.rc-title { display: flex; align-items: center; gap: 0.6rem; flex: 1; }
.title-en {
  font-family: 'Inter', sans-serif; font-size: 1.5rem; font-weight: 900; line-height: 1;
  background: linear-gradient(135deg, #3b82f6 0%, #60a5fa 60%, #3b82f6 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}
.title-ar { font-size: 0.85rem; font-weight: 600; color: rgba(255,255,255,0.3); }

.cinematic-hero-btn {
  display: flex; align-items: center; gap: 0.6rem;
  background: rgba(16,185,129,0.15); border: 1px solid rgba(16,185,129,0.4);
  color: #10b981; padding: 0.4rem 1.2rem; border-radius: 100px;
  font-family: inherit; font-weight: 700; font-size: 0.85rem;
  cursor: pointer; transition: all 0.25s ease;
}
.cinematic-hero-btn:hover {
  background: rgba(16,185,129,0.3);
  box-shadow: 0 0 15px rgba(16,185,129,0.4);
  transform: translateY(-2px);
}

/* ── Layout ── */
.rc-layout {
  position: relative; z-index: 1;
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 0;
  height: calc(100vh - 112px);
}

/* ── Sidebar ── */
.rc-sidebar {
  border-left: 1px solid rgba(255,255,255,0.05);
  padding: 1.5rem 1rem 1.5rem 0;
  overflow-y: auto; overflow-x: hidden;
  height: 100%; background: rgba(255,255,255,0.01);
  box-sizing: border-box;
}
.rc-nav-group { margin-bottom: 0.3rem; }
.rc-nav-group-btn {
  display: flex; align-items: center; gap: 0.5rem;
  width: 100%; padding: 0.6rem 0.7rem;
  background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07);
  border-radius: 10px; cursor: pointer; font-family: inherit; transition: all 0.2s ease;
}
.rc-nav-group-btn:hover { background: rgba(255,255,255,0.07); border-color: rgba(255,255,255,0.12); }
.gl-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
.gl-label {
  flex: 1; font-size: 0.72rem; font-weight: 800; letter-spacing: 0.08em;
  color: rgba(255,255,255,0.55); text-transform: uppercase; text-align: right;
}
.gl-chevron {
  font-size: 1.1rem; color: rgba(255,255,255,0.3);
  transition: transform 0.25s ease; display: inline-block; transform: rotate(90deg);
}
.gl-chevron.open { transform: rotate(-90deg); }
.rc-nav-items { padding: 0.3rem 0 0.3rem 0.5rem; }
.rc-nav-item {
  display: flex; align-items: center; gap: 0.6rem;
  width: 100%; padding: 0.5rem 0.8rem;
  background: transparent; border: 1px solid transparent; border-radius: 9px;
  color: rgba(255,255,255,0.45); font-family: inherit; font-size: 0.82rem; font-weight: 600;
  cursor: pointer; transition: all 0.2s ease; text-align: right; direction: rtl; margin-bottom: 0.1rem;
}
.rc-nav-item:hover { color: rgba(255,255,255,0.8); background: rgba(255,255,255,0.05); }
.rc-nav-item.active {
  color: var(--accent); border-color: var(--accent);
  background: color-mix(in srgb, var(--accent) 10%, transparent);
}
.nav-icon { font-size: 1rem; flex-shrink: 0; }
.nav-label { flex: 1; }

/* ── Main ── */
.rc-main { padding: 2rem; overflow-y: auto; overflow-x: hidden; height: 100%; box-sizing: border-box; }

/* Scrollbar */
.rc-main::-webkit-scrollbar, .rc-sidebar::-webkit-scrollbar { width: 6px; }
.rc-main::-webkit-scrollbar-track, .rc-sidebar::-webkit-scrollbar-track { background: transparent; }
.rc-main::-webkit-scrollbar-thumb, .rc-sidebar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.12); border-radius: 10px; }

/* ── Card ── */
.rc-card {
  position: relative; background: rgba(255,255,255,0.028);
  border: 1px solid rgba(255,255,255,0.08); border-radius: 20px; overflow: hidden; min-height: 400px;
}
.card-glow { position: absolute; inset: 0; pointer-events: none; border-radius: 20px; }
.card-header { position: relative; z-index: 1; display: flex; align-items: center; gap: 1.2rem; padding: 1.8rem 2rem 1.4rem; }
.card-icon { font-size: 2.5rem; flex-shrink: 0; filter: drop-shadow(0 0 12px currentColor); }
.card-title-group { flex: 1; }
.card-title { font-size: clamp(1.2rem, 3vw, 1.7rem); font-weight: 900; margin: 0 0 0.3rem; display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; }
.card-title code { font-size: 0.8em; background: rgba(255,255,255,0.08); padding: 0.15em 0.5em; border-radius: 6px; font-family: 'Fira Code', monospace; color: inherit; }
.card-subtitle { font-size: 0.85rem; color: rgba(255,255,255,0.4); font-weight: 500; }
.card-sep { height: 1px; margin: 0 2rem; opacity: 0.6; }
.card-body { position: relative; z-index: 1; padding: 1.5rem 2rem 2rem; }
.card-desc p { color: rgba(255,255,255,0.7); line-height: 1.8; margin-bottom: 0.8rem; font-size: 1.05rem; }

/* ── Analogy ── */
.analogy-box { margin-top: 1.5rem; border: 1px solid; border-radius: 14px; padding: 1.3rem 1.5rem; }
.analogy-top { display: flex; align-items: center; gap: 0.8rem; margin-bottom: 0.8rem; }
.analogy-emoji { font-size: 1.8rem; }
.analogy-title { font-size: 1rem; font-weight: 800; margin: 0; }
.analogy-parts p { color: rgba(255,255,255,0.8); line-height: 1.75; font-size: 0.95rem; margin: 0; }

/* ── Transitions ── */
.accordion-enter-active, .accordion-leave-active { transition: all 0.25s ease-in-out; overflow: hidden; }
.accordion-enter-from, .accordion-leave-to { opacity: 0; max-height: 0; }
.accordion-enter-to, .accordion-leave-from { opacity: 1; max-height: 600px; }
.slide-fade-enter-active { transition: all 0.25s ease; }
.slide-fade-leave-active { transition: all 0.18s ease; }
.slide-fade-enter-from { opacity: 0; transform: translateY(12px); }
.slide-fade-leave-to { opacity: 0; transform: translateY(-8px); }

/* ── Cinematic overlay ── */
.cinematic-overlay { position: fixed; inset: 0; z-index: 9999; width: 100vw; height: 100vh; }
.fade-overlay-enter-active, .fade-overlay-leave-active { transition: opacity 0.5s ease; }
.fade-overlay-enter-from, .fade-overlay-leave-to { opacity: 0; }

/* ── Mobile Bottom Nav (hidden on desktop) ── */
.rc-mobile-nav { display: none; }

/* ── Responsive ── */
@media (max-width: 768px) {
  /* Hide sidebar entirely on mobile */
  .rc-sidebar { display: none; }

  /* Hide the whole layout immediately — cinematic opens via onMounted */
  /* This prevents the flash of desktop UI before JS sets showCinematic=true */
  .rc-layout { visibility: hidden; }

  /* Full-width content, leave room for bottom nav */
  .rc-layout {
    grid-template-columns: 1fr;
    height: calc(100vh - 56px - 64px);
  }

  .rc-main {
    padding: 1rem;
    height: 100%;
  }

  /* Card adjustments */
  .card-header { padding: 1.2rem 1.2rem 0.8rem; gap: 0.9rem; }
  .card-icon { font-size: 2rem; }
  .card-title { font-size: 1.3rem; }
  .card-sep { margin: 0 1.2rem; }
  .card-body { padding: 1rem 1.2rem 1.5rem; }
  .card-desc p { font-size: 0.95rem; }
  .analogy-box { padding: 1rem 1.1rem; }
  .analogy-emoji { font-size: 1.4rem; }
  .analogy-title { font-size: 0.9rem; }
  .analogy-parts p { font-size: 0.88rem; }

  /* Hero bar compact */
  .rc-hero { padding: 0.7rem 1rem; gap: 0.75rem; }
  .rc-badge { display: none; }
  .title-en { font-size: 1.2rem; }
  .title-ar { display: none; }
  .cinematic-hero-btn { padding: 0.35rem 0.9rem; font-size: 0.8rem; }
  .btn-text { display: none; }

  /* Show mobile bottom nav */
  .rc-mobile-nav {
    display: flex;
    position: fixed;
    bottom: 0; left: 0; right: 0;
    z-index: 500;
    align-items: center;
    gap: 0.75rem;
    padding: 0.6rem 1rem;
    background: rgba(2, 2, 6, 0.92);
    backdrop-filter: blur(16px);
    border-top: 1px solid rgba(255,255,255,0.07);
    height: 64px;
    box-sizing: border-box;
  }

  .mob-nav-btn {
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.12);
    color: white;
    width: 40px; height: 40px;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; flex-shrink: 0;
    transition: all 0.2s ease;
  }
  .mob-nav-btn:hover:not(:disabled) { background: rgba(255,255,255,0.15); }
  .mob-nav-btn:disabled { opacity: 0.25; cursor: not-allowed; }

  .mob-nav-info {
    flex: 1; display: flex; align-items: center; gap: 0.6rem; min-width: 0;
  }

  .mob-group-dot {
    width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0;
    box-shadow: 0 0 6px currentColor;
  }

  .mob-nav-text {
    display: flex; flex-direction: column; min-width: 0; flex: 1;
  }

  .mob-group-name {
    font-size: 0.68rem; color: rgba(255,255,255,0.35); font-weight: 600;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }

  .mob-concept-name {
    font-size: 0.88rem; font-weight: 700; color: rgba(255,255,255,0.9);
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }

  .mob-counter {
    font-size: 0.75rem; color: rgba(255,255,255,0.3);
    font-weight: 700; flex-shrink: 0;
    font-family: 'Inter', monospace;
  }
}
</style>
