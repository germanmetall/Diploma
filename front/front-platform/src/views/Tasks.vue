<template>
	<div class="page">
  		<Header></Header>
        <div class="main">

            <h1 class="heading heading--medium">{{name}}</h1>

            <div class="notations">
                <div class="notation__container" v-for="notation of notations" :key="notation">
                    <span class="notation__type">
                        {{notation.name}}
                    </span>
                    <div class="notation__dropdown" v-for="element of notation.elements" :key="element">
                        <div @click="insertNotation(element)" class="notation">{{element}}</div>
                    </div>
                </div>
            </div>

            <section class="question" v-if="questions">
                <div class="question__text heading heading--small">{{questions[index].attributes.Text}}</div>
                <div class="question__answer" contenteditable @input="check()"></div>
            </section>

            <div class="help" :class="{'valid': !match.error, 'notValid': match.error}" v-if="questions">
                <div class="help__formula">{{match.text}}</div>
                <div class="help__next heading heading--small" v-if="index < questions.length - 1" @click="next()">Дальше</div>
                <div class="help__next heading heading--small" v-if="index == questions.length - 1" @click="sendResults()">Отправить</div>
            </div>

        </div>
    </div>
</template>

<script>
class MathNotation{

    splitByOperations(){
        return this.str.split(/\+|\-|\*|\//);
    }

    isConst(){
        let regex = /(^PI$)|(^E$)|(^PHI$)/g;
        let splittedStr = this.splitByOperations();
        let res = [];
        splittedStr.forEach(el => {
            let strWithoutParentheses = el.replace(/\(|\)/,"");
            res.push(regex.test(strWithoutParentheses));
        });
        return res;
    }

    isVariable(){
        let regex = /(^x$)|(^y$)|(^z$)/g;
        let splittedStr = this.splitByOperations();
        let res = [];
        splittedStr.forEach(el => {
            let strWithoutParentheses = el.replace(/\(|\)/,"");
            res.push(regex.test(strWithoutParentheses));
        });
        return res;
    }

    isNumber(){
        let regex= /^\d+$/;
        let splittedStr = this.splitByOperations();
        let res = [];
        splittedStr.forEach(el => {
            let strWithoutParentheses = el.replace(/\(|\)/,"");
            res.push(regex.test(strWithoutParentheses));
        });
        return res;
    }

    isFunc(){
        // TODO
        let regex= /ajwpidoapdadipwajiodawjkd/;
        let splittedStr = this.splitByOperations();
        let res = [];
        splittedStr.forEach(el => {
            let strWithoutParentheses = el.replace(/\(|\)/,"");
            res.push(regex.test(strWithoutParentheses));
        });
        return res;
    }

    isTrigonometric(){
        // TODO
        let regex= /ajwpidoapdadipwajiodawjkd/;
        let splittedStr = this.splitByOperations();
        let res = [];
        splittedStr.forEach(el => {
            let strWithoutParentheses = el.replace(/\(|\)/,"");
            res.push(regex.test(strWithoutParentheses));
        });
        return res;
    }

    doesParenthesesMatch(){
        let counter = 0;
        for(let i=0; i<this.str.length; i++){
            if(this.str[i]=="(") counter++;
            else if(this.str[i]==")") counter--;
            console.log(counter);

            // if counter is < 0 - it is already invalid
            if(counter < 0) return false;
        }
        return counter==0;
    }

    check(str){
        this.str = str;
        if(!this.doesParenthesesMatch()) return {
            error: true,
            text: "Несоответствие скобок!"
        };

        let numOfParts = this.splitByOperations().length;

        let validityArray =  [
            this.isConst(),
            this.isVariable(), 
            this.isNumber(),
            this.isFunc(),
            this.isTrigonometric()
        ];

        console.log(validityArray);

        for(let i=0; i<numOfParts; i++){
            let isPartlyValid = false;
            for(let j=0; j<validityArray.length; j++){
                if(validityArray[j][i]) {
                    isPartlyValid = true;
                    break;
                }
            }
            if(!isPartlyValid)  return {
                error: true,
                text: "Ошибка в записи!"
            }
        }
        return {
            error: false,
            text: "Всё в порядке"
        }
    }

    static exportNotations(){
        return {};
    }
}
import Header from "@/components/Header.vue";
export default {
    name: 'Tasks',
	data: function() {
		return {
            courseId: this.$route.params.courseId,
            id: this.$route.params.id,
			notations: [
                {
                    name: "Переменные",
                    elements: ["x", "y", "z"]
                },
                {
                    name: "Константы",
                    elements: ["PI", "E", "PHI"]
                }
                // TODO add more
            ],
            match: {
                error: true,
                text: "Заполните поле!"
            },
            index: 0,
            questions: undefined,
            name: undefined,
            mathNotation: new MathNotation()
		};
	},
    components: {
        Header
    },
    methods: {
        next(){
            if(this.match) {
                // TODO save data to localStorage
                document.querySelector(".question__answer").innerHTML = "";
                this.index++;
            }
            else alert("Запись неправильная");
        },
        check(){
            let str = document.querySelector(".question__answer").innerHTML;
            console.log(str);
            let res = this.mathNotation.check(str);
            console.log(res);
            this.match = res;
        },
        insertNotation(text){
            console.log(text);
            document.querySelector(".question__answer").innerHTML += text;
            this.check();
        },
        sendResults(){
            // TODO send results from localhost to server and return to course page
        }
    },
	mounted: async function() {
		let resp = await this.$options.API.data().Tasks.getById(this.id);
		let body = await resp.json();
        console.log(body);
        this.name = body.data.attributes.Name;
        this.questions = body.data.attributes.platform_tasks.data;
    }
}
</script>

<style lang="scss">
@import "../../../styles/global.scss";
.notations{
    display: flex;
    flex-direction: row;
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
        display: flex;
        flex-direction: column;
        position: relative;
        margin: 12px;
        &:hover{
            .notation__dropdown{
                display: block;
            }
        }
    }
    &__type{
        padding: 12px;
        border: 2px solid #000;
        background: #fff;
        border-radius: 4px;
        cursor: pointer;
    }
    &__dropdown{
        display: none;
        background: #fff;
        cursor: pointer;
    }
}

.question{
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin: 24px;
    padding: 24px;
	background: map-get($colors, "bg1");
	border-radius: 24px;
    &__name{}
    &__answer{
        text-align: left;
        font-size: 1.25rem;
        width: 100%;
        border: 2px solid map-get($colors, "black");
        border-radius: 24px;
        padding: 12px;
    }
}

.help{
    width: 60%;
    margin: 0 auto;
    border-radius: 24px;
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