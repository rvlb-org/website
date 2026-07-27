<script setup>
// Networking Concept Page
</script>

<template>
  <div class="nc-root">
    <!-- Ambient BG -->
    <div class="nc-bg">
      <div class="nc-orb orb-1"></div>
      <div class="nc-orb orb-2"></div>
      <div class="nc-grid"></div>
    </div>

    <!-- Main Content -->
    <div class="nc-content">
      <h1 class="welcome-text">مرحباً</h1>
    </div>
  </div>
</template>

<style scoped>
/* ── Root ── */
.nc-root {
  min-height: calc(100vh - var(--vp-nav-height));
  background: #020206;
  color: #e2e8f0;
  font-family: 'Cairo', 'Inter', sans-serif;
  direction: rtl;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ── Background ── */
.nc-bg { position: absolute; inset: 0; pointer-events: none; z-index: 0; }
.nc-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.15;
  animation: drift 20s ease-in-out infinite alternate;
}
.orb-1 { width: 500px; height: 500px; top: -100px; right: -50px; background: #3b82f6; }
.orb-2 { width: 400px; height: 400px; bottom: -50px; left: -100px; background: #06b6d4; animation-delay: -10s; }
.nc-grid {
  position: absolute; inset: 0;
  background-image: linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
  background-size: 60px 60px;
}
@keyframes drift { from { transform: translate(0,0) scale(1); } to { transform: translate(30px,20px) scale(1.05); } }

/* ── Content ── */
.nc-content {
  position: relative;
  z-index: 1;
  text-align: center;
}

.welcome-text {
  font-size: clamp(3rem, 10vw, 6rem);
  font-weight: 900;
  background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 40px rgba(96, 165, 250, 0.3);
  margin: 0;
}
</style>
