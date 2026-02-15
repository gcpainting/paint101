import { supabase } from '$lib/server/supabase';
import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
	const { data: category, error: categoryError } = await supabase
		.from('categories')
		.select('*')
		.eq('slug', params.slug)
		.single();

	if (categoryError || !category) {
		throw error(404, 'Category not found');
	}
	return { category };
};
