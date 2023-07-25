<script>
	import '../app.css';
	import Header from '$lib/components/header.svelte';
</script>

<div class="flex min-h-screen flex-col relative">
	<header class="w-[calc(100% - 2rem)] flex justify-center mx-2 sticky top-0">
		<Header />
	</header>
	<main class="flex-grow">
		<slot />
	</main>
	<footer class="flex justify-center py-2">
		<p>gradapp by <a href="https://avioma.com/">AVIOMA</a> &copy; 2023</p>
	</footer>
</div>
