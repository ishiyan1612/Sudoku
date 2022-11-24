function start() {
    //window.addEventListener("keydown", handleKeydown);
    let vec_len = 0;
    row = new Array(9).fill(0); //y軸(たて)
    col = new Array(9).fill(0); //x軸（よこ）
    squ = new Array(9).fill(0); //正方形
    ans = new Array(9);
    for (let i = 0; i < state.length; i++) {
        ans[i] = state[i].slice(0, state[i].length); //配列のコピー
    }

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (state[i][j] != 0) {
                let d = (1 << (state[i][j] - 1));
                row[i] |= d;
                col[j] |= d;
                squ[calLen(j, i)] |= d;

            } else vec_len++;
        }
    }

    //alert("vec_len:" + vec_len);
    vec = new Array(vec_len);
    //alert("vec.length:" + vec.length);
    for (let i = 0; i < vec.length; i++) {
        vec[i] = new Array(3).fill(0);
    }
    let temp = ((1 << 9) - 1);//111111111
    //alert("temp:" + countBinary(temp));
    for (let i = 0; i < 9; i++) {          //確定している所を0にする
        row[i] = temp ^ row[i];
        col[i] = temp ^ col[i];
        squ[i] = temp ^ squ[i];
        //alert("squ[i]:" + countBinary(squ[i]) + "row[i]:" + countBinary(row[i]));
    }

    vec_len = 0;
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (state[i][j] == 0) {
                vec[vec_len][0] = j;
                vec[vec_len][1] = i;
                vec[vec_len][2] = countBinary((row[i] & col[j] & squ[calLen(j, i)]));
                //if (vec[vec_len][2] < 8) alert("i:" + i + ",j:" + j + "[vec_len][2]:" + vec[vec_len][2]);
                vec_len++;
            }
        }
    }

    let a = dfs(0);
    if (a == 1) {
        //
    } else {
        alert("error:解けません a:" + a);
        //InitMap();
    }

    return;
}

function dfs(p) {
    if (p == vec.length) {
        drawAns();
        return (1); //全て数字を入れ終わったら修了
    }

    let x = vec[p][0];
    let y = vec[p][1];
    let len = calLen(x, y);
    let binary = row[y] & col[x] & squ[len];
    if (binary == 0) return (0);

    //候補数が一番小さいものをvec[p]（現在地点）に持ってくる
    x = vec[vec.length - 1][0];
    y = vec[vec.length - 1][1];
    len = calLen(x, y);
    binary = row[y] & col[x] & squ[len];
    vec[vec.length - 1][2] = countBinary(binary);

    let flag = true;
    for (let i = vec.length - 2; i >= p && flag; i--) {
        let nx = vec[i][0];
        let ny = vec[i][1];
        let n_len = calLen(nx, ny);
        vec[i][2] = countBinary(row[ny] & col[nx] & squ[n_len]);
        if (vec[i][2] == 0) flag = false;
        else if (vec[i][2] > vec[i + 1][2]) {
            swapVec(i, i + 1);
        }
    }

    //残りの空きマスで置けないマスが出てきたら修了
    if (!flag) return (0);

    //候補数の中から遷移させる
    x = vec[p][0];
    y = vec[p][1];
    len = calLen(x, y);
    binary = row[y] & col[x] & squ[len];
    let pos = 0;
    for (let i = 1; i <= 9 && binary > 0 && pos == 0; i++) //pos == 0でどこかで答えが出たら遷移修了
    {
        //候補数のなかから遷移
        if ((binary & 0x01) == 1) {
            let temp = (1 << (i - 1));
            row[y] &= ~temp;     //0にする
            col[x] &= ~temp;
            squ[len] &= ~temp;
            ans[y][x] = i;      //ans[y][x]の値をiとする

            pos += dfs(p + 1); //遷移

            ans[y][x] = 0;     //遷移から戻ってきたら初期化
            row[y] |= temp;
            col[x] |= temp;
            squ[len] |= temp;
        }
        binary >>= 1;
    }
    return (pos);
}

function swapVec(a, b) {
    for (let i = 0; i < 3; i++) {
        let temp = vec[a][i];
        vec[a][i] = vec[b][i];
        vec[b][i] = temp;
    }
    return;
}


//2進数にしたときに1がいくつあるか
function countBinary(binary) {
    let count = 0;
    while (binary > 0) {
        if (binary & 0x01) count++;
        binary >>>= 1;
    }
    return count;
}

function calLen(x, y) {
    let temp1 = Math.trunc(y / 3) * 3;
    let temp2 = Math.trunc(x / 3);
    return (temp1 + temp2);
}

function drawAns() {
    ctx.clearRect(0, 0, 450, 450); //画面をクリア

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            ctx.beginPath(); //パスの初期化
            ctx.rect(j * 50, i * 50, 50, 50);    //四角形範囲
            ctx.fillStyle = 'white';
            ctx.strokeStyle = 'black';           //枠線の色
            ctx.lineWidth = 1;                   //枠線の幅
            ctx.fill();                          //塗りつぶし
            ctx.stroke();                        //枠線を引く

            //数字の描画

            ctx.font = '50px Times Roman';
            if(state[i][j] != 0) ctx.fillStyle = 'black';
            else ctx.fillStyle = 'blue';
            ctx.fillText(ans[i][j], j * 50 + 10, i * 50 + 45, 50);

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