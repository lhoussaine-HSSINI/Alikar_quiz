<template>
  <div class="card mx-auto mt-auto mt-sm-5" style="max-width: 900px;">
    <div class="row"  v-if="page_quiz">
      <img :src="quiz[count].image" class="px-4 pb-3 col-md-4 mt-3   d-block img-fluid " alt="problème">
      <div class="col-md-8">
        <div class="card-body" >
          <div class="d-flex justify-content-between"><button  class="btn btn-sm score">{{count+1}} - 5</button> <p id="time">{{ (elapsed / 1000).toFixed(2)}}</p></div>
          <hr>
          <h6 class="card-text">{{quiz[count].label}}</h6>
          <div class="d-flex flex-column card-text" v-for="q in quiz[count].answers" v-bind:key="q.answers">
            <input class="btn bg-light rounded p-2 my-2 text-start" type="reset" :value="q.label" @click="answers(q.correct, quiz[count].id)">
          </div>
          <div class="d-grid gap-2 d-md-flex justify-content-md-end">
            <button class="btn btn-success btn-sm me-md-2 mt-4 px-4 next" type="button" @click="next">Next</button>
          </div>
        </div>
      </div>
    </div>
    <div class="row"   v-if="page_natija">
      <div class="card-body">
        <p class="card-text text-center">Merci de partager le résultat final des défis,</p>
        <p class="card-text text-center"> <span>{{this.$store.state.natija.score}}</span> / 5 </p>
        <div class="d-grid gap-2 col-6 mx-auto">
          <button class="btn btn-success confirm_natija" type="button">Confirme your test</button>
          <p class="card-text text-center btn" @click="restart">Restart Test</p>
        </div>
      </div>

    </div>
  </div>
</template>

<script>

export default {
  name: 'HomeView',
  data () {
    return {
      page_natija : false,
      page_quiz  : true,
      count: 0,
      quiz:[
        {"id":1,
          "answers":[
            {"id":11,"label":"Rabat","correct":true},
            {"id":12,"label":"Casablanca","correct":false},
            {"id":13,"label":"Agadir","correct":false},
            {"id":14,"label":"Tanger","correct":false}],
          "image":"https://via.placeholder.com/750x600",
          "label":"Capitaledu maroc ?",
          "time":60},
        {"id":2,
          "answers":[
            {"id":21,"label":"Espagne","correct":true},
            {"id":22,"label":"italie","correct":false},
            {"id":23,"label":"france","correct":false},
            {"id":24,"label":"portugal","correct":false}],
          "image":"https://via.placeholder.com/750x600",
          "label":"Dans quel pays peut-on trouver la Catalogne, l'Andalousie et la Castille ?",
          "time":30},
        {"id":3,
          "answers":[
            {"id":31,"label":"Vercingétorix","correct":false},
            {"id":32,"label":"César","correct":true},
            {"id":33,"label":"Attila","correct":false},
            {"id":34,"label":"Augustus","correct":false}],
          "image":"https://via.placeholder.com/750x600",
          "label":"Qui a dit : « Le sort en est jeté » (Alea jacta est) ?",
          "time":60},
        {"id":4,
          "answers": [
            {"id":41,"label":"L'Argentine","correct":false},
            {"id":42,"label":"L'Allemagne","correct":true},
            {"id":43,"label":"L'Italie","correct":false},
            {"id":44,"label":"Le Brésil","correct":false}],
          "image":"https://via.placeholder.com/750x600",
          "label":"Quel pays aremporté la coupe du monde de football en 2014 ?",
          "time":60},
        {"id":5,
          "answers":[
            {"id":51,"label":"Léonardo DiCaprio","correct":false},
            {"id":52,"label":"Brad Pitt","correct":false},
            {"id":53,"label":"Matthew MacConaughey","correct":true},
            {"id":54,"label":"Tom Cruise","correct":false}],
          "image":"https://via.placeholder.com/750x600",
          "label":"Quel acteur américain incarne le héros du film de Christopher Nolan de 2014 « Interstellar » ?",
          "time":60}
      ],
      duration: 60 * 10000,
      elapsed: 0
    }
  },
  created() {
    let lastTime = performance.now()
    const update = () => {
      const time = performance.now()
      this.elapsed += Math.min(time - lastTime, this.duration - this.elapsed)
      lastTime = time
      this.handle = requestAnimationFrame(update)
    }
    update()
  },
  watch: {
    time(){
      if (this.elapsed >59){
                this.next()
        }else{
          return this.elapsed}
    }
  },
  methods: {

    next(){
      if(this.count <4){
        this.count ++
      }else{
        this.page_natija=true
        this.page_quiz =false
        console.log(this.$store.state.natija.score)
        console.log(this.elapsed)
        this.count = 0; }
    },
    answers(correct){
      if (correct){
        this.$store.commit('setNatija', 1)
      }
      this.next()
      this.elapsed= 0
    },
    restart(){
      this.$store.commit('restart')
      this.page_natija=false
      this.page_quiz =true
    }
  }
}
</script>
<style scoped>
.bg-light:hover {
  background-color: #4c4cdc !important;
  color: white !important;
}
.score{
  background-color: #7451eb;
  color: white;
}
.score:hover{
  background-color: #7451eb;
  color: white;
}
#time{
  color: #7451eb;
  font-weight: bolder;
}
.confirm_natija{
  background-color:#5ec169 !important;
}
.next{
  background-color: #4ca054 !important;
}

</style>