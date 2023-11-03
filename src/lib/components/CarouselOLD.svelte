<script lang="ts">
	let elemCarousel: HTMLDivElement;
	const images = ['test.jpg', 'test.jpg', 'test.jpg', 'test.jpg', 'test.jpg'];

	function carouselLeft(): void {
		const x =
			elemCarousel.scrollLeft === 0
				? elemCarousel.clientWidth * elemCarousel.childElementCount // loop
				: elemCarousel.scrollLeft - elemCarousel.clientWidth; // step left
		elemCarousel.scroll(x, 0);
	}

	function carouselRight(): void {
		const x =
			elemCarousel.scrollLeft === elemCarousel.scrollWidth - elemCarousel.clientWidth
				? 0 // loop
				: elemCarousel.scrollLeft + elemCarousel.clientWidth; // step right
		elemCarousel.scroll(x, 0);
	}
</script>

<div class="card p-4 grid grid-cols-[auto_1fr_auto] gap-4 items-center w-[512px] bg-red-500">
	<button type="button" class="btn-icon bg-surface-50" on:click={carouselLeft}>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="w-6 h-6"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
			/>
		</svg>
	</button>
	<div
		bind:this={elemCarousel}
		class="snap-x snap-mandatory scroll-smooth flex overflow-x-auto gap-10"
	>
		{#each images as image}
			<img
				class="snap-center w-[512px] rounded-container-token object-fill pb-5"
				src="carousel/{image}"
				alt={image}
				loading="lazy"
			/>
		{/each}
	</div>
	<button type="button" class="btn-icon bg-surface-50" on:click={carouselRight}>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="w-6 h-6"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
			/>
		</svg>
	</button>
</div>
