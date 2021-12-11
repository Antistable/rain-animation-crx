chrome.storage.local.get(["dark", "interval", "alpha"], function (items) {
    dark = items.dark || 0.3;
    interval = items.interval || 10;
    alpha = items.alpha || 0.5;
    document.getElementById("dark").value = dark;
    document.getElementById("interval").value = interval;
    document.getElementById("alpha").value = alpha;
    console.log(items);
    class rain {
        static div = document.createElement("div");
        constructor() {
            this.x = Math.random() * window.innerWidth - 50;
            this.y = -50;
            this.dom = document.createElement("div");
            this.dom.style.width = "2px";
            this.dom.style.height = Math.random() * 40 + 20 + "px";
            this.dom.style["background-color"] = `rgba(20,20,40,${alpha})`;
            this.dom.style.position = "absolute";
            this.dom.style.transform = "rotate(-20deg)";
            rain.div.appendChild(this.dom);
            this.clock = setInterval(() => {
                this.x += 9;
                this.y += 25;
                this.dom.style.left = this.x + "px";
                this.dom.style.top = this.y + "px";
                if (!this.isInViewPort) {
                    rain.div.removeChild(this.dom);
                    clearInterval(this.clock);
                }
            }, 20);
        }
        get isInViewPort() {
            return this.x < window.innerWidth - 30 && this.y < window.innerHeight - 40;
        }
    }
    var btnBg = document.createElement("div");
    btnBg.style.right = "0px";
    btnBg.style.bottom = "0px";
    btnBg.style.position = "fixed";
    btnBg.style.width = "50px";
    btnBg.style.height = "50px";
    btnBg.style["z-index"] = "9999999";
    btnBg.style["background-color"] = "black";
    btnBg.style.opacity = "0.5";
    document.body.appendChild(btnBg);
    var btn = document.createElement("div");
    var isOn = true;
    btn.style.right = "10px";
    btn.style.bottom = "10px";
    btn.style.position = "fixed";
    btn.style.width = "30px";
    btn.style.height = "30px";
    btn.style["z-index"] = "10000000";
    btn.style["background-color"] = "green";
    btnBg.appendChild(btn);
    btn.addEventListener("click", () => {
        if (isOn) {
            document.body.removeChild(rain.div);
            btn.style["background-color"] = "red";
        }
        else {
            document.body.appendChild(rain.div);
            btn.style["background-color"] = "green";
        }
        isOn = !isOn;
    });
    rain.div.style.position = "fixed";
    rain.div.style["background-image"] = `linear-gradient(rgba(20,20,20,${dark}), rgba(20,20,20,0))`;
    rain.div.style["z-index"] = "9999999";
    rain.div.style["pointer-events"] = "none";
    rain.div.style.width = "100%";
    rain.div.style.height = "300px";
    rain.div.style.top = "0px";
    rain.div.style.left = "0px";
    document.body.appendChild(rain.div);
    var rainGenerator = setInterval(() => {
        new rain();
    }, interval);

    document.getElementById("dark").addEventListener("change", () => {
        dark = document.getElementById("dark").value;
        rain.div.style["background-image"] = `linear-gradient(rgba(20,20,20,${dark}), rgba(20, 20, 20, 0))`;
    });
    document.getElementById("interval").addEventListener("change", () => {
        clearInterval(rainGenerator);
        interval = document.getElementById("interval").value;
        rainGenerator = setInterval(() => {
            new rain();
        }, interval);
    });
    document.getElementById("alpha").addEventListener("change", () => {
        alpha = document.getElementById("alpha").value;
    })
    document.getElementById("apply").addEventListener("click", () => {
        chrome.storage.local.set({ dark: dark, interval: interval, alpha: alpha }, function () {
            document.getElementById("apply").innerHTML = "<p>完成。刷新即可查看。</p>";
            setTimeout(() => {
                document.getElementById("apply").innerHTML = "<p>保存并应用</p>";
            }, 888);
        });
    })
});