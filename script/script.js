let iconBars = document.querySelector("header .container nav .list"),
iconClose = document.querySelector("header .container nav .pars .close"),
iconSetting = document.querySelector("header .container nav .setting i"),
ulList = document.querySelector("header .container nav ul"),
homeSection = document.querySelector(".home"),
listSetting = document.querySelector("header .container .list-setting"),
currentIndex = 1,
countInterval,
mostProfitable = document.querySelector(".most-profitable"),
started = false,
height = document.documentElement.scrollHeight - document.documentElement.clientHeight,
headerScroll = document.querySelector("header .scroll");
if(localStorage.key("") !== "root_color") {
    document.documentElement.style.setProperty("--main-color" , "#09c8ee");
}
else {
    document.documentElement.style.setProperty("--main-color" , localStorage.root_color);
}
iconBars.onclick = () => {
    ulList.classList.add("open");
    setTimeout( () => {
        iconClose.classList.add("active")
        iconClose.style.opacity = '.5'
        iconClose.style.scale = '.5'
        setTimeout( () => {
            iconClose.style.scale = '1'
            iconClose.style.opacity = '1'
        },40)
    },250)
}
iconClose.onclick = () => {
    ulList.classList.remove("open");
    iconClose.classList.remove("active");
}
function backgroundInterval() {
    countInterval = setInterval( _ => {
        currentIndex++
        homeSection.style.cssText = `
        background-image: linear-gradient(#000000ce,#000000ce),url(imges/banner-0${currentIndex}.jpg);
        `
        if(currentIndex == 7) {
            currentIndex = 1
        }
    },6000)
}
backgroundInterval();
iconSetting.onclick = () => {
    iconSetting.classList.toggle("active");
    listSetting.classList.toggle("active");
}
document.querySelectorAll("header .container .list-setting .colors span").forEach( span => {
    span.onclick = function() {
        document.querySelectorAll("header .container .list-setting .colors span").forEach( e => {
            e.classList.remove("active");
        })
        this.classList.add("active");
        localStorage.setItem("root_color" , this.dataset.color);
        document.documentElement.style.setProperty("--main-color" , this.dataset.color);
    }
});
document.querySelectorAll("header .container .list-setting .colors button").forEach( btn => {
    btn.onclick = function() {
        document.querySelectorAll("header .container .list-setting .colors button").forEach( e => {
            e.classList.remove("active");
        })
        this.classList.add("active");
        if(this.dataset.back == 'No') {
            clearInterval(countInterval)
        }
        else {
            backgroundInterval()
        }
        document.querySelectorAll("header .container .list-setting .colors img").forEach( e => {
            e.classList.remove("active");
        })
    }
});
document.querySelectorAll("header .container .list-setting .colors img").forEach( img => {
    img.onclick = function() {
        clearInterval(countInterval);
        document.querySelectorAll("header .container .list-setting .colors img").forEach( e => {
            e.classList.remove("active");
        })
        this.classList.add("active");
        homeSection.style.cssText = `
        background-image: linear-gradient(#000000ce,#000000ce),url(${this.src});
        `
    }
});
document.querySelector("header .container .list-setting .colors #reset").onclick = () => {
    document.documentElement.style.setProperty("--main-color" , "#09c8ee");
    backgroundInterval()
    localStorage.clear()
}
document.querySelector("header .container .list-setting .colors #close").onclick = () => {
    window.close()
}
document.querySelectorAll(".product .container .ul-filter ul li").forEach( li => {
    li.onclick = function () {
        document.querySelectorAll(".product .container .ul-filter ul li").forEach( li => {
            li.classList.remove("active");
        })
        this.classList.add("active")
        document.querySelectorAll(".product .container .product .all").forEach ( card => {
            card.style.display = 'none';
        })
        setTimeout( _ => {
            document.querySelectorAll(this.dataset.filter).forEach( e => {
                e.style.scale = '.1';
                e.style.filter = 'blur(10px)';
                e.style.display = 'flex';
                setTimeout( _ => {
                    e.style.filter = 'blur(0px)';
                    e.style.scale = '1';
                }, 30);
            })
        },5)
    }
})
window.onscroll = () => {
    if(scrollY >= mostProfitable.offsetTop - 400) {
        if(!started) {
            document.querySelectorAll(".most-profitable .container .content .bar div span").forEach( span => startWidth(span))
        }
        started = true;
    }
    let scrollTop = document.documentElement.scrollTop;
    document.documentElement.style.setProperty("--header-width" , `${scrollTop / height * 100}%`)
}
function startWidth ( el ) {
    el.style.width = el.dataset.width;
}
document.querySelectorAll("header .container nav ul li").forEach( li => {
    li.onclick = function () {
        document.querySelectorAll("header .container nav ul li").forEach( e => {
            e.classList.remove("active");
        })
        this.classList.add("active");
        document.querySelector(this.dataset.section).scrollIntoView({behavior:"smooth"})
    }
})