<script lang="ts">
	import { page } from '$app/stores';
	import { cn } from '$lib/utils/fn';
	import { Home, GraduationCap, Lock, Users, UserCog } from 'lucide-svelte';

	let path: string;
	$: path = $page.url.pathname;
</script>

<nav
	class="flex-grow flex fixed bottom-0 lg:top-0 lg:bottom-auto w-full border-t lg:border-t-0 lg:border-b border-solid border-neutral-100 z-50"
>
	<ul class="flex w-full justify-around lg:justify-center py-4 bg-white">
		<li class="lg:mx-2">
			<a
				href="/"
				class={cn('block w-8 h-8 text-neutral-400 relative lg:w-auto lg:h-auto', {
					'text-red-400': path === '/'
				})}
			>
				<Home class="w-full h-full lg:hidden" />
				<p class="hidden lg:block lg:m-0">Home</p>
				{#if path === '/'}
					<div class="w-2 h-2 bg-red-400 rounded-full absolute -bottom-2 left-3 lg:hidden" />
				{/if}
			</a>
		</li>
		<li class="lg:mx-2">
			<a
				href="/graduates"
				class={cn('block w-8 h-8 text-neutral-400 relative lg:w-auto lg:h-auto', {
					'text-red-400': path === '/graduates'
				})}
			>
				<GraduationCap class="w-full h-full lg:hidden" />
				<p class="hidden lg:block lg:m-0">Graduates</p>
				{#if path === '/graduates'}
					<div class="w-2 h-2 bg-red-400 rounded-full absolute -bottom-2 left-3 lg:hidden" />
				{/if}
			</a>
		</li>
		{#if $page.data.session}
			<li class="lg:mx-2">
				<a
					href="/attendees"
					class={cn('block w-8 h-8 text-neutral-400 relative lg:w-auto lg:h-auto', {
						'text-red-400': path === '/attendees'
					})}
				>
					<Users class="w-full h-full lg:hidden" />
					<p class="hidden lg:block lg:m-0">Attendees</p>
					{#if path === '/attendees'}
						<div class="w-2 h-2 bg-red-400 rounded-full absolute -bottom-2 left-3 lg:hidden" />
					{/if}
				</a>
			</li>
			<li class="lg:mx-2">
				<a
					href="/admin"
					class={cn('block w-8 h-8 text-neutral-400 relative lg:w-auto lg:h-auto', {
						'text-red-400': path.includes('/admin')
					})}
				>
					<UserCog class="w-full h-full lg:hidden" />
					<p class="hidden lg:block lg:m-0">Admin</p>
					{#if path.includes('/admin')}
						<div class="w-2 h-2 bg-red-400 rounded-full absolute -bottom-2 left-3 lg:hidden" />
					{/if}
				</a>
			</li>
		{/if}
		{#if $page.data.session}
			<li class="lg:mx-2">
				<a
					href="/auth/logout"
					class={cn('block w-8 h-8 text-neutral-400 relative lg:w-auto lg:h-auto', {
						'text-red-400': path === '/auth/logout'
					})}
				>
					<Lock class="w-full h-full lg:hidden" />
					<p class="hidden lg:block lg:m-0">Logout</p>
					{#if path === '/auth/logout'}
						<div class="w-2 h-2 bg-red-400 rounded-full absolute -bottom-2 left-3 lg:hidden" />
					{/if}
				</a>
			</li>
		{:else}
			<li class="lg:mx-2">
				<a
					href="/auth/login"
					class={cn('block w-8 h-8 text-neutral-400 relative lg:w-auto lg:h-auto', {
						'text-red-400': path === '/auth/login'
					})}
				>
					<Lock class="w-full h-full lg:hidden" />
					<p class="hidden lg:block lg:m-0">Login</p>
					{#if path === '/auth/login'}
						<div class="w-2 h-2 bg-red-400 rounded-full absolute -bottom-2 left-3 lg:hidden" />
					{/if}
				</a>
			</li>
		{/if}
	</ul>
</nav>
