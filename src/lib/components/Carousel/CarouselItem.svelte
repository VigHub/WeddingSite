<script lang="ts">
	import { fade } from 'svelte/transition';
	import carouselIndex from '../../../stores/carousel';

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
			<div class="absolute inset-x-[15%] bottom-5 hidden py-5 text-center text-white md:block">
				{#if image.title}
					<h5 class="text-xl">{image.title}</h5>
				{/if}
				<p>{image.text ?? ''}</p>
			</div>
		{/if}
	</div>
{/if}
