<script lang="ts">
	import { page } from '$app/stores';
	import { cn } from '$lib/utils/fn';
</script>

<div class="flex w-full flex-col max-w-2xl items-center px-4">
	<div class="bg-neutral-100 rounded-lg p-1">
		<a
			href="/admin/students"
			class={cn('inline-block m-0.5 py-2 px-4 text-sm rounded-md text-neutral-500', {
				'bg-white text-neutral-800': $page.url.pathname === '/admin/students'
			})}>Students</a
		>
		<a
			href="/admin/programs"
			class={cn('inline-block m-0.5 py-2 px-4 text-sm rounded-md text-neutral-500', {
				'bg-white text-neutral-800': $page.url.pathname === '/admin/programs'
			})}>Programs</a
		>
	</div>
	<slot />
</div>
