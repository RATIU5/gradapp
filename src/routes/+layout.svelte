<script lang="ts">
	import '../app.css';
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	import { page } from '$app/stores';
	import Header from '$lib/components/header.svelte';
	import { swipe } from 'svelte-gestures';
	import { goto } from '$app/navigation';

	let path: string;
	$: path = $page.url.pathname;

	function handler(event: any) {
		let direction = event.detail.direction;
		switch (direction) {
			case 'left':
				if (path === '/') {
					goto('/graduates');
				} else if (path === '/graduates') {
					goto('/attendees');
				} else if (path === '/attendees') {
					goto('/admin');
				}
				break;
			case 'right':
				if (path === '/admin') {
					goto('/attendees');
				} else if (path === '/attendees') {
					goto('/graduates');
				} else if (path === '/graduates') {
					goto('/');
				}
				break;
		}
	}

	const queryClient = new QueryClient();
</script>

<QueryClientProvider client={queryClient}>
	<div
		use:swipe={{ timeframe: 300, minSwipeDistance: 100, touchAction: 'pan-y' }}
		on:swipe={handler}
		class="flex min-h-screen flex-col relative justify-center items-center"
	>
		<header class="w-full">
			<Header />
		</header>
		<main class="flex flex-grow mb-16 w-full lg:mt-14">
			<slot />
		</main>
		<footer class="py-2 hidden">
			<p class="text-neutral-400">
				gradapp by <a href="https://avioma.com/">AVIOMA</a> &copy; 2023
			</p>
		</footer>
	</div>
</QueryClientProvider>
