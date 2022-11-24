function handleMouth(e) {

    canvas.addEventListener("click", e => {
        let rect = e.target.getBoundingClientRect();

        // ブラウザ上での座標を求める
        let viewX = e.clientX - rect.left,
            viewY = e.clientY - rect.top;

        //alert("X" + viewX + "Y" + viewY);
        // 表示サイズとキャンバスの実サイズの比率を求める
        let scaleWidth = canvas.clientWidth / canvas.width,
            scaleHeight = canvas.clientHeight / canvas.height;

        // ブラウザ上でのクリック座標をキャンバス上に変換
        select_x = Math.floor(viewX / scaleWidth),
            select_y = Math.floor(viewY / scaleHeight);

        //alert("X" + select_x + "Y" + select_y);
        drawMap();

    });

}