<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
	import { createDisclosure, createMenu } from 'svelte-headlessui';
	import { IconX, IconMenu2 } from '@tabler/icons-svelte';
	import Transition from 'svelte-transition';
	import { cn } from '$lib/utils';

	const disclosure = createDisclosure({ label: 'Navigation Menu', expanded: false });
	const menu = createMenu({ label: 'User' });

	const user = {
		name: 'Tom Cook',
		email: 'tom@example.com',
		imageUrl:
			'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
	};
	const navigation = [
		{ name: 'Home', href: '/', current: true },
		{ name: 'Graduates', href: '/graduates', current: false },
		{ name: 'Attendees', href: '/attendees', current: false },
		{ name: 'Admin', href: '/admin', current: false },
		{ name: 'Login', href: '/login', current: false }
	];
	const userNavigation = [{ name: 'Sign out', href: '/logout' }];
</script>

<div class="min-h-full">
	<nav class="bg-gray-800">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="flex h-16 items-center justify-between">
				<div class="flex items-center">
					<div class="flex-shrink-0">
						<img
							class="h-8 w-8"
							src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
							alt="Your Company"
						/>
					</div>
					<div class="hidden md:block">
						<div class="ml-10 flex items-baseline space-x-4">
							{#each navigation as item}
								{@const active = $page.url.pathname === item.href}
								<a
									href={item.href}
									class={cn(
										active
											? 'bg-gray-900 text-white'
											: 'text-gray-300 hover:bg-gray-700 hover:text-white',
										'rounded-md px-3 py-2 text-sm font-medium'
									)}
									aria-current={item.current ? 'page' : undefined}
								>
									{item.name}
								</a>
							{/each}
						</div>
					</div>
				</div>
				<div class="hidden md:block">
					<div class="ml-4 flex items-center md:ml-6">
						<!-- User Profile -->
						<div class="relative ml-3">
							<div>
								<button
									use:menu.button
									class="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
								>
									<span class="absolute -inset-1.5" />
									<span class="sr-only">Open user menu</span>
									<img class="h-8 w-8 rounded-full" src={user.imageUrl} alt="" />
								</button>
							</div>
							<Transition
								show={$menu.expanded}
								enter="transition ease-out duration-100"
								enterFrom="transform opacity-0 scale-95"
								enterTo="transform opacity-100 scale-100"
								leave="transition ease-in duration-75"
								leaveFrom="transform opacity-100 scale-100"
								leaveTo="transform opacity-0 scale-95"
							>
								<div
									use:menu.items
									class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
								>
									{#each userNavigation as item}
										{@const active = $menu.active === item.name}
										<a
											use:menu.item
											href={item.href}
											class={cn('block px-4 py-2 text-sm text-gray-700', {
												'bg-gray-100': active
											})}
										>
											{item.name}
										</a>
									{/each}
								</div>
							</Transition>
						</div>
					</div>
				</div>
				<div class="-mr-2 flex md:hidden">
					<!-- Mobile Menu Button -->
					<button
						use:disclosure.button
						class="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
					>
						<span class="absolute -inset-0.5" />
						<span class="sr-only">Open main menu</span>
						{#if $disclosure.expanded}
							<IconX class="block h-6 w-6" />
						{:else}
							<IconMenu2 class="block h-6 w-6" />
						{/if}
					</button>
				</div>
			</div>
		</div>

		{#if $disclosure.expanded}
			<div use:disclosure.panel class="md:hidden">
				<div class="space-y-1 px-2 pb-3 pt-2 sm:px-3">
					{#each navigation as item}
						{@const active = $page.url.pathname === item.href}
						<a
							href={item.href}
							class={cn(
								active
									? 'bg-gray-900 text-white'
									: 'text-gray-300 hover:bg-gray-700 hover:text-white',
								'block rounded-md px-3 py-2 text-base font-medium'
							)}
							aria-current={active ? 'page' : undefined}
						>
							{item.name}
						</a>
					{/each}
				</div>
				<div class="border-t border-gray-700 pb-3 pt-4">
					<div class="flex items-center px-5">
						<div class="flex-shrink-0">
							<img class="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
						</div>
						<div class="ml-3">
							<div class="text-base font-medium text-white">{user.name}</div>
							<div class="text-sm font-medium text-gray-400">{user.email}</div>
						</div>
					</div>
					<div class="mt-3 space-y-1 px-2">
						{#each userNavigation as item}
							<a
								href={item.href}
								class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
							>
								{item.name}
							</a>
						{/each}
					</div>
				</div>
			</div>
		{/if}
	</nav>
	<main>
		<div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
			<slot />
		</div>
	</main>
</div>
