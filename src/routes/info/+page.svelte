<script lang="ts">
	import Countdown from '$lib/components/Countdown.svelte';
	import canAccessReservedArea from '../../stores/reserved';
	import MapFrame from '$lib/components/MapFrame.svelte';
	import { _, locale } from 'svelte-i18n';
	import { format } from 'date-fns';
	import { it, enUS, ja } from 'date-fns/locale';

	canAccessReservedArea.set(false);
	const localesMap = new Map([
		['it', it],
		['enUs', enUS],
		['ja', ja]
	]);
	$: weddingDate = format(new Date(2024, 6, 20), 'd MMMM', {
		locale: localesMap.get($locale ?? 'it')
	});
</script>

<h1 class="text-center text-4xl mb-8">{$_('pages.info.title')}</h1>
<div>
	<div class="flex justify-center mb-10">
		<div class="grid grid-cols-2">
			<div class="flex text-2xl text-right pe-4">
				<p class="my-auto">{$_('pages.info.when')}</p>
			</div>
			<div class="flex flex-col ps-1 text-3xl">
				<p class="my-auto font-semibold">
					{weddingDate} <span class="hidden md:contents">2024</span>
				</p>
				<p class="my-auto font-semibold md:hidden">2024</p>
			</div>
		</div>
	</div>
	<div class="flex items-center mb-10">
		<div class="grid grid-cols-2">
			<div class="p-2 rounded-l-md md:h-[300px]">
				<div class="flex flex-col w-full justify-center text-right text-2xl pe-2 h-full">
					<p>{$_('pages.info.church.where')}</p>
					<a class="mt-3" href="https://maps.app.goo.gl/Aevxp2VcpnHTZrPN8"
						><p class="md:text-lg text-sm">{$_('pages.info.church.whereAddress')}</p>
						<p class="md:text-lg text-sm">{$_('pages.info.church.whereAddressPlace')}</p>
						<p class="md:text-lg text-sm">{$_('pages.info.church.when')}</p>
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
					<p class="justify-center">{$_('pages.info.celebration.where')}</p>
					<a class="mt-3" href="https://maps.app.goo.gl/fYrECf2Ud594fw2L6"
						><p class="md:text-lg text-sm">
							{$_('pages.info.celebration.whereAddress')}
							{$_('pages.info.celebration.whereAddressPlace')}
						</p>
						<p class="md:text-lg text-sm">{$_('pages.info.celebration.when')}</p>
					</a>
				</div>
			</div>
		</div>
	</div>

	<div class="mt-10">
		<p class="text-center text-2xl mb-2">{$_('pages.info.countdown.time')}</p>
		<Countdown target={'2024-07-20T15:00:00+01:00'} />
	</div>
</div>
