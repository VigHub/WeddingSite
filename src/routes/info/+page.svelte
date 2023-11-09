<script lang="ts">
	import Carousel from '$lib/components/Carousel/Carousel.svelte';
	import Countdown from '$lib/components/Countdown.svelte';
	import canAccessReservedArea from '../../stores/reserved';

	const images: CarouselImage[] = [
		{ src: 'carousel/test.jpg', title: 'First Title', text: 'First Text' },
		{ src: 'carousel/test2.jpg', title: 'Second Title' },
		{ src: 'carousel/test3.jpg', title: 'Third Title', text: 'This is a long third text' }
	];
	canAccessReservedArea.set(false);
</script>

<h1 class="text-center text-4xl mb-8">Informazioni</h1>
<div class="flex items-center mb-10">
	<div class="grid grid-cols-2">
		<div class="p-2 rounded-l-md md:h-[300px] flex">
			<div class="flex flex-col w-full text-right justify-center text-2xl pe-2">
				<p>Dove ci sposiamo?</p>
				<a class="mt-3" href="https://maps.app.goo.gl/Aevxp2VcpnHTZrPN8"
					><p class="md:text-lg text-sm">Chiesa Parrocchiale dei SS. Alessandro e Vincenzo,</p>
					<p class="md:text-lg text-sm">Ponteranica (BG)</p>
				</a>
			</div>
		</div>
		<iframe
			title="Chiesa Ponteranica"
			src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2784.683865105568!2d9.66599301139743!3d45.73743441504659!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478156b9528cc3fb%3A0x2a9c4b3d374c4191!2sChiesa%20Parrocchiale%20dei%20SS.%20Alessandro%20e%20Vincenzo!5e0!3m2!1sen!2sit!4v1699222290915!5m2!1sen!2sit"
			class="w-full md:w-[500px] h-full"
			style="border:2; border-radius: 2em;"
			loading="lazy"
			referrerpolicy="no-referrer-when-downgrade"
		/>
	</div>
</div>
<div class="flex items-center">
	<div class="grid grid-cols-2">
		<iframe
			title="Villa Canton"
			src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d10173.80548480991!2d9.8411298!3d45.7000277!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47815c1ab61e55d5%3A0x9e7b9c902b300478!2sVilla%20Canton!5e1!3m2!1sen!2sit!4v1694468097566!5m2!1sen!2sit"
			class="w-full md:w-[500px] md:h-full h-[200px]"
			style="border:2; border-radius: 2em;"
			loading="lazy"
			referrerpolicy="no-referrer-when-downgrade"
		/>
		<div class="p-2 ps-4 rounded-l-md md:h-[300px] flex">
			<div class="flex flex-col w-full justify-center text-2xl text-left">
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
