<script lang="ts">
	import { page } from '$app/stores';
	import { cn } from '$lib/utils/fn';
	import { Home, GraduationCap, Lock, Users } from 'lucide-svelte';

	let path = $page.url.pathname;
</script>

<nav class="flex-grow flex fixed bottom-0 w-full">
	<ul class="flex w-full justify-around py-4 bg-white">
		<li>
			<a
				href="/"
				class={cn('block w-8 h-8 text-neutral-400', {
					'text-red-400': path === '/'
				})}
			>
				<Home class="w-full h-full" />
			</a>
		</li>
		<li>
			<a
				href="/graduates"
				class={cn('block w-8 h-8 text-neutral-400', {
					'text-red-400': path === '/graduates'
				})}
			>
				<GraduationCap class="w-full h-full" />
			</a>
		</li>
		<li>
			<a
				href="/attendees"
				class={cn('block w-8 h-8 text-neutral-400', {
					'text-red-400': path === '/attendees'
				})}
			>
				<Users class="w-full h-full" />
			</a>
		</li>
		<li>
			<a
				href="/admin"
				class={cn('block w-8 h-8 text-neutral-400', {
					'text-red-400': path === '/admin'
				})}
			>
				<Lock class="w-full h-full" />
			</a>
		</li>
	</ul>
</nav>
