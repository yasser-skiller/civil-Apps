let Angle  = document.querySelector('#Angle'),
 kind  = document.querySelector('#kind'),
 cohesion = document.querySelector('#cohesion'),
 Density = document.querySelector('#Density'),
 width = document.querySelector('#width'),
  N_c ,
  N_q ,
  N_w ,
  Df = document.querySelector('#Df'),
  Dw = document.querySelector('#Dw'),
  // Mess,
  equation,
  num_layer = 1;

  // function wring_fun(Mess) {
  //   let wring_item = document.createElement('div');
  //   wring_item.classList.add('alert ');
  //   wring_item.classList.add('alert-danger');
  //   // wring_item.getAttribute('role',)
  //   wring_item.textContent = `{Mess`;
  //   document.querySelector('#wring').appendChild(wring_item);

    
  // }

  

  
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
    N_c = 5.7;
    N_q = 1;
    N_z = 0;

  }
  if(Angle.value == 5){
    N_c = 7.3;
    N_q = 1.6;
    N_z = 0.5;

  }
  if(Angle.value == 10){
    N_c = 9.6;
    N_q = 2.7;
    N_z = 1.2;
  }
  if(Angle.value == 15){
    N_c = 12.9;
    N_q = 4.4;
    N_z = 2.5;
  }
  if(Angle.value == 20){
    N_c = 17.7;
    N_q = 7.4;
    N_z = 5;
  }
  if(Angle.value == 25){
    N_c = 25.1;
    N_q = 12.7;
    N_z = 9.7;
  }
  if(Angle.value == 30){
    N_c = 37.2;
    N_q = 22.5;
    N_z = 19.7;
  }
  if(Angle.value == 34){
    N_c = 52.6;
    N_q = 36.5;
    N_z = 35;
  }
  if(Angle.value == 35){
    N_c = 57.8;
    N_q = 41.4;
    N_z = 42.4;
  }
  if(Angle.value == 40){
    N_c = 95.7;
    N_q = 81.3;
    N_z = 100.4;
  }
  if(Angle.value == 45){
    N_c = 172.3;
    N_q = 173.3;
    N_z = 297.5;
  }
  if(Angle.value == 48){
    N_c = 258.3;
    N_q = 287.9;
    N_z = 780.1;
  }
  if(Angle.value == 50){
    N_c = 347.5;
    N_q = 415.1;
    N_z = 1153.2;

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

function kind_method(){
  if(kind.value == 'Strip'){
    equation = (cohesion.value * N_c) + (water_one() * N_q * pressure() ) + (water_part() * 0.5 * Density.value * width.value * N_z )
  }
  if(kind.value == 'Square'){
    equation = (1.3 * cohesion.value * N_c) + (water_one() * N_q * pressure() ) + (water_part() * 0.4 * Density.value * width.value * N_z )
  }
  if(kind.value == 'circular'){
    equation = (1.3 * cohesion.value * N_c) + (water_one() * N_q * pressure() ) + (water_part() * 0.3 * Density.value * width.value * N_z )
  }

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
