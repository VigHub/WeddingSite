<script lang="ts">
	import { onMount } from 'svelte';

	export let target: string;
	let targetDate = new Date(target).getTime();
	let countdown: NodeJS.Timeout;

	$: timeRemaining = targetDate - Date.now();

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
			timeRemaining = targetDate - Date.now();
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
	 countdown bg-[url('villaCantonCountdown.jpeg')]"
>
	<div class="bg-gray-600 bg-opacity-50 px-5 py-4 rounded-xl md:w-2/3 w-full">
		<h1 class="text-4xl font-bold mb-2 text-center">Quanto manca?</h1>
		<div class="flex items-center justify-center p-5">
			<div class="text-3xl font-semibold m-2 w-1/4">
				{time.days}
				<br />
				<span class="text-sm">Giorni</span>
			</div>
			<div class="text-3xl font-semibold m-2 w-1/4">
				{time.hours}
				<br />
				<span class="text-sm">Ore</span>
			</div>
			<div class="text-3xl font-semibold m-2 w-1/4">
				{time.minutes}
				<br />
				<span class="text-sm">Minuti</span>
			</div>
			<div class="text-3xl font-semibold m-2 w-1/4">
				{time.seconds}
				<br />
				<span class="text-sm">Secondi</span>
			</div>
		</div>
		<p class="text-xs mt-2 text-center">Noi contiamo proprio i secondi... 😍</p>
	</div>
</div>

<style>
	.countdown {
		background-size: cover;
		background-position: center;
	}
</style>
