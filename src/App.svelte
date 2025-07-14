<script>
  import {onMount} from 'svelte';
  import AnswerButton from "./AnswerButton.svelte";
  import TitlePage from "./TitlePage.svelte";
  import {getQuizdataAsync} from "./quizdataFactory";
  import Progressbar from "./Progressbar.svelte";
  import GameoverModal from "./GameoverModal.svelte";
  import FancyScore from './FancyScore.svelte';
 
  let gameoverModal;
  const [InitialState, TitleState, QuestionState, AnswerState, GameoverState, QuizStart] = [0, 1, 2, 3, 4, 5];
  let state = InitialState;

  const maxTime = 30;
  let time = maxTime;
  let currentScore = 0;
  let renzokuSeikai = 0;
  let fancyScore;
  let quizdata;

  onMount(changeToTitle);

  export function getRenzokuSeikai(){
    return renzokuSeikai;
  }

  function changeToTitle(){
      gameoverModal.closeModal();
      state = TitleState;
  }
  async function changeToQuestionAsync(){
    quizdata = await getQuizdataAsync();
    state = QuestionState;
  }
  function changeToAnswer(){
    state = AnswerState;
    setTimeout(()=>{
        if(state===AnswerState){
          changeToQuestionAsync();
        }
    }, 1000);
  }
  function changeToGameover(){
    state = GameoverState;
    gameoverModal.showModal(fancyScore.getScore());
  }

  function changeToQuizstart(){
    state = QuizStart;
    time = maxTime;
    const timer = setInterval(()=>{
      if(state===QuestionState && time<0){
        clearInterval(timer);
        changeToGameover();
      }
      if(state===QuestionState){
          time -= 0.1;
      }
    }, 100);
    changeToQuestionAsync();
  }

  function answerButtonClicked(isCorrect){
    if(state!==QuestionState) return;
    fancyScore.updateScore(isCorrect);
    if(fancyScore.getRenzokuSeikai()>=5){
        time = Math.min(time+1, maxTime);
    }
    else if(!isCorrect){
        time -= 1;
    }
    changeToAnswer();
  }
</script>

<svelte:head>
  <title>QuizApp</title>
</svelte:head>

<main class="flex flex-col h-svh">
{#if state===TitleState}
  <TitlePage on:click={changeToQuizstart}></TitlePage>
{:else if state===QuestionState || state===AnswerState || state===GameoverState}
  <!-- メニューバー -->
  <FancyScore bind:this={fancyScore}/>
  <Progressbar maxTime={maxTime} time={time}/>
  {#if quizdata}
  <div class="bg-green-200 text-center text-4xl py-4">{quizdata.mondai}</div>
  <div class="bg-blue-200 flex flex-col justify-around flex-grow items-center">
    {#each quizdata.taku as t}
     <AnswerButton 
      isGrayout={state===AnswerState && quizdata.seikai!==t}
      on:click={() => answerButtonClicked(quizdata.seikai===t)}>{t}
    </AnswerButton>
    {/each}
   </div>
   {:else}
   <div class="text-center py-8 text-gray-600 text-lg">Loading...</div>
 {/if}
{/if}
</main>
 <GameoverModal bind:this = {gameoverModal} on:click={changeToTitle}/>