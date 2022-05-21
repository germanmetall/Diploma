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

            <div class="hint">
                    <span class="hint__text">
                        <i>Для дробей используйте точку (3.14159) или косую линию (8/3)</i>
                    </span>
                    <span class="hint__text" v-if="match.log">
                        Формула логарифма: <i>log(число; основание)</i>, например: log(8; 2) - логарифм 8 по основанию 2
                    </span>
                    <span class="hint__text" v-if="match.series">
                        Формулы действий с рядом: 
                        <br/>
                        S(выражение; нижняя граница; верхняя граница) для суммы,
                        <br/>
                        P(выражение; нижняя граница; верхняя граница) для произведения ряда
                        <br/>
                        В качестве бесконечности используйте запись Inf и -Inf для "минус бесконечности"
                    </span>
                    <span class="hint__text" v-if="match.trigonometry">
                        Формулы тригонометрии:
                        <br/> 
                        sin(угол) <i>для радиан</i>, например sin(45)
                        <br/> 
                        sin(угол deg) <i>для градусов</i>, например sin(45 deg)
                    </span>
                </div>

        </div>
    </div>
</template>

<script>
class MathNotation{
    isMathObject(str){
        console.warn(str, this.isConst(str) , this.isVariable(str) , this.isNumber(str) , this.isFunc(str) , this.isTrigonometric(str));
        return (this.isConst(str) || this.isVariable(str) || this.isNumber(str) || this.isFunc(str) || this.isTrigonometric(str)) && this.doesParenthesesMatch(str);
    }

    splitByOperations(str){
        return str.split(/\+|\-(?=\D)|\*|\/|\^/);
    }

    clearStr(str){
        // remove parentheses () and whitespaces
        //return str.replace(/\(/,"").replace(/\)/, "").replace(/\s/g, "");
        // remove whitespaces only
        return str.replace(/\s/g, "");
    }

    isConst(str){
        str = this.clearStr(str);
        let regex = /^(PI)|(E)|(PHI)$/g;
        return regex.test(str);
    }

    isVariable(str){
        str = this.clearStr(str);
        let regex = /^(x)|(y)|(z)$/g;
        return regex.test(str);
    }

    isNumber(str){
        str = this.clearStr(str);
        let regex= /^-{0,1}[0-9]+(\.[0-9]+){0,1}$/;
        return regex.test(str);
    }

    isFunc(str){
        // can be log(a1;a2) or S(a1;a2;a3) or P(a1;a2;a3)
        str = this.clearStr(str);
        let splitArr = str.split(";"),
            a1,
            a2;

        let hasEmptyStr = false;
        splitArr.map(el => {if( this.clearStr(el)==="") hasEmptyStr = true;})
        if(hasEmptyStr) return false;

        // is log
        if(splitArr[0].startsWith("log(") && splitArr[splitArr.length-1].endsWith(")")){
            if(splitArr.length < 2) return false;
        
            if(splitArr.length > 2){
                // log(
                splitArr[0] = splitArr[0].slice(4);
                // )
                splitArr[splitArr.length-1] = splitArr[splitArr.length-1].slice(0,-1);
                let prevCompoundStr = "";
                for(let i=0; i<splitArr.length-1; i++){
                    prevCompoundStr += splitArr[i];
                    if(this.isFunc(prevCompoundStr)){
                        a1 = prevCompoundStr;
                        a2 = "";
                        for(let j=i+1; j<splitArr.length; j++){
                            a2 += splitArr[j];
                        }
                        return (this.isMathObject(a1) && this.isMathObject(a2));
                    }
                }
                return false;
            }
            else{
                // log(
                splitArr[0] = splitArr[0].slice(4);
                // )
                splitArr[splitArr.length-1] = splitArr[splitArr.length-1].slice(0,-1);
                a1 = splitArr[0];
                a2 = splitArr[1];
                return (this.isMathObject(a1) && this.isMathObject(a2));
            }
        }
        // is Sum or Production of sequence
        else if((splitArr[0].startsWith("P(") || splitArr[0].startsWith("S(")) && splitArr[splitArr.length-1].endsWith(")")) {
            let a3;
            if(splitArr.length < 3) return false;
        
            if(splitArr.length > 3){
                // P( or S(
                splitArr[0] = splitArr[0].slice(2);
                // )
                splitArr[splitArr.length-1] = splitArr[splitArr.length-1].slice(0,-1);

                let prevCompoundStr1 = "",
                    prevCompoundStr2 = "";
                for(let i=0; i<splitArr.length-2; i++){
                    prevCompoundStr1 += splitArr[i];
                    if(this.isFunc(prevCompoundStr1)){
                        a1 = prevCompoundStr1;
                        for(let j=i+1; j<splitArr.length-1; j++){
                            prevCompoundStr2 += splitArr[j];
                            if(this.isFunc(prevCompoundStr2)){
                                a2 = prevCompoundStr2;
                                a3 = "";
                                for(let k=j+1; k<splitArr.length; j++){
                                    a3 += splitArr[k];
                                }
                                return (this.isMathObject(a1) && this.isMathObject(a2) && this.isMathObject(a3));
                            }
                        }
                    }
                }
                return false;
            }
            else{
                console.error("ok");
                // P( or S(
                splitArr[0] = splitArr[0].slice(2);
                // )
                splitArr[splitArr.length-1] = splitArr[splitArr.length-1].slice(0,-1);
                a1 = splitArr[0];
                a2 = splitArr[1];
                a3 = splitArr[2];
                return (this.isMathObject(a1) && this.isMathObject(a2) && this.isMathObject(a3));
            }
        }
        else return false;
    }

