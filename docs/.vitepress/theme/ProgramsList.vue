<script setup>
import { ref, onMounted } from 'vue'

// Load all index.json files and .html files from programs subdirectories
const modules = import.meta.glob('/hisn/programs/*/index.json', { eager: true })
const htmlFiles = import.meta.glob('/hisn/programs/*/*.html', { query: '?raw', import: 'default', eager: true })

const programs = ref([])
const activeProgram = ref(null)
const isModalOpen = ref(false)

onMounted(() => {
  const loadedPrograms = []
  for (const path in modules) {
    const progData = modules[path].default || modules[path]
    const progId = progData.id
    
    // Inject HTML content into the data object
    const overviewPath = `/hisn/programs/${progId}/${progData.overview}`
    progData.overviewContent = htmlFiles[overviewPath] || ''

    if (progData.files) {
      progData.files.forEach(f => {
        const fPath = `/hisn/programs/${progId}/${f.content_file}`
        f.descContent = htmlFiles[fPath] || ''
      })
    }

    loadedPrograms.push(progData)
  }
  // Sort programs chronologically
  loadedPrograms.sort((a, b) => a.timestamp - b.timestamp)
  programs.value = loadedPrograms
})

const openModal = (prog) => {
  activeProgram.value = prog
  isModalOpen.value = true
  document.body.style.overflow = 'hidden' // prevent background scrolling
}

const closeModal = () => {
  isModalOpen.value = false
  setTimeout(() => {
    activeProgram.value = null
  }, 300)
  document.body.style.overflow = ''
}
</script>

