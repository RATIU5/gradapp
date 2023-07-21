<script>
	import { page } from '$app/stores';
</script>

<div class="my-auto flex w-full flex-col items-center justify-center">
	{#if $page.status === 404}
		<p>Uh-oh. The requested resource doesn't exist</p>
	{:else if $page.status === 500}
		<p>Uh-oh. There is some internal issue</p>
	{:else}
		<p>It seems there has been an error, sorry about that.</p>
	{/if}
</div>
