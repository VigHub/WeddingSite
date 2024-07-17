<script lang="ts">
	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';
	import moment from 'moment-timezone';
	export let target: string;
	export let weddingHappened: boolean;
	let countdown: NodeJS.Timeout;

	let tz = 'Europe/Rome';
	let timeRemaining: number;

	const formatTime = (time: number) => {
		const days = Math.floor(time / (1000 * 60 * 60 * 24));
		const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
		const seconds = Math.floor((time % (1000 * 60)) / 1000);

		return { days, hours, minutes, seconds };
	};

	$: time = formatTime(timeRemaining);

	const startCountdown = () => {
		countdown = setInterval(() => {
			let now = moment().tz(tz);
			let event = moment(target).tz(tz);
			if (now.isAfter(event)) {
				timeRemaining = now.diff(event);
				weddingHappened = true;
			} else timeRemaining = event.diff(now);
			time = formatTime(timeRemaining);
			if (timeRemaining <= 0) {
				clearInterval(countdown);
			}
		}, 1000);
	};

	onMount(() => {
		startCountdown();
		return () => clearInterval(countdown);
	});
</script>

<div
	class="h-80 flex flex-col items-center justify-center text-white p-4 rounded-lg shadow-md
	 countdown bg-[url('/villaCantonCountdown.jpeg')]"
>
	<div class="bg-gray-600 bg-opacity-50 px-5 py-4 rounded-xl md:w-5/12 w-full">
		<div class="grid grid-cols-4 justify-center p-5">
			<div class="text-2xl md:text-3xl font-semibold m-2 w-full text-center">
				{time.days}
				<br />
				<span class="text-sm">{$_('pages.info.countdown.days')}</span>
			</div>
			<div class="text-2xl md:text-3xl font-semibold m-2 w-full text-center">
				{time.hours}
				<br />
				<span class="text-sm">{$_('pages.info.countdown.hours')}</span>
			</div>
			<div class="text-2xl md:text-3xl font-semibold m-2 w-full text-center">
				{time.minutes}
				<br />
				<span class="text-sm">{$_('pages.info.countdown.minutes')}</span>
			</div>
			<div class="text-2xl md:text-3xl font-semibold m-2 w-full text-center">
				{time.seconds}
				<br />
				<span class="text-sm">{$_('pages.info.countdown.seconds')}</span>
			</div>
		</div>
		<p class="text-xs md:text-lg mt-2 text-center">{$_('pages.info.countdown.message')}</p>
	</div>
</div>

<style>
	.countdown {
		background-size: cover;
		background-position: center;
	}
</style>
