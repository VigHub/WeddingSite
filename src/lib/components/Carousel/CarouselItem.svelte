<script lang="ts">
	import { fade } from 'svelte/transition';
	import carouselIndex from '../../../stores/carousel';
	import type { CarouselImage } from '$lib/utils/interfaces';

	export let image: CarouselImage;
	export let index: number;
</script>

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
			<div
				class="absolute inset-x-[10%] md:inset-x-[20%]
			 bottom-5 pb-5 pt-2 text-center text-white md:block"
			>
				<div class="bg-gray-700 bg-opacity-50 rounded-lg">
					{#if image.title}
						<h5 class="text-xl">{image.title}</h5>
					{/if}
					<p>{image.text ?? ''}</p>
				</div>
			</div>
		{/if}
	</div>
{/if}
