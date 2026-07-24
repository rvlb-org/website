<script setup>
import { ref } from 'vue'

// Load all index.json files
const modules = import.meta.glob('/hisn/libs/*/index.json', { eager: true })

const libs = ref([])

for (const path in modules) {
  const data = modules[path].default || modules[path]
  const folderName = path.replace('/hisn/libs/', '').replace('/index.json', '')
  libs.value.push({
    ...data,
    slug: folderName,
    href: `/hisn/libs/${folderName}/`
  })
}

// Sort chronologically
libs.value.sort((a, b) => a.timestamp - b.timestamp)
</script>

<template>
  <div class="pr-grid">
    <a
      v-for="lib in libs"
      :key="lib.id"
      :href="lib.href"
      class="pr-card"
    >
      <div class="pr-card-header">
        <div class="pr-card-icon">{{ lib.icon }}</div>
        <div class="pr-card-title-group">
          <h3 class="pr-card-name">
            <span class="pr-lib-number">#{{ lib.number }}</span>
            {{ lib.name }}
          </h3>
          <span class="pr-card-type">{{ lib.type }} · {{ lib.files.length }} files</span>
        </div>
      </div>
      <div class="pr-card-footer">
        <div class="pr-card-date">🕒 {{ lib.created_at }}</div>
        <div class="pr-card-tags">
          <span v-for="tag in lib.tags" :key="tag" class="pr-tag">{{ tag }}</span>
        </div>
      </div>
      <div class="pr-card-arrow">اقرأ التوثيق ←</div>
    </a>
  </div>
</template>

<style scoped>
/* ── Grid Cards ── */
.pr-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
  margin-top: 10px;
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
  text-decoration: none !important;
  color: inherit;
}
.pr-card:hover {
  transform: translateY(-4px);
  border-color: color-mix(in srgb, #0ea5e9 40%, transparent);
  box-shadow: 0 8px 30px color-mix(in srgb, #0ea5e9 8%, transparent);
}

.pr-card-header {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 16px;
}
.pr-card-icon {
  font-size: 1.8rem;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  flex-shrink: 0;
  background: color-mix(in srgb, #0ea5e9 12%, transparent);
  border: 1px solid color-mix(in srgb, #0ea5e9 25%, transparent);
}

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
.pr-lib-number {
  background: color-mix(in srgb, #0ea5e9 15%, transparent);
  color: #0ea5e9;
  padding: 2px 8px;
  border-radius: 6px;
  font-size: 0.85rem;
  font-family: 'Space Mono', monospace;
}
.pr-card-type {
  font-family: 'Space Mono', monospace;
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--vp-c-text-3);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.pr-card-footer {
  margin-top: auto;
  padding-top: 16px;
  border-top: 1px solid var(--vp-c-divider);
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 16px;
}
.pr-card-date {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-text-3);
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
  background: color-mix(in srgb, #0ea5e9 8%, transparent);
  color: #38bdf8;
  border-color: color-mix(in srgb, #0ea5e9 25%, transparent);
}
.pr-card-arrow {
  margin-top: 12px;
  font-size: 0.8rem;
  font-weight: 700;
  color: #0ea5e9;
  opacity: 0;
  transition: opacity 0.2s, transform 0.2s;
  transform: translateX(4px);
}
.pr-card:hover .pr-card-arrow {
  opacity: 1;
  transform: translateX(0);
}
</style>
