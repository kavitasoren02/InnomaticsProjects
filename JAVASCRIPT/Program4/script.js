function trafficLightControl(density) {
    density=density.toLowerCase();

    if(density === 'heavy traffic'){
        return 60;
    }else if(density === 'moderate traffic'){
        return 40;
    }else if(density === 'light traffic'){
        return 20;
    }
    else{
        return 'Invalid traffic density';
    }

}

function display(){
    const density =document.getElementById('density').value;
    const duration = trafficLightControl(density);
    const result=document.getElementById('result');
    
    if(typeof duration === 'number'){
        result.innerText = `Green light Duration : ${duration} seconds`;
    } else{
        result.innerText = duration;
    }
}