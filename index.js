function draw() {
    var canvas = document.getElementById('canvas');

    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        canvas.width = document.documentElement.clientWidth;
        canvas.height = document.documentElement.clientHeight;

        let flag = false;
        let m = {};
        ctx.strokeStyle = 'rgb(124, 138, 112)';
        ctx.lineWidth = 10;
        //lineCap修复线条的层次不齐的感觉
        ctx.lineCap = "round";
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            canvas.ontouchstart = (e) => {
                if (!flag) {
                    flag = true;
                    console.log(e.touches[0].clientX, e.touches[0].clientY);
                    m.x = e.touches[0].clientX;
                    m.y = e.touches[0].clientY;
                }
            }
            canvas.ontouchmove = (e) => {
                if (flag) {
                    ctx.beginPath();
                    ctx.moveTo(m.x, m.y);
                    ctx.lineTo(e.touches[0].clientX, e.touches[0].clientY);
                    ctx.stroke();
                    m.x = e.touches[0].clientX;
                    m.y = e.touches[0].clientY;
                }
            }
            canvas.ontouchend = () => {
                if (flag) {
                    flag = false;
                }
            }
        }

        else {
            canvas.onmousedown = (e) => {
                if (!flag) {
                    flag = true;
                    m.x = e.clientX;
                    m.y = e.clientY;
                }

            }
            canvas.onmousemove = (e) => {

                if (flag) {
                    ctx.beginPath();
                    ctx.moveTo(m.x, m.y);
                    ctx.lineTo(e.clientX, e.clientY);
                    ctx.stroke();
                    ctx.fill();
                    m.x = e.clientX;
                    m.y = e.clientY;
                }
            }
            canvas.onmouseup = () => {
                if (flag) {
                    flag = false;
                }
            }

        }
    }
}