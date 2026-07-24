<script setup>
import { shallowRef } from 'vue'

const modules = import.meta.glob('../../hisn/milestones/[0-9]*.md', { eager: true })

const milestones = Object.entries(modules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, mod]) => {
    const fileName = path.split('/').pop() // "01_milestone.md"
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
  <div class="milestone-container">
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
</template>
