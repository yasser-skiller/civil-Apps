let Angle  = document.querySelector('#Angle'),
 kind  = document.querySelector('#kind'),
 cohesion = document.querySelector('#cohesion'),
 Density = document.querySelector('#Density'),
 width = document.querySelector('#width'),
 length = document.querySelector('#length'),
 V = document.querySelector('#V'),
 H = document.querySelector('#H'),
  N_c ,
  N_q ,
  N_w ,
  Df = document.querySelector('#Df'),
  Dw = document.querySelector('#Dw'),
  S_c ,
  S_q ,
  S_w ,
  i_c ,
  i_q ,
  i_w ,
  dc,
  dq,
  equation,
  p = Math.PI,
  num_layer = 1;


document.querySelector('#add_layer').addEventListener('click',()=>{
  num_layer ++;
  let new_layer = document.createElement('div');
  new_layer.classList.add('form-group')
  new_layer.innerHTML = `
    <label for="exampleFormControlInput1">anthor layer (${num_layer})</label>
    <input type="number"  class="form-control layer_density"  placeholder="&#947;">
    <input type="number"  class="form-control layer_depth my-2"  placeholder="D">
  `;
  document.querySelector('#all_layer').appendChild(new_layer)
})

function Bearing_capacity_Method() {
  if(Angle.value == 0){
    N_c = 5.24;
    N_q = 1;
    N_z = 0;

  }
  if(Angle.value == 5){
    N_c = 6.48;
    N_q = 1.57;
    N_z = 0.09;

  }
  if(Angle.value == 10){
    N_c = 6.34;
    N_q = 2.47;
    N_z = 0.47;
  }
  if(Angle.value == 15){
    N_c = 10.97;
    N_q = 3.94;
    N_z = 1.42;
  }
  if(Angle.value == 20){
    N_c = 14.83;
    N_q = 6.4;
    N_z = 3.54;
  }
  if(Angle.value == 25){
    N_c = 20.22;
    N_q = 10.66;
    N_z = 8.11;
  }
  if(Angle.value == 30){
    N_c = 30.14;
    N_q = 18.4;
    N_z = 10.08;
  }
  if(Angle.value == 35){
    N_c = 46.13;
    N_q = 33.29;
    N_z = 40.69;
  }
  if(Angle.value == 40){
    N_c = 75.32;
    N_q = 64.18;
    N_z = 95.41;
  }
  if(Angle.value == 45){
    N_c = 133.89;
    N_q = 134.85;
    N_z = 240.85;
  }

}

setInterval(() => {
  if(document.querySelector('#exampleCheck1').checked == true){
    document.querySelector('#waterform').style.display = 'block';
  }
  
}, 0);

function water_one() {
  let k = Dw.value/Df.value
  if(document.querySelector('#exampleCheck1').checked == true){
    if((Dw-Df) > width.value){return 1 }
    else{
      let ki = (0.5 + (0.5 * k) )
      if(ki > 1){return 1}
      if(ki < 0.5){return 0.5}
      if( 0.5 < ki < 1){return ki}
      
    }
    
  }
  else{
    return 1;
  }
  
}
function water_part() {
  let kk = (Dw.value - Df.value)/width.value
  if(document.querySelector('#exampleCheck1').checked == true){
    if((Dw-Df) > width.value){ return 1 ;}
    else{
      let kki =  (0.5 + (0.5 * kk) )
      if(kki > 1){return 1}
      if(kki < 0.5){return 0.5}
      else{return kki}
    }
    
  }
  else{
    return 1;
  }

  

}

