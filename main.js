var ctx = document.getElementById('can').getContext('2d');
var plot = function(arr){
    ctx.clearRect(0,0,1000,500);
    var years = Array.apply(null,{length:34}).map(function(x,y){return y+1980});
    var d = arr.filter(function(x){return x!=null})
    if(d.length == 0){
        return;
    }
    var max = d.reduce(function(x,y){return (x>y)?x:y});
    var min = d.reduce(function(x,y){return (x<y)?x:y});
    var diff = max - min;
    diff = diff || 1;
    max += 0.1 * diff;
    min -= 0.1 * diff;
    diff *= 1.2;
    ctx.beginPath();
    var started = false;
    for(var i1 in arr){
        if (arr[i1]!=null){
            var i = i1 * 1000/34;
            var y = 500 - (arr[i1] - min) * 500 / diff
            if (!started){
                ctx.moveTo(i,y);
                started = true;
            }else{
                ctx.lineTo(i,y);
            }
        }
    }
    ctx.strokeStyle = 'red';
    ctx.stroke();
}
function mod(x,y){
    return (x<0)?mod(x+y,y):(x>=y)?mod(x-y,y):x
}
var index = 0;
//console.log(data)
function next(a){
    index += a;
    index=mod(index,Object.keys(data).length);
    console.log(index,Object.keys(data).length)
    document.getElementById('info').innerHTML = Object.keys(data)[index];
    document.getElementById('arr').innerHTML = data[Object.keys(data)[index]];
    plot(data[Object.keys(data)[index]]);
}

next(20);
