<script setup>
defineProps({
  osName: String,
  osIcon: String,
  osCat: String
})
</script>

<template>
  <div class="cmp-detail-wrapper">
    <div class="cmp-layout">
      
      <!-- Competitor Side -->
      <div class="cmp-side comp-side">
        <div class="cmp-side-hdr">
          <span class="cmp-side-emoji">{{ osIcon }}</span>
          <div>
            <h3>{{ osName }}</h3>
            <span class="cmp-side-tag">{{ osCat }}</span>
          </div>
        </div>
        <div class="cmp-content comp-content">
          <slot name="competitor"></slot>
        </div>
      </div>

      <!-- VS Badge -->
      <div class="cmp-vs-col">
        <div class="cmp-vs-badge">VS</div>
      </div>

      <!-- Vault Side -->
      <div class="cmp-side vault-side">
        <div class="cmp-side-hdr">
          <span class="cmp-side-emoji">🏰</span>
          <div>
            <h3>Hisn-seL4</h3>
            <span class="cmp-side-tag vault-tag">مثبت رياضياً</span>
          </div>
        </div>
        <div class="cmp-content vault-content">
          <slot name="vault"></slot>
        </div>
      </div>
      
    </div>
  </div>
</template>

<style>
/* Unscoped so it can target markdown elements inside slots */
.cmp-detail-wrapper {
  margin-top: 0.5rem;
  font-family: 'Cairo', sans-serif;
}
.cmp-layout {
  display: flex;
  gap: 1.5rem;
  align-items: stretch;
  background: rgba(0,0,0,0.2);
  border-radius: 24px;
  padding: 1.5rem;
  border: 1px solid rgba(255,255,255,0.05);
}
@media (max-width: 768px) {
  .cmp-layout {
    flex-direction: column;
  }
}
.cmp-side {
  flex: 1;
  background: rgba(255,255,255,0.03);
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid rgba(255,255,255,0.04);
}
.cmp-side.vault-side {
  background: linear-gradient(180deg, rgba(34,197,94,0.05) 0%, rgba(34,197,94,0.01) 100%);
  border-color: rgba(34,197,94,0.2);
  box-shadow: inset 0 2px 20px rgba(34,197,94,0.05);
}
.cmp-side-hdr {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}
.cmp-side-emoji {
  font-size: 2.5rem;
  background: rgba(255,255,255,0.05);
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
}
.vault-side .cmp-side-emoji {
  background: rgba(34,197,94,0.15);
  border: 1px solid rgba(34,197,94,0.3);
}
.cmp-side-hdr h3 {
  margin: 0 0 0.3rem 0 !important;
  font-size: 1.4rem;
  font-weight: 900;
  border: none;
  padding: 0;
  line-height: 1.2;
}
.cmp-side-tag {
  font-size: 0.75rem;
  padding: 0.15rem 0.6rem;
  border-radius: 100px;
  background: rgba(255,255,255,0.1);
  color: rgba(255,255,255,0.7);
  font-weight: 600;
}
.vault-tag {
  background: rgba(34,197,94,0.2);
  color: #4ade80;
}

/* Style the markdown list inside the slots */
.cmp-content ul {
  list-style: none !important;
  padding: 0 !important;
  margin: 0 !important;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.cmp-content ul li {
  font-size: 0.95rem;
  line-height: 1.6;
  color: rgba(255,255,255,0.6);
  position: relative;
  padding-right: 1.5rem;
  margin: 0 !important;
}
.comp-content ul li::before {
  content: '✕';
  position: absolute;
  right: 0;
  top: 2px;
  color: #ef4444;
  font-weight: 900;
}
.vault-content ul li {
  color: rgba(255,255,255,0.85);
}
.vault-content ul li::before {
  content: '✓';
  position: absolute;
  right: 0;
  top: 2px;
  color: #22c55e;
  font-weight: 900;
}

.cmp-vs-col {
  display: flex;
  align-items: center;
  justify-content: center;
}
.cmp-vs-badge {
  background: linear-gradient(135deg, var(--vp-c-brand-1), var(--vp-c-brand-2));
  color: #fff;
  font-weight: 900;
  font-size: 1.2rem;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  box-shadow: 0 0 20px rgba(168,85,247,0.4);
}
</style>
