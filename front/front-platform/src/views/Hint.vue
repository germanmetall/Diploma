<template>
	<div class="page">
        <div class="main">
            <div class="hint">
                <h1>Справка</h1>
                <span class="hint__text">
                    В заданиях необходимо дать ответ, который является математическим объектом. Для вашего удобства компьютер самостоятельно при вводе определяет, корректна ли ваша запись.
                </span>
                <span class="hint__text">
                    Вы можете вводить такие числа:
                    <ul>
                        <li>Целые: 1, 2, 10521</li>
                        <li>Дробные: 1.2, 3.1412512</li>
                        <li>Отрицательные: -5, -12301231</li>
                        <li>Рациональные: 8/3</li>
                        <li>Или всё вместе: -5.18/3</li>
                    </ul>
                </span>
                <span class="hint__text">
                    Вы можете вводить переменные:
                    <ul>
                        <li>x</li>
                        <li>y</li>
                        <li>z</li>
                        <li>или любую другую, как "quantity"</li>
                    </ul>
                    Вам доступны константные значения:
                    <ul>
                        <li>pi - число пи</li>
                        <li>e - число Эйлера</li>
                        <li>phi - золотое сечение</li>
                        <li>или некоторые другие</li>
                    </ul>
                </span>
                <span class="hint__text">
                    Вы можете также использовать объекты алгебры:
                    <br/>
                    <br/>
                    <b>Формула логарифма:</b> 
                    <i>log(число; основание)</i>, например: log(8; 2) - логарифм 8 по основанию 2
                    <br/>
                    <br/>
                    <b>Формулы действий с рядом:</b>
                    <ul>
                        <li>S(выражение; нижняя граница; верхняя граница) для суммы</li>
                        <li>P(выражение; нижняя граница; верхняя граница) для произведения ряда</li>
                    </ul>
                    <br/>
                    <b>Прочее:</b>
                    В качестве бесконечности используйте запись Infinity и -Infinity для "минус бесконечности"
                </span>
                <span class="hint__text">
                    Вы можете также использовать функции тригонометрии:
                    <ul>
                        <li>Синус - sin()</li>
                        <li>Косинус - cos()</li>
                        <li>Тангенс - tan()</li>
                        <li>Котангенс - cot()</li>
                    </ul>
                    Формулы тригонометрии:
                    <br/> 
                    sin(угол) <i>для радиан</i>, например sin(45)
                    <br/> 
                    sin(угол deg) <i>для градусов</i>, например sin(45 deg)
                </span>
                <span class="hint__text">
                    Предполагается, что это - самые частые варианты набора, однако существуют и другие объекты. Для дальнейшего изучения: <a href="https://mathjs.org/docs/index.html" target="blank_">math.js</a>
                </span>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    name: 'Hint'
}
</script>

<style lang="scss">
@import "../../../styles/global.scss";
.hint{
    text-align: start;
    font-size: 24px;
    &__text{
        display: block;
        margin: 6px 0;
        &::first-letter{
            margin-left: -48px;
        }
    }
}
ul{
    width: fit-content;
}
</style>