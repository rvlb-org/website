<script setup>
import { shallowRef } from 'vue'

const modules = import.meta.glob('../../watad/milestones/[0-9]*.md', { eager: true })

const milestones = Object.entries(modules)
  .sort(([a], [b]) => b.localeCompare(a)) // newest first
  .map(([path, mod]) => {
    const fileName = path.split('/').pop()
    const num = fileName.match(/^(\d+)/)?.[1] || ''
    return {
      path,
      num,
      component: mod.default,
      frontmatter: mod.__pageData?.frontmatter || {}
    }
  })
</script>

<template>
  <div class="wt-strip">
    <div class="wt-strip-head">
      <span class="wt-sep-line"></span>
      <span class="wt-sep-label">MILESTONES — سجل الإنجازات</span>
      <span class="wt-sep-line"></span>
    </div>

    <div class="wt-strip-list">
      <div class="strip-timeline-line"></div>
      <Milestone
        v-for="(item, index) in milestones"
        :key="index"
        :title="item.frontmatter.title || 'Untitled'"
        :date="item.frontmatter.date || ''"
        :icon="item.frontmatter.icon || '📌'"
        :cat="item.frontmatter.cat || ''"
        :num="item.num"
      >
        <component :is="item.component" />
      </Milestone>
    </div>
  </div>
</template>

<style scoped>
.wt-strip {
  width: 100%;
  max-width: 1000px;
  position: relative;
  z-index: 1;
  margin-top: 2rem;
  margin-bottom: 2rem;
}
.wt-strip-head {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  margin-bottom: 2.5rem;
}
.wt-sep-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(56,189,248,0.35), transparent);
}
.wt-sep-label {
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 0.2em;
  color: rgba(56,189,248,0.55);
  white-space: nowrap;
  border: 1px solid rgba(56,189,248,0.15);
  padding: 0.25rem 0.85rem;
  border-radius: 100px;
  background: rgba(56,189,248,0.04);
}

.wt-strip-list {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 20px;
  padding: 2rem;
}

.strip-timeline-line {
  position: absolute;
  right: 54px; /* Adjust based on Milestone icon position */
  top: 2rem; 
  bottom: 2rem;
  width: 1px;
  background: linear-gradient(
    180deg,
    transparent,
    color-mix(in srgb, #38bdf8 30%, transparent) 10%,
    color-mix(in srgb, #38bdf8 15%, transparent) 90%,
    transparent
  );
  pointer-events: none;
}

@media (max-width: 600px) {
  .strip-timeline-line { display: none; }
  .wt-strip-list { padding: 1.25rem; }
}
</style>
