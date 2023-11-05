<script lang="ts">
	import { onMount } from 'svelte';
	import carouselIndex from '../../../stores/carousel';
	import CarouselIndicator from './CarouselIndicator.svelte';
	import CarouselItem from './CarouselItem.svelte';

	let images: CarouselImage[] = [
		{ src: 'carousel/test.jpg', title: 'First Title', text: 'First Text' },
		{ src: 'carousel/test2.jpg', title: 'Second Title' },
		{ src: 'carousel/test3.jpg', title: 'Third Title', text: 'This is a long third text' }
	];
	let interval: NodeJS.Timeout;
	const timerCarouselSeconds = 10 * 1000;

	const handleInterval = () => {
		if (interval) {
			clearInterval(interval);
		}
		interval = setInterval(() => {
			onNext();
		}, timerCarouselSeconds);
	};

	const onNext = () => {
		handleInterval();
		let now = $carouselIndex;
		now += 1;
		now %= images.length;
		carouselIndex.set(now);
	};

	const onPrev = () => {
		handleInterval();
		let now = $carouselIndex;
		now -= 1;
		if (now < 0) now = images.length - 1;
		carouselIndex.set(now);
	};

	onMount(() => {
		carouselIndex.set(0);
		handleInterval();
		//If a function is returned from onMount, it will be called when the component is unmounted.
		return () => clearInterval(interval);
	});
</script>

<div
	id="carouselExampleCaptions"
	class="relative w-full mx-auto"
	data-te-carousel-init
	data-te-ride="carousel"
>
	<!--Carousel indicators-->
	<div
		class="absolute bottom-0 left-0 right-0 z-[2] mx-[15%] mb-4 flex list-none justify-center p-0"
		data-te-carousel-indicators
	>
		{#each images as image, index}
			<CarouselIndicator {index} {handleInterval} />
		{/each}
	</div>

	<!--Carousel items-->
	<div class="relative w-full overflow-hidden after:clear-both after:block after:content-['']">
		{#each images as image, index}
			<CarouselItem {index} {image} />
		{/each}
	</div>

	<!--Carousel controls - prev item-->
	<button
		class="absolute bottom-0 left-0 top-0 z-[1] flex w-[15%]
		items-center justify-center border-0 bg-none p-0 text-center
		 text-white opacity-50 transition-opacity duration-150
		 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white
		 hover:no-underline hover:opacity-90 hover:outline-none
		 focus:text-white focus:no-underline focus:opacity-90
		 focus:outline-none motion-reduce:transition-none"
		type="button"
		on:click={onPrev}
	>
		<span class="inline-block h-8 w-8">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="2.5"
				stroke="currentColor"
				class="h-8 w-8"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
			</svg>
		</span>
		<span
			class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap
			!border-0 !p-0 ![clip:rect(0,0,0,0)]">Previous</span
		>
	</button>
	<!--Carousel controls - next item-->
	<button
		class="absolute bottom-0 right-0 top-0 z-[1] flex w-[15%] items-center
		 justify-center border-0 bg-none p-0 text-center text-white opacity-50
		  transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)]
		   hover:text-white hover:no-underline hover:opacity-90 hover:outline-none
		    focus:text-white focus:no-underline focus:opacity-90 focus:outline-none
			motion-reduce:transition-none"
		type="button"
		on:click={onNext}
	>
		<span class="inline-block h-8 w-8">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="2.5"
				stroke="currentColor"
				class="h-8 w-8"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
			</svg>
		</span>
		<span
			class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap
			 !border-0 !p-0 ![clip:rect(0,0,0,0)]">Next</span
		>
	</button>
</div>
