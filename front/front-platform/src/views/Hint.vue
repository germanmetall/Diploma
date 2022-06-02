<template>
	<div class="page">
        <div class="main">
            <div class="hint">
                <h1>Довідка</h1>
                <span class="hint__text">
                    Для питань необхідно дати відповідь, яка є математичним об'єктом. Для вашого комфорту комп'ютер самостійно при написанні відповіді з'ясовує, чи коректен ваш запис.
                </span>
                <span class="hint__text">
                    Ви можете вводити наступні категорії чисел:
                    <ul>
                        <li>Цілі: 1, 2, 10521</li>
                        <li>Дійсні: 1.2, 3.1412512</li>
                        <li>Від'ємні: -5, -12301231</li>
                        <li>Раціональні: 8/3</li>
                        <li>Або ж "всі в одному": -5.18/3</li>
                    </ul>
                </span>
                <span class="hint__text">
                    Ви можете вводити змінні:
                    <ul>
                        <li>x</li>
                        <li>y</li>
                        <li>z</li>
                        <li>або ж будь-яку інші, як "quantity"</li>
                    </ul>
                    Ви можете вводити константи:
                    <ul>
                        <li>pi - число пі</li>
                        <li>e - число Ейлера</li>
                        <li>phi - золотий перетин</li>
                        <li>чи деякі інші</li>
                    </ul>
                </span>
                <span class="hint__text">
                    Вы можете також використовувати об'єкти алгебри:
                    <br/>
                    <br/>
                    <b>Формула логарифму:</b> 
                    <i>log(число; база)</i>, наприклад: log(8; 2) - логарифм 8 по базі 2
                    <br/>
                    <br/>
                    <b>Формули дій з рядом:</b>
                    <ul>
                        <li>S(вираз; нижня границя; верхня границя) для суми</li>
                        <li>P(вираз; нижня границя; верхня границя) для множення</li>
                    </ul>
                    <br/>
                    <b>Інше:</b>
                    В якості нескінченності використовуйте записи Infinity та -Infinity для "мінус нескінченності"
                </span>
                <span class="hint__text">
                    Вы можете також використовувати функції тригонометрії:
                    <ul>
                        <li>Синус - sin()</li>
                        <li>Косинус - cos()</li>
                        <li>Тангенс - tan()</li>
                        <li>Котангенс - cot()</li>
                    </ul>
                    Формулы тригонометрії:
                    <br/> 
                    sin(вугол) <i>для радіанів</i>, наприклад sin(45)
                    <br/> 
                    sin(вугол deg) <i>для градусів</i>, наприклад sin(45 deg)
                </span>
                <span class="hint__text">
                    Це - найчастіш вживані варіанти наборів, однак існують і інші об'єкти. Для поглибленого вивчення: <a href="https://mathjs.org/docs/index.html" target="blank_">math.js</a>
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
    background: transparentize(map-get($colors, "bg1"), .3);
    border-radius: 48px;
    padding: 12px 48px;
    &__text{
        display: block;
        margin: 6px 0;
        &::first-letter{
            margin-left: 48px;
        }
    }
}
ul{
    width: fit-content;
}
</style>