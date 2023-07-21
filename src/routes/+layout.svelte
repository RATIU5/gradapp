<script>
	import '../app.css';
	import Header from '$lib/components/header.svelte';
</script>

<div class="flex min-h-screen flex-col overflow-hidden">
	<header>
		<Header />
	</header>
	<main class="flex-grow">
		<slot />
	</main>
	<footer>Footer</footer>
</div>