<template>
  <div>
    <!-- The Grid of Cards -->
    <div class="pr-grid">
      <div 
        v-for="prog in programs" 
        :key="prog.id" 
        class="pr-card"
        @click="openModal(prog)"
      >
        <div class="pr-card-header">
          <div :class="['pr-card-icon', prog.iconClass]">{{ prog.icon }}</div>
          <div class="pr-card-title-group">
            <h3 class="pr-card-name">
              <span class="pr-prog-number">#{{ prog.number }}</span>
              {{ prog.name }}
            </h3>
            <span class="pr-card-type">{{ prog.type }}</span>
          </div>
        </div>
        <div class="pr-card-footer">
          <div class="pr-card-date">🕒 {{ prog.created_at }}</div>
          <div class="pr-card-tags">
            <span v-for="tag in prog.tags" :key="tag" class="pr-tag">{{ tag }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- The Modal -->
    <Teleport to="body">
      <Transition name="modal-fade">
        <div v-if="isModalOpen" class="pr-modal-backdrop" @click="closeModal">
          <div class="pr-modal" @click.stop>
            
            <button class="pr-modal-close" @click="closeModal">✕</button>

            <div v-if="activeProgram" class="pr-modal-content">
              <div class="pr-modal-header">
                <div :class="['pr-modal-icon', activeProgram.iconClass]">{{ activeProgram.icon }}</div>
                <div>
                  <h2 class="pr-modal-title">
                    <span class="pr-prog-number-modal">#{{ activeProgram.number }}</span>
                    {{ activeProgram.name }}
                  </h2>
                  <span class="pr-modal-subtitle">📂 مسار الجذر: <code>programs/{{ activeProgram.id }}/</code></span>
                </div>
              </div>

              <div class="pr-modal-body">
                <h3 class="pr-files-title">محتويات الملفات (Source Files)</h3>
                
                <div class="pr-files-list">
                  <div v-for="f in activeProgram.files" :key="f.name" class="pr-file-item">
                    <div class="pr-file-header">
                      <span class="pr-file-icon">📄</span>
                      <span class="pr-file-name">{{ f.name }}</span>
                    </div>
                    <div class="pr-file-path">{{ f.path }}</div>
                    <div class="pr-file-desc" v-html="f.descContent"></div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
/* ── Grid Cards (Same as before but inside component) ── */
.pr-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;
  margin-bottom: 48px;
}
.pr-card {
  display: flex;
  flex-direction: column;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  padding: 24px;
  transition: transform 0.25s, box-shadow 0.25s, border-color 0.25s;
  cursor: pointer;
}
.pr-card:hover {
  transform: translateY(-4px);
  border-color: color-mix(in srgb, #10b981 40%, transparent);
  box-shadow: 0 8px 30px color-mix(in srgb, #10b981 8%, transparent);
}

.pr-card-header {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 20px;
}
.pr-card-icon {
  font-size: 1.8rem;
  width: 54px;
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  flex-shrink: 0;
}
.pr-icon--files { background: color-mix(in srgb, #f59e0b 12%, transparent); border: 1px solid color-mix(in srgb, #f59e0b 25%, transparent); }
.pr-icon--calc { background: color-mix(in srgb, #3b82f6 12%, transparent); border: 1px solid color-mix(in srgb, #3b82f6 25%, transparent); }
.pr-icon--editor { background: color-mix(in srgb, #a855f7 12%, transparent); border: 1px solid color-mix(in srgb, #a855f7 25%, transparent); }
.pr-icon--viewer { background: color-mix(in srgb, #ec4899 12%, transparent); border: 1px solid color-mix(in srgb, #ec4899 25%, transparent); }

.pr-card-title-group { display: flex; flex-direction: column; gap: 4px; }
.pr-card-name {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--vp-c-text-1);
  display: flex;
  align-items: center;
  gap: 8px;
}
.pr-prog-number {
  background: color-mix(in srgb, #10b981 15%, transparent);
  color: #10b981;
  padding: 2px 8px;
  border-radius: 6px;
  font-size: 0.85rem;
  font-family: 'Space Mono', monospace;
}
.pr-prog-number-modal {
  background: color-mix(in srgb, #10b981 15%, transparent);
  color: #10b981;
  padding: 4px 10px;
  border-radius: 8px;
  font-size: 1.2rem;
  font-family: 'Space Mono', monospace;
  margin-left: 8px;
}
.pr-card-type {
  font-family: 'Space Mono', monospace;
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--vp-c-text-3);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.pr-card-body {
  flex: 1;
  font-size: 0.88rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}
.pr-card-body p { margin: 0 0 12px; }

.pr-list {
  padding-right: 18px;
  margin: 0;
  list-style: none;
}
.pr-list li { position: relative; margin-bottom: 8px; font-size: 0.84rem; }
.pr-list li::before {
  content: '✓';
  position: absolute;
  right: -18px;
  color: #10b981;
  font-weight: 800;
  font-size: 0.8rem;
}

.pr-card-footer {
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid var(--vp-c-divider);
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.pr-card-date {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-text-3);
  display: flex;
  align-items: center;
  gap: 6px;
}
.pr-card-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.pr-tag {
  background: color-mix(in srgb, var(--vp-c-bg-mute) 60%, transparent);
  color: var(--vp-c-text-3);
  border: 1px solid color-mix(in srgb, var(--vp-c-divider) 50%, transparent);
  padding: 3px 10px;
  border-radius: 6px;
  font-family: 'Space Mono', monospace;
  font-size: 0.7rem;
  font-weight: 700;
}
.pr-card:hover .pr-tag {
  background: color-mix(in srgb, #10b981 8%, transparent);
  color: #34d399;
  border-color: color-mix(in srgb, #10b981 25%, transparent);
}

/* ── Modal Styles ── */
.pr-modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  direction: rtl;
}

.pr-modal {
  background: var(--vp-c-bg);
  border: 1px solid color-mix(in srgb, #10b981 30%, transparent);
  box-shadow: 0 10px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05);
  border-radius: 16px;
  width: 100%;
  max-width: 650px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  transform: translateY(0);
}

.pr-modal-close {
  position: absolute;
  top: 16px;
  left: 16px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  z-index: 10;
}
.pr-modal-close:hover {
  background: color-mix(in srgb, #ef4444 15%, transparent);
  color: #ef4444;
  border-color: #ef4444;
  transform: rotate(90deg);
}

.pr-modal-header {
  padding: 28px 32px;
  border-bottom: 1px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  gap: 20px;
  background: linear-gradient(180deg, color-mix(in srgb, #10b981 5%, transparent), transparent);
}
.pr-modal-icon {
  font-size: 2.5rem;
  width: 72px;
  height: 72px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.pr-modal-title {
  margin: 0 0 6px;
  font-size: 1.6rem;
  font-weight: 800;
  color: var(--vp-c-text-1);
}
.pr-modal-subtitle {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}
.pr-modal-subtitle code {
  color: #34d399;
  background: color-mix(in srgb, #10b981 12%, transparent);
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Space Mono', monospace;
}

.pr-modal-body {
  padding: 28px 32px;
}
.pr-files-title {
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--vp-c-text-1);
  margin: 0 0 16px;
  border-bottom: 2px solid color-mix(in srgb, #10b981 20%, transparent);
  display: inline-block;
  padding-bottom: 6px;
}

.pr-files-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.pr-file-item {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 16px;
  transition: transform 0.2s, border-color 0.2s;
}
.pr-file-item:hover {
  transform: translateX(-4px);
  border-color: color-mix(in srgb, #10b981 30%, transparent);
}
.pr-file-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}
.pr-file-icon { font-size: 1.2rem; }
.pr-file-name {
  font-family: 'Space Mono', monospace;
  font-weight: 700;
  font-size: 0.95rem;
  color: var(--vp-c-text-1);
}
.pr-file-path {
  font-family: 'Space Mono', monospace;
  font-size: 0.72rem;
  color: var(--vp-c-text-3);
  margin-bottom: 8px;
  margin-right: 28px;
  direction: ltr;
  text-align: right;
}
.pr-file-desc {
  margin: 0;
  font-size: 0.88rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-right: 28px;
}

/* Modal Transitions */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
.modal-fade-enter-active .pr-modal {
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.modal-fade-enter-from .pr-modal {
  transform: translateY(30px) scale(0.95);
}
.modal-fade-leave-active .pr-modal {
  transition: transform 0.3s ease;
}
.modal-fade-leave-to .pr-modal {
  transform: translateY(-20px) scale(0.95);
}
</style>
