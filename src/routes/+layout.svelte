<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
	import '@fontsource-variable/montserrat';
	import '@fontsource-variable/manrope';
	import { AppShell, AppBar, Toast } from '@skeletonlabs/skeleton';
	let screenSize = 0;
	import { Drawer, drawerStore } from '@skeletonlabs/skeleton';
	import Navigation from '$lib/Navigation/Navigation.svelte';
	import NavBigSize from '$lib/Navigation/NavBigSize.svelte';

	function drawerOpen(): void {
		drawerStore.open({});
	}

	import { Modal } from '@skeletonlabs/skeleton';
	import { base } from '$app/paths';
</script>

<svelte:head>
	<title>Elisa & Gianluca - 20 luglio 2024</title>
</svelte:head>
<svelte:window bind:innerWidth={screenSize} />

<Drawer bgBackdrop="none" bgDrawer="bg-white" duration={300}>
	<Navigation />
</Drawer>

<Modal />
<Toast />

<!-- App Shell -->
<AppShell slotSidebarLeft="w-0 lg:w-64">
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar background="bg-surface-100/20">
			<svelte:fragment slot="lead">
				<div class="flex items-center">
					<button class="md:hidden btn btn-sm mr-4" on:click={drawerOpen}>
						<span>
							<svg viewBox="0 0 100 80" class="fill-token w-4 h-4">
								<rect width="100" height="20" />
								<rect y="30" width="100" height="20" />
								<rect y="60" width="100" height="20" />
							</svg>
						</span>
					</button>
					<div>
						<a href="{base}/" class="text-xl uppercase"
							>{screenSize > 768 ? 'Elisa e Gianluca' : 'E + G'}</a
						>
					</div>
				</div>
				{#if screenSize > 768}
					<NavBigSize />
				{/if}
			</svelte:fragment>
			<svelte:fragment slot="trail" />
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<div class="p-10 flex flex-col items-center justify-center mx-auto">
		<slot />
	</div>
	<!-- Footer -->
	<svelte:fragment slot="pageFooter">
		<img
			alt="flowers"
			class="flex flex-col items-center justify-center
		mx-auto max-w-[200px] md:max-w-[300px]"
			src="{base}/flow.png"
		/>
		<hr class="flex flex-col items-center justify-center mx-auto max-w-[100px] mb-5" />
		<div class="text-right text-xs pe-4 pb-4">
			<div class="flex justify-end">
				<span class="inline-flex items-baseline">
					Fatto con il
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="red"
						class="w-4 h-4 pt-2"
						display="inline-block"
					>
						<path
							d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"
						/>
					</svg>
					da Elisa, Gianluca e&nbsp;<a class="text-primary-700" href="https://kit.svelte.dev/"
						>SvelteKit</a
					>.
				</span>
			</div>
		</div>
	</svelte:fragment>
</AppShell>
