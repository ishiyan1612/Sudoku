state = new Array(9);
select_x = select_y = 500;

function InitMap() {
    canvas = document.getElementById('area');
    if (canvas.getContext) {
        ctx = canvas.getContext('2d');
    }

    for (let i = 0; i < state.length; i++) {
        state[i] = new Array(9).fill(0);
    }

    drawMap();
    window.addEventListener("DOMContentLoaded", handleMouth);
    return;

}

function drawMap() {

    ctx.clearRect(0, 0, 450, 450); //画面をクリア

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            ctx.beginPath(); //パスの初期化
            ctx.rect(j * 50, i * 50, 50, 50);    //四角形範囲
            if (select_x >= (j * 50) && select_x < ((j + 1) * 50)
                && select_y >= (i * 50) && select_y < ((i + 1) * 50)) ctx.fillStyle = 'yellow';             //塗りつぶす色
            else ctx.fillStyle = 'white';
            ctx.strokeStyle = 'black';           //枠線の色
            ctx.lineWidth = 1;                   //枠線の幅
            ctx.fill();                          //塗りつぶし
            ctx.stroke();                        //枠線を引く

            //数字の描画
            if(state[i][j] != 0){
                ctx.font = '50px Times Roman';
                ctx.fillStyle = 'black';
                ctx.fillText(state[i][j] , j*50+10, i*50+45, 50);
            }
        }
    }
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            ctx.beginPath(); //パスの初期化
            ctx.rect(j * 150, i * 150, 150, 150);    //四角形範囲
            //ctx.fillStyle = 'white';             //塗りつぶす色
            ctx.strokeStyle = 'black';           //枠線の色
            ctx.lineWidth = 3;                   //枠線の幅
            //ctx.fill();                          //塗りつぶし
            ctx.stroke();                        //枠線を引く
        }
    }

    return;
}

function writeNumber(number){
    if(select_x == 500 && select_y == 500) return;

    //alert("X:" + Math.trunc(select_x/50) + "Y:" + Math.trunc(select_y/50));
    let x = Math.trunc(select_x/50);
    let y = Math.trunc(select_y/50);
    state[y][x] = number;
    /*
    ctx.font = '50px Times Roman';
    ctx.fillStyle = 'black';
    ctx.fillText(number , x*50+10, y*50+45, 50);
    */
    select_x = select_y = 500;

    drawMap();
    return;
}

function eraseNumber(){
    if(select_x == 500 && select_y == 500) return;

    //alert("X:" + Math.trunc(select_x/50) + "Y:" + Math.trunc(select_y/50));
    let x = Math.trunc(select_x/50);
    let y = Math.trunc(select_y/50);
    state[y][x] = 0;
    select_x = select_y = 500;

    drawMap();
    return;
}

function clearNumber(){
    //alert("X:" + Math.trunc(select_x/50) + "Y:" + Math.trunc(select_y/50));
    for(let i = 0;i < state.length;i++){
        state[i].fill(0);
    }

    drawMap();
    return;
}
