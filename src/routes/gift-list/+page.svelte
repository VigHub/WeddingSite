<script>
	import Iban from '$lib/components/Iban.svelte';
	import { Tab, TabGroup } from '@skeletonlabs/skeleton';
	import canAccessReservedArea from '../../stores/reserved';
	import MapFrame from '$lib/components/MapFrame.svelte';
	import { _ } from 'svelte-i18n';
	import Carousel from '$lib/components/Carousel/Carousel.svelte';

	let tabSet = 0;
	$: japanImages = [
		{ src: 'japan/tokyo-tower.jpg', title: $_('pages.info.japan.tokyo-tower'), text: '東京タワー' },
		{
			src: 'japan/tokyo-streets.jpg',
			title: $_('pages.info.japan.tokyo-streets'),
			text: '東京の街並み'
		},
		{ src: 'japan/mount-fuji.jpg', title: $_('pages.info.japan.mount-fuji'), text: '富士山' },
		{
			src: 'japan/kyoto-torii.jpg',
			title: $_('pages.info.japan.kyoto-shrines'),
			text: '伏見稲荷大社'
		},
		{
			src: 'japan/kyoto-kinkakuji.jpg',
			title: $_('pages.info.japan.kinkaku-ji'),
			text: '鹿苑寺'
		}
	];
	$: houseImages = [
		{
			src: 'house/out.jpg',
			title: 'Prima foto dal cantiere'
		},
		{ src: 'house/bed.jpg', title: 'Quanto spazio! 😅' },
		{
			src: 'house/bath.jpg',
			title: 'Un sacco di luce! 😍'
		}
	];
	canAccessReservedArea.set(false);
</script>

<h1 class="text-center text-4xl">{$_('navbar.gift-list')}</h1>
<div class="mt-5">
	<div class="flex justify-center">
		<div class="md:w-3/5">
			<TabGroup justify="justify-center" regionPanel="w-full">
				<Tab bind:group={tabSet} name="tab1" value={0}>
					<svelte:fragment slot="lead"
						>{$_('pages.gift-list.japan-tab.title')} <br />日本</svelte:fragment
					>
				</Tab>
				<Tab bind:group={tabSet} name="tab1" value={1}>
					<svelte:fragment slot="lead"
						>{$_('pages.gift-list.cultery-tab.title')} <br />🏡</svelte:fragment
					>
				</Tab>
				<svelte:fragment slot="panel">
					{#if tabSet === 0}
						<div class="text-center space-y-4">
							<p>
								Sogniamo da molto tempo un viaggio in Giappone, di questo meraviglioso Paese ci
								affascina la sua armonia tra tradizione e modernità, e non vediamo l'ora di scoprire
								tutte le particolarità e le sensazioni uniche che ci regalerà.
							</p>
							<p>
								Vivere tutto questo durante il nostro viaggio di nozze lo renderà un'esperienza che
								ci porteremo per sempre nel cuore, e che ci permetterà di creare ricordi indelebili
								già dai nostri primissimi giorni da marito e moglie.
							</p>
							<p>
								Se desiderate contribuire a realizzare questo nostro grande sogno, vi lasciamo il
								nostro conto bancario per le vostre gentilissime donazioni:
							</p>
							<div class="flex justify-center">
								<Iban />
							</div>
							<p>
								Vi siamo immensamente grati per la vostra partecipazione anche a questo momento
								speciale della nostra vita. Grazie di essere parte del nostro viaggio e di aiutarci
								a rendere indimenticabile il nostro inizio insieme!
							</p>
							<p>Con tanto affetto,</p>
							<p>Elisa e Gianluca</p>
						</div>
						<div class="w-full mt-10">
							<p class="text-center text-lg md:text-2xl mb-2">
								{$_('pages.gift-list.question-japan')}
							</p>
							<Carousel images={japanImages} />
						</div>
					{:else if tabSet === 1}
						<div class="text-center space-y-4 w-full">
							<p>
								La nostra casa sarà il luogo in cui condivideremo la nostra nuova meravigliosa
								quotidianità e in cui coltiveremo il nostro amore.
							</p>
							<p>
								Abbiamo quindi pensato di condividere con voi la creazione di questo spazio unico e
								magico per noi, iniziando con tutti gli oggetti che useremo giornalmente o nelle
								occasioni più speciali, quando verrete a trovarci.
							</p>
							<p>
								Per questo abbiamo creato una lista nozze che potrete consultare chiamando o
								recandovi presso il negozio
							</p>

							<div class="flex w-full space-x-5 justify-center">
								<p class="font-bold">Oliva</p>
								<a href="https://maps.app.goo.gl/P9FfmiTbqJV6wDr68">in Via Borfuro, 2, Bergamo</a>
							</div>

							<MapFrame
								title="oliva"
								src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d696.7117122318623!2d9.667485899999994!3d45.694045400000014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4781510fce11ba4d%3A0x944c918c9fc16a9c!2sVia%20Borfuro%2C%202%2C%2024122%20Bergamo%20BG!5e0!3m2!1sen!2sit!4v1699903630872!5m2!1sen!2sit"
								style="border:2; border-radius: 2em;"
								mapClass="w-full h-full"
								classStr="h-[200px]"
							/>
							<p>
								Ogni vostro dono rappresenta per noi un tassello prezioso della nostra vita insieme.
							</p>
							<p>Grazie di aver deciso di prenderne parte!</p>
							<p>Elisa e Gianluca</p>
							<br />
							<div class="mt-10">
								<p class="text-center text-lg md:text-2xl mb-2">Alcune foto della nostra casina!</p>
								<Carousel images={houseImages} />
							</div>
						</div>
					{/if}
					<h2 class="h2 text-center mt-4 w-full">
						<span
							class="bg-gradient-to-br from-pink-500 to-violet-800
					bg-clip-text text-transparent box-decoration-clone">{$_('pages.gift-list.thankyou')}</span
						>
					</h2>
				</svelte:fragment>
			</TabGroup>
		</div>
	</div>
</div>
