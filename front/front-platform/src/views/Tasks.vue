<template>
	<div class="page">
  		<Header></Header>
        <div class="main">

            <h1 class="heading heading--medium">{{name}}</h1>

            <div class="notations">
                <div class="notation__container" v-for="notation of notations" :key="notation">
                    <template v-if="notation.name !== 'Довідка'">
                        <span class="notation__type">
                            {{notation.name}}
                        </span>
                        <div class="notation__dropdown" v-for="element of notation.elements" :key="element">
                            <div @click="insertNotation(element)" class="notation">{{element}}</div>
                        </div>
                    </template>
                    <template v-else>
                        <router-link id="hint" target="_blank" to="/platform/hint">Довідка</router-link>
                    </template>
                </div>
            </div>

            <section class="question" v-if="questions">
                <div class="question__text heading heading--small">{{questions[index].attributes.Question}}</div>
                <div class="question__answer" contenteditable @input="check()"></div>
            </section>

            <div class="help" :class="{'valid': !match.error, 'notValid': match.error}" v-if="questions">
                <div class="help__formula">{{match.text}}</div>
                <div class="help__next heading heading--small" v-if="index < questions.length - 1" @click="next()">Далі</div>
                <div class="help__next heading heading--small" v-if="index == questions.length - 1" @click="sendResults()">Надіслати</div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from "@/components/Header.vue";
import { create, all } from 'mathjs'

const config = { }
const math = create(all, config)
export default {
    name: 'Tasks',
	data: function() {
		return {
            courseId: this.$route.params.courseId,
            id: this.$route.params.id,
			notations: [
                {
                    name: "Змінні",
                    elements: ["x", "y", "z"]
                },
                {
                    name: "Константи",
                    elements: ["PI", "E", "PHI"]
                },
                {
                    name: "Тригонометрія",
                    elements: ["sin(45)", "cos(45)", "tan(45)", "cot(45)"]
                },
                {
                    name: "Інше",
                    elements: ["S(x,4,8)", "P(y,4,8)", "log(1,2)"]
                },
                {
                    name: "Довідка"
                }
            ],
            match: {
                error: true,
                text: "Пуста строка!"
            },
            index: 0,
            questions: undefined,
            name: undefined
		};
	},
    components: {
        Header
    },
    methods: {
        next(){
            if(!this.match.error) {
                localStorage.setItem(`q${this.questions[this.index].id}`, document.querySelector(".question__answer").innerHTML);
                document.querySelector(".question__answer").innerHTML = "";
                this.index++;
                this.check();
            }
            else alert("Неправильний запис");
        },
        check(){
            let str = document.querySelector(".question__answer").innerHTML;
            if(str === ""){
                this.match = {
                    error: true,
                    text: "Пуста строка!"
                };
                return false;
            }
            try{
                math.parse(str);
                this.match = {
                    error: false,
                    text: "Все в порядку"
                };
                return true;
            }
            catch(e){
                this.match = {
                    error: true,
                    text: "Неправильний запис"
                };
                return false;
            }
        },
        insertNotation(text){
            document.querySelector(".question__answer").innerHTML += text;
            this.check();
        },
        async sendResults(){
            localStorage.setItem(`q${this.questions[this.index].id}`, document.querySelector(".question__answer").innerHTML);
            let answersAndIds = [];
            for(let i=0; i<this.questions.length; i++){
                answersAndIds.push({
                    id: this.questions[i].id, 
                    answer: localStorage.getItem(`q${this.questions[i].id}`)
                });
                localStorage.removeItem(`q${this.questions[i].id}`);
            }
            let resp = await this.$options.platformAPI.data().Tasks.send(this.id, answersAndIds);
            if(resp.data.id){
                alert("Успішно надіслано!");
                this.$router.push(`/course/${this.$route.params.courseId}`);
            }
            else{
                alert("Виникла помилка");
            }
        }
    },
	mounted: async function() {
		let resp = await this.$options.platformAPI.data().Tasks.getById(this.id);
		let body = await resp.json();
        console.log(body);
        this.name = body.data.attributes.Name;
        this.questions = body.data.attributes.platform_tasks.data;
    }
}
</script>

<style lang="scss" scoped>
@import "../../../styles/global.scss";
.notations{
    position: relative;
    display: flex;
    flex-direction: row;
    height: 60px;
    z-index: 2;
}
.notation{
    border: 2px solid #000000;
    padding: 12px;
    margin: 4px 6px;
    transition: map-get($transitions, "fast");
    background: #fff;
    border-radius: 4px;
    &:hover{
        background: map-get($colors, "bg3");
    }
    &__container{
        @include card();
        @include cardHover();
        display: flex;
        flex-direction: column;
        margin: 12px;
        &:hover{
            .notation__dropdown{
                display: block;
            }
        }
    }
    &__type{
        @include card();
        margin: 0;
        padding: 12px;
        background: #fff;
        cursor: pointer;
        transition: map-get($transitions, "fast");
        &:hover{
            background: map-get($colors, "bg3");
        }
    }
    &__dropdown{
        display: none;
        background: #fff;
        cursor: pointer;
    }
}

#hint{
    @include card();
    color: #000;
    transition: map-get($transitions, "fast");
    padding: 12px;
    margin: auto;
    &:hover{
        background: map-get($colors, "bg3");
    }
}

.question{
    @include card();
    @include cardHover();
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
    padding: 24px;
	background: map-get($colors, "bg1");
    &__name{}
    &__answer{
        text-align: left;
        font-size: 1.25rem;
        width: 100%;
        border: 2px solid map-get($colors, "black");
        border-radius: 8px;
        padding: 12px;
        box-sizing: border-box;
    }
}

.help{
    @include card();
    width: 60%;
    margin: 0 auto;
    padding: 24px;
	background: map-get($colors, "bg3");
    transition: map-get($transitions, "medium");
    &.valid{
	    background: #2be71a80;
        .help__next{
            background: #2be71a;
        }
    }
    &.notValid{
	    background: #e71a1a80;
        .help__next{
	        background: #e71a1a;
        }
    }
    &__formula{
    }
    &__next{
        border: 2px solid black;
        cursor: pointer;   
        margin: 12px;
        padding: 12px;     
        border-radius: 24px;
        transition: map-get($transitions, "medium");
    }
}
</style>