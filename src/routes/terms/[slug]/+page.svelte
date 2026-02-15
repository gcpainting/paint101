<script lang="ts">
	interface Term {
		id: string;
		term: string;
		slug: string;
		definition: string;
		extended_description: string | null;
		pronunciation: string | null;
		example_usage: string | null;
		categories: { category: { id: string; name: string; slug: string } }[];
	}

	interface Props {
		data: { term: Term };
	}

	let { data }: Props = $props();
</script>

<main class="mx-auto max-w-4xl p-8">
	<!-- Back link -->
	<a href="/terms" class="text-blue-600 hover:underline">&larr; Back to all terms</a>

	<!-- Term header -->
	<div class="mt-6">
		<h1 class="text-4xl font-bold">{data.term.term}</h1>
		{#if data.term.pronunciation}
			<p class="mt-1 text-lg text-gray-500 italic">/{data.term.pronunciation}/</p>
		{/if}
	</div>

	<!-- Categories -->
	{#if data.term.categories.length > 0}
		<div class="mt-4 flex flex-wrap gap-2">
			{#each data.term.categories as cat}
				<span class="rounded-lg bg-gray-300 px-2 py-1 text-sm text-gray-900">
					{cat.category.name}
				</span>
			{/each}
		</div>
	{/if}

	<!-- Definition -->
	<div class="mt-6">
		<h2 class="text-xl font-semibold">Definition</h2>
		<p class="mt-2 text-gray-700">{data.term.definition}</p>
	</div>

	<!-- Extended description (if exists) -->
	{#if data.term.extended_description}
		<div class="mt-6">
			<h2 class="text-xl font-semibold">More Details</h2>
			<p class="mt-2 text-gray-700">{data.term.extended_description}</p>
		</div>
	{/if}

	<!-- Example usage (if exists) -->
	{#if data.term.example_usage}
		<div class="mt-6">
			<h2 class="text-xl font-semibold">Example Usage</h2>
			<p class="mt-2 text-gray-700 italic">"{data.term.example_usage}"</p>
		</div>
	{/if}
</main>
