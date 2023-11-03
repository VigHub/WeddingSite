<script lang="ts">
	import { fade } from 'svelte/transition';
	import carouselIndex from '../../../stores/carousel';
	import { text } from '@sveltejs/kit';

	export let image: CarouselImage;
	export let index: number;
</script>

<!--First item-->
{#if $carouselIndex === index}
	<div
		class="relative float-left -mr-[100%] w-full transition-transform
			duration-[600ms]"
		style="backface-visibility: hidden"
	>
		<img
			src={image.src}
			in:fade
			class="block snap-center rounded-container-token object-cover w-full h-80"
			alt="..."
		/>
		{#if image.title || image.text}
			<div class="absolute inset-x-[15%] bottom-5 hidden py-5 text-center text-white md:block">
				{#if image.title}
					<h5 class="text-xl">{image.title}</h5>
				{/if}
				<!-- {#if image.text} -->
				<p>{image.text ?? ''}</p>
				<!-- {/if} -->
			</div>
		{/if}
	</div>
{/if}
