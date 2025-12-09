<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'

const navigation = inject<Ref<ContentNavigationItem[]>>('navigation', ref([]))

// Filter only admin navigation
const adminNavigation = computed(() => {
  return navigation.value.filter(item => item._path?.startsWith('/admin'))
})
</script>

<template>
  <UContainer>
    <UPage>
      <template #left>
        <UPageAside>
          <div class="mb-6 p-4 bg-amber-50 dark:bg-amber-950 rounded-lg border border-amber-200 dark:border-amber-800">
            <div class="flex items-center gap-2 mb-2">
              <UIcon name="i-lucide-shield-check" class="w-5 h-5 text-amber-600 dark:text-amber-400" />
              <span class="font-semibold text-amber-900 dark:text-amber-100">Admin Section</span>
            </div>
            <p class="text-sm text-amber-700 dark:text-amber-300">
              Advanced administration and management documentation
            </p>
          </div>

          <UContentNavigation
            highlight
            :navigation="adminNavigation"
          />
        </UPageAside>
      </template>

      <slot />
    </UPage>
  </UContainer>
</template>
