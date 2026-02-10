<template>
  <div class="fixed inset-0 -z-10 overflow-hidden">
    <!-- Base gradient -->
    <div class="absolute inset-0" style="background: var(--bg-body)" />

    <!-- Animated gradient orbs -->
    <div
      class="absolute top-0 left-1/4 w-[800px] h-[800px] rounded-full"
      style="
        background: radial-gradient(circle, rgba(14, 165, 233, 0.15) 0%, transparent 70%);
        filter: blur(60px);
        animation: orb-float-1 15s ease-in-out infinite;
      "
    />

    <div
      class="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full"
      style="
        background: radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%);
        filter: blur(60px);
        animation: orb-float-2 18s ease-in-out 2s infinite;
      "
    />

    <div
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
      style="
        background: radial-gradient(circle, rgba(6, 182, 212, 0.12) 0%, transparent 70%);
        filter: blur(80px);
        animation: orb-float-3 20s ease-in-out 4s infinite;
      "
    />

    <!-- Grid pattern -->
    <div class="absolute inset-0 opacity-[0.03] bg-grid-pattern" />

    <!-- Subtle noise texture overlay -->
    <div
      class="absolute inset-0 opacity-[0.02]"
      style="
        background-image: url('data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E');
      "
    />
  </div>
</template>

<style scoped>
.bg-grid-pattern {
  background-image: linear-gradient(rgba(14, 165, 233, 0.5) 1px, transparent 1px),
    linear-gradient(90deg, rgba(14, 165, 233, 0.5) 1px, transparent 1px);
  background-size: 80px 80px;
}
</style>
