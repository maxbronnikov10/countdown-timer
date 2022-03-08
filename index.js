changeTime();
setInterval(changeTime, 1000);

function setDegrees(inner, degrees) {
    if (degrees) {
        inner.style.transform = `rotateX(${+degrees + 180}deg)`;
    } else {
        inner.style.transform = `rotateX(${180}deg)`;
    }
}

function changeTime() {
    const time = Date.parse(new Date()) - Date.parse("2021-04-19 23:38");
    const date = {
        "years": Math.floor(time / (1000 * 60 * 60 * 24 * 30 * 12)),
        "months": Math.floor((time / (1000 * 60 * 60 * 24 * 30)) % 12),
        'days': Math.floor((time / (1000 * 60 * 60 * 24)) % 30),
        'hours': Math.floor((time / (1000 * 60 * 60)) % 24),
        'minutes': Math.floor((time / 1000 / 60) % 60),
        'seconds': Math.floor((time / 1000) % 60)
    };
    Object.keys(date).forEach(e => {
        const item = document.querySelector(`.card-${e}`);
        const inners = item.querySelectorAll(".card-inner");
        const temp = inners[0].querySelector("[data-change]").innerHTML + inners[1].querySelector("[data-change]").innerHTML;

        const stringDate = date[e].toString(),
            chars = [];
        chars[0] = stringDate.length == 1 ? "0" : stringDate[0];
        chars[1] = stringDate.length == 1 ? stringDate[0] : stringDate[1];

        let tempChar = "";
        if (+temp !== date[e]) {
            inners.forEach((elem, index) => {
                tempChar = elem.querySelector("[data-change]").innerHTML;
                if (tempChar != chars[index]) {
                    const classList = elem.querySelector("[data-change]").classList;
                    delete elem.querySelector("[data-change]").dataset.change;
                    if (classList.contains("card-first")) {
                        elem.querySelector(".card-second").innerHTML = chars[index];
                        elem.querySelector(".card-second").dataset.change = "";
                    } else {
                        elem.querySelector(".card-first").innerHTML = chars[index];
                        elem.querySelector(".card-first").dataset.change = "";
                    }
                    setDegrees(elem, elem.style.transform.split('(')[1]?.split(')')[0].replace("deg", ""));
                }
            });
        }
    })
}