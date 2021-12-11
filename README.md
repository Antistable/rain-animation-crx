# rain-animation-crx
 让网页下雨的Chrome插件。

效果预览：
![预览](https://user-images.githubusercontent.com/82582936/145665136-fc671d6e-02d1-460f-b970-d8415d0a6cd9.png)

popup.html预览：
![预览](https://user-images.githubusercontent.com/82582936/145665210-82d4a22b-0578-488d-995e-d812ad533e84.jpg)

你可以下载后通过**已解压的扩展程序**使用。

---

>你也可以将以下脚本加入你的网页中，让你的网页下起雨:D
 ```
 <script>
        dark = 0.3; //阴影暗度参数
        interval = 10; //雨滴间隔参数
        alpha = 0.5; //雨滴透明度参数
        class rainAnime {
            static div = document.createElement("div");
            constructor() {
                this.x = Math.random() * window.innerWidth - 100;
                this.y = -50;
                this.dom = document.createElement("div");
                this.dom.style.width = "2px";
                this.dom.style.height = Math.random() * 40 + 20 + "px";
                this.dom.style["background-color"] = `rgba(20,20,40,${alpha})`;
                this.dom.style.position = "absolute";
                this.dom.style.transform = "rotate(-20deg)";
                rainAnime.div.appendChild(this.dom);
                this.clock = setInterval(() => {
                    this.x += 9;
                    this.y += 25;
                    this.dom.style.left = this.x + "px";
                    this.dom.style.top = this.y + "px";
                    if (!this.isInViewPort) {
                        rainAnime.div.removeChild(this.dom);
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
                document.body.removeChild(rainAnime.div);
                btn.style["background-color"] = "red";
            }
            else {
                document.body.appendChild(rainAnime.div);
                btn.style["background-color"] = "green";
            }
            isOn = !isOn;
        });
        rainAnime.div.style.position = "fixed";
        rainAnime.div.style["background-image"] = `linear-gradient(rgba(20,20,20,${dark}), rgba(20,20,20,0))`;
        rainAnime.div.style["z-index"] = "9999999";
        rainAnime.div.style["pointer-events"] = "none";
        rainAnime.div.style.width = "100%";
        rainAnime.div.style.height = "300px";
        rainAnime.div.style.top = "0px";
        rainAnime.div.style.left = "0px";
        document.body.appendChild(rainAnime.div);
        setInterval(() => {
            new rainAnime();
        }, interval);
    </script>
```
