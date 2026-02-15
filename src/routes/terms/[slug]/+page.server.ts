import { supabase } from '$lib/server/supabase';
import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
	const { data: term, error: termError } = await supabase
		.from('terms')
		.select(
			`
             *,
             categories:term_categories(
                 category:categories(id, name, slug)
             )
         `
		)
		.eq('slug', params.slug)
		.single();
	if (termError || !term) {
		throw error(404, 'Term not found');
	}

	return { term };
};
