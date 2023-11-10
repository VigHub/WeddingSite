<script lang="ts">
	import Carousel from '$lib/components/Carousel/Carousel.svelte';
	import Countdown from '$lib/components/Countdown.svelte';
	import type { CarouselImage } from '$lib/utils/interfaces';
	import canAccessReservedArea from '../../stores/reserved';
	import MapFrame from '$lib/components/MapFrame.svelte';

	const images: CarouselImage[] = [
		{ src: 'japan/tokyo-tower.jpg', title: 'Tokyo Tower', text: '東京タワー' },
		{ src: 'japan/tokyo-streets.jpg', title: 'Strade di Tokyo', text: '東京の街並み' },
		{ src: 'japan/mount-fuji.jpg', title: 'Mount Fuji', text: '富士山' },
		{
			src: 'japan/kyoto-torii.jpg',
			title: 'Santuari a Kyoto',
			text: '伏見稲荷大社'
		},
		{
			src: 'japan/kyoto-kinkakuji.jpg',
			title: "Pagoda d'oro a Kyoto",
			text: '鹿苑寺'
		}
	];
	canAccessReservedArea.set(false);
</script>

<h1 class="text-center text-4xl mb-8">Informazioni</h1>

<div class="flex items-center mb-10">
	<div class="grid grid-cols-2">
		<div class="p-2 rounded-l-md md:h-[300px]">
			<div class="flex flex-col w-full justify-center text-right text-2xl pe-2 h-full">
				<p>Dove ci sposiamo?</p>
				<a class="mt-3" href="https://maps.app.goo.gl/Aevxp2VcpnHTZrPN8"
					><p class="md:text-lg text-sm">Chiesa Parrocchiale dei SS. Alessandro e Vincenzo,</p>
					<p class="md:text-lg text-sm">Ponteranica (BG)</p>
				</a>
			</div>
		</div>
		<MapFrame
			title="Chiesa Ponteranica"
			classStr="h-full"
			src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2784.683865105568!2d9.66599301139743!3d45.73743441504659!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478156b9528cc3fb%3A0x2a9c4b3d374c4191!2sChiesa%20Parrocchiale%20dei%20SS.%20Alessandro%20e%20Vincenzo!5e0!3m2!1sen!2sit!4v1699222290915!5m2!1sen!2sit"
			mapClass="w-full md:w-[500px] h-full"
			style="border:2; border-radius: 2em;"
		/>
	</div>
</div>
<div class="flex items-center">
	<div class="grid grid-cols-2">
		<MapFrame
			title="Villa Canton"
			classStr="h-[200px] md:h-full"
			src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d10173.80548480991!2d9.8411298!3d45.7000277!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47815c1ab61e55d5%3A0x9e7b9c902b300478!2sVilla%20Canton!5e1!3m2!1sen!2sit!4v1694468097566!5m2!1sen!2sit"
			mapClass="w-full md:w-[500px] h-full"
			style="border:2; border-radius: 2em;"
		/>
		<div class="p-2 rounded-l-md md:h-[300px]">
			<div class="flex flex-col w-full justify-center text-2xl text-left h-full">
				<p class="justify-center">Dove è la festa?</p>
				<a class="mt-3" href="https://maps.app.goo.gl/fYrECf2Ud594fw2L6"
					><p class="md:text-lg text-sm">Villa Canton, Trescore (BG)</p>
				</a>
			</div>
		</div>
	</div>
</div>

<div class="md:w-2/3 w-full mt-10">
	<Countdown target={'2024-07-20T15:00:00'} />
</div>
<div class="md:w-2/3 w-full mt-10">
	<p class="justify-center text-2xl">Dove andremo <br class="md:hidden" />in luna di miele?</p>
	<Carousel {images} />
</div>
