import { supabase } from '$lib/server/supabase';

export const load = async () => {
	const categoryResult = await supabase.from('categories').select('*');
	return { category: categoryResult.data ?? [] };
};
