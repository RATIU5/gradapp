<script>
	import '../app.css';
	import Header from '$lib/components/header.svelte';
 
</script>

    <div class="flex min-h-screen flex-col relative justify-center items-center">
    	<header class="w-full">
    		<Header />
    	</header>
    	<main class="flex h-full flex-grow">
    		<slot />
    	</main>
    	<footer class="py-2 hidden">
    		<p class="text-neutral-400">gradapp by <a href="https://avioma.com/">AVIOMA</a> &copy; 2023</p>
    	</footer>
    </div>
