<script>
	import '../app.css';
	import Header from '$lib/components/header.svelte';
	import { SvelteUIProvider, colorScheme } from '@svelteuidev/core';
</script>

<SvelteUIProvider themeObserver={$colorScheme}>
	<div class="flex min-h-screen flex-col overflow-hidden">
		<header>
			<Header />
		</header>
		<main class="flex-grow">
			<slot />
		</main>
		<footer>Footer</footer>
	</div>
</SvelteUIProvider>
