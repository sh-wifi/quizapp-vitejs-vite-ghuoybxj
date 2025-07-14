import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://splvqqwkucozwlcjloly.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNwbHZxcXdrdWNvendsY2psb2x5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI0OTk1ODcsImV4cCI6MjA2ODA3NTU4N30.oULC3-CVC8JzmQrZU6rm-LYFVr0p9zhlNfuOSmxjqJE';
const supabase = createClient(supabaseUrl, supabaseKey);


export async function fetchKanjiYomiAsync(ids){
    const { data, error } = await supabase
        .from('SakanaKanji')
        .select('kanji, yomi')
        .in('id', ids);
    if (error) {
        console.error(error);
    }
    return data;
}

export async function fetchMondaisuAsync(){    
    const { error, count } = await supabase
        .from('SakanaKanji')
        .select('*', { count: 'exact', head: true });
    if (error) {
        console.error(error);
    }
    return count;
}