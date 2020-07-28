const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let img = new Image();
let fileName = '';

const uploadImg = document.getElementById('upload-img')
const applyBtn = document.getElementById('apply-btn')
const downloadBtn = document.getElementById('download-btn');
const resetBtn = document.getElementById('reset-btn');

const imgText = document.getElementById('imgText');
const authName = document.getElementById("authorName");


let draw = 1;

function wrapText(context, text, x, y, maxWidth, lineHeight) {
    var words = text.split(' ');
    var line = '';

    for (var n = 0; n < words.length; n++) {
        var testLine = line + words[n] + ' ';
        var metrics = context.measureText(testLine);
        var testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
            context.fillText(line, x, y);
            line = words[n] + ' ';
            y += lineHeight;
        } else {
            line = testLine;
        }
    }
    context.fillText(line, x, y);
}


function drawTemplate() {
    img = new Image();
    img.src = "images/imagebg.jpg";
    quote = new Image();
    quote.src = "images/quote.png";
    img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height + 1250;
        ctx.drawImage(img, 0, 0, img.width, img.height);
        // var grd = ctx.createLinearGradient(0, 0, canvas.width, 0);
        // grd.addColorStop(0, 'rgb(0,0,0, 0.8)');
        // grd.addColorStop(1, 'rgb(0,0,0, 0.8)');
        ctx.strokeStyle = "white";
        ctx.lineWidth = 10;
        ctx.beginPath();
        ctx.arc(700, 1200, 600, 0, 6.28, false);
        ctx.stroke();
        ctx.closePath();
        ctx.fillStyle = 'rgb(0,0,0)';
        ctx.fillRect(0, canvas.height - (canvas.height / 2.7), canvas.width, canvas.height / 2.7);
        ctx.font = '250px Chunkfive';

        ctx.textBaseline = 'Top';
        // ctx.fillText('Bushra Hasan endorses Solomon Rajput', 50, canvas.height / 1.6);

        ctx.fillStyle = "rgb(66,116,189)";
        ctx.fillRect(0, canvas.height / 1.9, canvas.width, 175);
        ctx.fillRect(0, canvas.height / 1.65, 3300, 175);
        ctx.font = '250px Chunkfive';
        ctx.fillStyle = "white";
        wrapText(ctx, 'endorses Solomon Rajput', 50, canvas.height / 1.56, canvas.width, 300);
        ctx.font = '250px Arial';
        ctx.globalAlpha = 0.5;
        ctx.drawImage(quote, 50, canvas.height / 2.85, 2000, 2000);
        ctx.globalAlpha = 1;

        // ctx.fillRect(200, 100, 900, 900)

    }

}



drawTemplate();



// function addText() {
//     applyBtn.onclick = function() {
//         ctx.font = '330px Chunkfive';
//         ctx.fillText(authName.value, 50, canvas.height / 1.77);
//         ctx.font = '150px Coolvetica';
//         wrapText(ctx, imgText.value + '"', 200, canvas.height / 1.35, canvas.width - 250, 175);
//     }

// }


uploadImg.addEventListener('change', () => {
    const circlefile = document.getElementById('upload-img').files[0];
    if (circlefile) {

        document.getElementById("fileLabel").innerHTML = circlefile.name;
    }
})

applyBtn.addEventListener('click', () => {
    const file = document.getElementById('upload-img').files[0];

    const reader = new FileReader();

    if (file) {
        fileName = file.name;
        reader.readAsDataURL(file);
        document.getElementById("fileLabel").innerHTML = file.name;
    }

    reader.addEventListener('load', () => {


        var circle = new Image();
        circle.src = reader.result;
        circle.onload = function() {
            ctx.beginPath();
            ctx.arc(700, 1200, 600, 0, 6.28, false); //draw the circle
            ctx.clip(); //call the clip method so the next render is clipped in last path
            ctx.stroke();
            ctx.closePath();
            ctx.drawImage(circle, 100, 600, 1200, 1200);
        };
    }, false);


});

applyBtn.addEventListener('click', function() {
    ctx.font = '330px Chunkfive';
    ctx.fillText(authName.value, 50, canvas.height / 1.77);
    ctx.font = '150px Coolvetica';
    wrapText(ctx, imgText.value + '"', 200, canvas.height / 1.35, canvas.width - 250, 175);
});


resetBtn.addEventListener('click', function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawTemplate();
}, false);





downloadBtn.addEventListener("click", () => {
    // Get ext
    const fileExtension = fileName.slice(-4);

    // Init new filename
    let newFilename;

    // Check image type

    // new filename
    newFilename = "campaignbanner.png";


    // Call download
    download(canvas, newFilename);
});

// Download
function download(canvas, filename) {
    // Init event
    let e;
    // Create link
    const link = document.createElement("a");

    // Set props
    link.download = filename;
    link.href = canvas.toDataURL("image/png", 0.8);
    // New mouse event
    e = new MouseEvent("click");
    // Dispatch event
    link.dispatchEvent(e);
}

var sliderx = document.getElementById("rangex");
var slidery = document.getElementById("rangey");
var sliders = document.getElementById("ranges");
var outputx = document.getElementById("demox");
var outputy = document.getElementById("demoy");
var outputs = document.getElementById("demos");
outputx.innerHTML = sliderx.value; // Display the default slider value
outputy.innerHTML = slidery.value;
outputs.innerHTML = sliders.value;
// Update the current slider value (each time you drag the slider handle)
sliderx.oninput = function() {
    outputx.innerHTML = this.value;
}
slidery.oninput = function() {
    outputy.innerHTML = this.value;
}
sliders.oninput = function() {
    outputs.innerHTML = this.value;
}