<script lang="ts">
	interface Term {
		id: string;
		term: string;
		slug: string;
		definition: string;
		pronunciation: string | null;
		categories: { category: { id: string; name: string; slug: string } }[];
	}

	interface Props {
		data: {
			terms: Term[];
		};
	}

	let { data }: Props = $props();
</script>

<main class="mx-auto max-w-4xl p-8">
	<a href="./">back</a>
	<h1 class="mb-2 text-4xl font-bold">Terms</h1>
	<p class="mb-8 text-lg text-gray-600">A glossary of painting terms and techniques</p>

	<section>
		<h2 class="mb-4 text-2xl font-semibold">All Terms ({data.terms.length})</h2>
		<div class="space-y-4">
			{#each data.terms as term}
				<a
					href="/terms/{term.slug}"
					class="block rounded-lg border border-gray-200 p-4 transition-shadow
 hover:shadow-md"
				>
					<div class="flex justify-between">
						<div class="flex flex-col">
							<h3 class="text-lg font-medium">{term.term}</h3>
							{#if term.pronunciation}
								<span class="text-sm text-gray-500 italic">/{term.pronunciation}/</span>
							{/if}
						</div>
						<div class=" flex gap-2">
							{#each term.categories as cat}
								<div class="self-start rounded-lg bg-gray-300 p-2 text-xs text-gray-900">
									{cat.category.name}
								</div>
							{/each}
						</div>
					</div>
					<p class="mt-1 text-gray-700">{term.definition}</p>
				</a>
			{/each}
		</div>
	</section>
</main>