function pressure(){
  let layer_depth = document.querySelectorAll('.layer_depth');
  let layer_density = document.querySelectorAll('.layer_density');
  let arr_layer_depth = Array.from(layer_depth);
  let arr_layer_density = Array.from(layer_density);
  let arr_layer_density_valus =[];
  let arr_layer_depth_valus=[];

  arr_layer_depth.forEach(element => {
    arr_layer_density_valus.push(Number(element.value))
  });
  arr_layer_density.forEach(element => {
    arr_layer_depth_valus.push(Number(element.value))
  });

  let Mu = 0;

  for(var i=0; i< arr_layer_depth_valus.length; i++) {
    Mu += arr_layer_depth_valus[i] * arr_layer_density_valus[i];
  }

  return Mu;

}

function shape() {
  if(kind.value == 'Strip'){
    S_c = 1;
    S_q = 1;
    S_w = 1;
  }
  if(kind.value == 'Square'){
    S_c = 1.3;
    S_q = 1.2;
    S_w = 0;
  }
  if(kind.value == 'circular'){
    S_c = 1.3;
    S_q = 1.2;
    S_w = 0.6;
  }
  
}

function depth() {
  dc = ((.35*Df.value)/width.value) + 1 ;
  dq = dc - ((dc-1)/N_q)
}


function inclination() {
  let as = (Angle.value * p)/180;
  let vn = 1 - (H.value/(V.value+(cohesion.value * width.value * length.value * (1/Math.tan(as)))))
  i_q = Math.pow(vn, 2)
  i_c = i_q - ((1-i_q)/(N_q - 1))
  i_w = Math.pow(i_q, 2);
}

function kind_method(){
  
  equation = (cohesion.value * N_c * S_c * dc * i_c) + (water_one() * N_q * i_q * S_q * dq * pressure() ) + (water_part() * i_w * 0.5 * S_w * Density.value * width.value * N_z )
  

  let QNU = equation - pressure();
  let QNS = QNU / fs.value;
  let QS = QNS + pressure();

  document.querySelector('#qu').textContent = equation ;
  document.querySelector('#qnu').textContent = QNU ;
  document.querySelector('#qns').textContent = QNS ;
  document.querySelector('#qs').textContent = QS;


  console.log(cohesion.value)
  console.log(width.value)

  console.log(N_c)
  console.log(N_q)
  console.log(pressure())
  console.log(water_one())
  console.log(water_part())
  console.log(Density.value)
  console.log(N_z)
  console.log(equation)
  
}

function wring(){
  if(kind.value == 'chosse'){
    document.querySelector('#footwr').style.display = 'block';
  }
  else{
    document.querySelector('#footwr').style.display = 'none';
  }

  if(Angle.value == 'chosse'){
    document.querySelector('#anglrwr').style.display = 'block';
  }
  else{
    document.querySelector('#anglrwr').style.display = 'none';
  }

  let awring = document.querySelectorAll('.awring');
  let arr_awring = Array.from(awring);

  arr_awring.forEach(element => {
    if(element.value == ''){
      document.querySelector('#anywr').style.display = 'block';
    }
    else{
      document.querySelector('#anywr').style.display = 'none';
    }
  });
}
document.querySelector('#btn-trz').addEventListener('click',()=>{
  wring()

  if(document.querySelector('#anywr').style.display == 'none' && document.querySelector('#anglrwr').style.display == 'none' &&     document.querySelector('#footwr').style.display == 'none'){

    wring()
    document.querySelector('#result').style.display = 'block';
    Bearing_capacity_Method();
    shape();
    depth();
    inclination()


    kind_method();
  }else{
    wring()

  }
  

  
})



document.querySelector('#pdf').addEventListener('click',()=>{
  window.print();
})

document.querySelector('#clear').addEventListener('click',()=>{
  location.reload();
})

document.querySelector('#shear').addEventListener('click',()=>{
  if( navigator.share !== undefined ){
    let ttl = "Sample";
    let txt = window.location.href;
    let url = window.location.href;
    //use text and/or url
    navigator.share( {title: ttl, text: txt} ) 
        .then( _ => console.log('success.') )
        .catch( (err) => console.log( err ) );
  }else{
    null
  }
})

