<script lang="ts">
	import { ProgressRadial } from '@skeletonlabs/skeleton';

	export let title: string;
	export let src: string;
	export let mapClass: string = '';
	export let classStr: string = '';
	export let style: string = '';
	let loaded = false;
</script>

<div class={classStr + ' block'}>
	{#if !loaded}
		<div class={'flex items-center justify-center ' + classStr}>
			<ProgressRadial width={'w-12 md:w-20'} />
		</div>
	{/if}
	<iframe
		{title}
		{src}
		class={mapClass}
		{style}
		loading="eager"
		referrerpolicy="no-referrer-when-downgrade"
		on:load={() => {
			loaded = true;
		}}
	/>
</div>
