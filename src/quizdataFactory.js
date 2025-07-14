import {fetchKanjiYomiAsync, fetchMondaisuAsync} from './supabase.js';

let mondaisu;

/** 0以上max未満の整数をランダムに選ぶ関数 */
function randomRange(max){
    return Math.floor(Math.random() * max);
}

/** 0以上max以下の整数を重複なくlen個をランダムに選ぶ関数 */
function randomArray(max, len){
    const array = [];
    while(array.length < len){
        const r = randomRange(max);
        if(!array.includes(r)){
            array.push(r);
        }
    }
    return array;
}

export async function getQuizdataAsync(){
    mondaisu ??= await fetchMondaisuAsync();
    const numberOfTaku = 5;
    const takuID = randomArray(mondaisu, numberOfTaku); 
    const kanjiYomi = await fetchKanjiYomiAsync(takuID);
    const seikai = randomRange(numberOfTaku);
    return {
        mondai: kanjiYomi[seikai].kanji, 
        seikai: kanjiYomi[seikai].yomi, 
        taku: kanjiYomi.map(({yomi}) => yomi)
    };
}