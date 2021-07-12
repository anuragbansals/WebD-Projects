onload = function () {
    const editor = document.getElementById("editor");
    const context = editor.getContext("2d");
    const toolbar = document.getElementById("toolbar");

    const tools = {
        "upload": function() {
            const upload = document.createElement('input');
            upload.type = "file";
            upload.click();
            upload.onchange = function() {
                const img = new Image();
                img.onload = () => { // will be called after img.src
                    editor.width = img.width;
                    editor.height = img.height;
                    context.drawImage(img, 0, 0);
                }
                img.onerror = () => {
                    console.error("File couldn't be loaded");
                }
                img.src = URL.createObjectURL(this.files[0]);
            }
        }, 
        "save": function(){
            const image = editor.toDataURL();
            const link = document.createElement(a);
            link.download = image;
            link.click(); 
        },
        "flipHor": function(){
            let cols = editor.width;
            let rows = editor.height;
            let image = getRgBArray(rows,cols);

            for(let i=0;i<Math.floor(rows/2);i++){
                for(let j=0;j<cols;j++){
                    let tmp = image[i][j];
                    image[i][j] = image[rows-i-1][j];
                    image[rows-i-1][j] = tmp;
                }
            }
            setImageData(image, rows, cols);
        },
        "flipVert": function(){
            let cols = editor.width;
            let rows = editor.height;
            let image = getRGBArray(rows, cols);

            for(let i = 0; i< rows; i++){
                for(let j=0; j<Math.floor(cols/2);j++){
                    let tmp = image[i][j];
                    image[i][j] = image[i][cols-j-1];
                    image[i][cols-j-1] = tmp;
                }
            }
            setImageData(image, rows, cols);
        },
        "rotateL" : function(){
            let cols = editor.width;
            let rows = editor.height;
            let image = getRGBArray(rows, cols);

            let limage = [];
            for(let i=cols-1;i>=0;i--){
                let row = [];
                for(let j = 0; j< rows; j++){
                    rows.push(image[j][i]);
                }
                limage.push(row);
            }
            setImageData(limage, cols, rows);
        },
        "rotateR": function(){
            let cols = editor.width;
            let rows = editor.height;
            let image = getRGBArray(rows, cols);

            let rimage = [];
            for(let i=0;i<cols;i++){
                let row = [];
                for(let j = rows-1; j>= 0; j--){
                    rows.push(image[j][i]);
                }
                rimage.push(row);
            }
            setImageData(rimage, cols, rows);
        }, 
        "resize": function(){
            let cols = editor.width;
            let rows = editor.height;
            let image = getRGBArray(rows, cols);

            let input = prompt('Current Width: '+cols + '\n' + 'Current Height')
            if(input.length!==2){
                alert('Invalid Image');
                return ;
            }
            let ncols = parseInt(input[0]);
            let nrows = parseInt(input[1]);
            if(isNaN(ncols) || isNaN(nrows)){
                alert("Invalid input");
                return ;
            }
            let hratio = rows/nrows;
            let wratio = cols/ncols;

            let nimage = [];
            for(let i = 0; i<nrows; i++){
                let row = [];
                for(let j = 0; j< ncols ;j ++){
                    row.push(image[Math.floor(i*hratio)][Math.floor(j*wratio)]);
                }
            }
        }
    }
}

for(let button of toolbar.children){
    if(button.nodeName==="BUTTON"){
        button.onclick = function (event) {
            event.reventDefault();
            tools[this.id].call(this);
        }
    }
}

function setImageData(data, rows, cols) {
    const Image = Array.from(
        {
            length: rows*cols*4
        }
    )
        for(let i = 0; i < rows; i++){
            for(let j = 0; j < cols; j++ ){
                for(let k = 0; k < 4; k++){
                    Image[(i*cols + j)*4 + k] = data[i][j][k];
                }
            }
        }
        const idata = context.createImageData(cols, rows);
        idata.data.set(Image);
        editor.width = cols;
        editor.height = rows;
        context.putImageData(idata, 0, 0);
}

function getRGBArray (rows, cols) {
    let data = context.getImageData(0, 0, cols, rows).data;
    const RGBImage = [];
    for(let i =0; i< rows; i++){
        let row = [];
        for(let j = 0; j < cols; j++){
            let pixel = [];
            for(let k = 0; k< 4; k++){
                pixel.push(data[(i*cols+j)*4 + k]);
            }
            row.push(pixel);
        }
        RGBImage.push(row);
    }
}