    isTrigonometric(str){
        str = this.clearStr(str);

        if(str!=="" && (str.startsWith("sin(") || str.startsWith("cos(") || str.startsWith("tg(") || str.startsWith("ctg(") || str.startsWith("arcsin(") || str.startsWith("arccos(") || str.startsWith("arctg(") || str.startsWith("arcctg(")) && str.endsWith(")")){
            let arg;
            if(str.endsWith("deg)")) arg = str.slice(str.indexOf("(")+1, -4);
            else arg = str.slice(str.indexOf("(")+1, -1);
            return this.isMathObject(arg);
        }
        else return false;
    }

    doesParenthesesMatch(str){
        let counter = 0;
        for(let i=0; i<str.length; i++){
            if(str[i]=="(") counter++;
            else if(str[i]==")") counter--;

            // if counter is < 0 - it is already invalid
            if(counter < 0) return false;
        }
        return counter==0;
    }

    check(str){
        if(str==="") return {
            error: true,
            text: "Пустая строка!"
        }
        if(str.indexOf(",")!==-1) return {
            error: true,
            text: "Неправильный символ (',')!"
        }
        if(!this.doesParenthesesMatch(str)) return {
            error: true,
            text: "Несоответствие скобок!"
        }

        let splitStr = this.splitByOperations(str);

        let prevStr = "";
        let startFocus = -1;
        for(let i=0; i<splitStr.length; i++){
            if(splitStr==="") return {
                error: true,
                text: "Ошибка в записи!"
            }
            else if(prevStr!=="" && this.doesParenthesesMatch(str.slice(str.indexOf(prevStr), str.indexOf(splitStr[i])+splitStr[i].length))){
                splitStr[startFocus] = prevStr+splitStr[i];
                splitStr.splice(startFocus+1, i-startFocus);
                startFocus = -1;
                prevStr = "";
            }
            else if(!this.doesParenthesesMatch(splitStr[i])){
                if(prevStr==="") prevStr += splitStr[i];
                else prevStr = str.slice(str.indexOf(prevStr), str.indexOf(splitStr[i])+splitStr[i].length);
                if(startFocus==-1) startFocus = i;
            }
        }

        if(prevStr!=="" || startFocus!==-1) return {
            error: true,
            text: "Ошибка в записи!"
        }

        for(let i=0; i<splitStr.length; i++){
            if(!this.isMathObject(splitStr[i])) return {
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
                text: "Заполните поле!",
                log: false,
                series: false,
                trigonometry: false
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
            let res = this.mathNotation.check(str);
            this.match = res;
        },
        insertNotation(text){
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


        let strMatch = new MathNotation();
        let validStrArray = [
            "1",
            "3.145",
            "-5.23",
            "PI",
            "E",
            "PHI",
            "x",
            "y",
            "z",
            "log(1;2)",
            "S(x;2;3)",
            "P(y;PI;E)",
            "sin(45)",
            "sin(45 deg)",
            "sin(45deg)",
            "cos(45)",
            "tg(45)",
            "ctg(45)",
            "arcsin(45)",
            "arccos(45)",
            "arctg(45)",
            "arcctg(30)",
            "log(S(x;2;3);5)",
            "log(S(x;2;3);P(y;PI;E))",
            "1 + 2.14 - PI * -6.217 / log(S(x;2;3);5) ^ arcsin(45)",
            "(2 + (-5) * ((log(2;3))))",
            "3 +               2"
        ];
        let invalidStrArray = [
            "",
            "1 + ",
            "3,15",
            "- 2",
            "* 3 / 4",
            "pi + 3",
            "^5",
            "((5)",
            "(-3))",
            "log(1;)",
            "log(;2)",
            "P(1;2)",
            "S(;3;2)",
            "sin()",
            "log 3;4"
        ];

        console.warn("Valid strings");
        validStrArray.forEach(el => {
            console.log(el)
            console.log(strMatch.check(el));
        });

        console.warn("Invalid strings");
        invalidStrArray.forEach(el => {
            console.log(el)
            console.log(strMatch.check(el));
        });
    }
}
</script>

<style lang="scss">
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

.hint{
    padding: 24px;
    &__text{
        display: inline-block;
        margin: .5rem 0;
    }
}
</style>