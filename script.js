$(document).ready(function() {
    var imageLoader = document.getElementById('imageLoader');
    imageLoader.addEventListener('change', handleImage, false);
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    function handleImage(e){
        var reader = new FileReader();
        reader.onload = function(event){
            var img = new Image();
            img.onload = function(){
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img,0,0);
            }
            img.src = event.target.result;
        }
        reader.readAsDataURL(e.target.files[0]);     
    }
}).on('click', 'canvas', function (click) {
    const canvas = $(this).get(0);
    const ctx = canvas.getContext("2d");
    var x = Math.floor(click.pageX / 16);
    var y = Math.floor(click.pageY / 16);
    var up = click.pageX + click.pageY - 16 * (x + y) <= 16;
    if (up) {
        ctx.moveTo(16 * x + 1, 16 * (y + 1));
        ctx.beginPath();
        ctx.lineTo(16 * x, 16 * (y + 1));
        ctx.lineTo(16 * x, 16 * y);
        ctx.lineTo(16 * (x + 1), 16 * y);
        ctx.lineTo(16 * (x + 1), 16 * y + 1);
        ctx.moveTo(16 * x + 1, 16 * (y + 1));
    } else {
        ctx.moveTo(16 * x, 16 * (y + 1));
        ctx.beginPath();
        ctx.lineTo(16 * x, 16 * (y + 1) - 1);
        ctx.lineTo(16 * (x + 1), 16 * y);
        ctx.lineTo(16 * (x + 1), 16 * (y + 1));
        ctx.lineTo(16 * x, 16 * (y + 1));
    }
    ctx.globalAlpha = document.getElementById("transparency").value / 255;
    ctx.fillStyle = document.getElementById("color").value;
    ctx.fill();
    var img = canvas.toDataURL("image/png");
    document.getElementById("download").setAttribute("href", img);
});
