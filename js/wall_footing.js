let p  = document.querySelector('#p'),
 qu  = document.querySelector('#qu'),
 tw = document.querySelector('#tw'),
 L = 1,
 B1,
 B,
 Wn,
 G,
 Mmax,
 pi = Math.PI,
 t = 0.4;

function name() {
    B = (1.1 * p.value) / qu.value ;
    // RC_Dim
    B1 = B - (2 * t) ;
    console.log(B)
    console.log(B1)
}



function contact_prusser() {
    Wn = (1.05 * p.value) / B1 ;
    console.log(Wn)
    if(Wn > 40){
        Wn = 40;
        B1 = (1.05 * p.value) / 40;
        B = B1 + (2*t);
        console.log(Wn)
     
    }else{
        Wn = (1.05 * p.value) / B1 ;
        console.log(Wn)
        return Wn

    }
}

function raft() {
    let c = (B1 - tw.value ) * 0.5 ;
    console.log(c)
    return c;
}

function Moment() {
    Mmax = contact_prusser() * 0.5 * raft() * raft();
    let u = Mmax*1000
    let d_M = 0.25 * Math.sqrt(u);
    let d_M_new = Math.round((d_M + 5) / 5) *  5;
    let d_M_new2 = d_M_new/100
    console.log(contact_prusser())
    console.log(raft())

    console.log(Mmax)
    console.log(d_M)
    console.log(d_M_new)

    return d_M_new2 ;
}

function Shear() {
    let Qc = contact_prusser() * (raft() - Moment());
    G = Qc / (0.87 * Moment()) ;
    if(G < 60){
        console.log(Moment())
        console.log("ffffffrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr")
        return Moment() ;
    }
    if(G > 60){
        console.log("fffffffffffffffffffffffffffffffffffffffffffffffffff")
        let d_Q = (Qc*100)/(60 *.87);
        let d_Q_new = Math.round((d_Q+5) / 5) *  5;
        console.log(d_Q)
        console.log(d_Q_new)
        return d_Q_new ;
    }
}

function Area_steel() {
    let Mmax = contact_prusser() * 0.5 * raft() * raft();
    let As = (Mmax*100000) / (1870 * Shear());
    console.log(As)
    return As;
}
function one_bar_steel() {
    let one_bar_area = Area_steel()/10;

    if(0.78 < one_bar_area < 1.13){
        one_bar_area = 1.13;
    }
    if(1.13 < one_bar_area < 1.33){
        one_bar_area = 1.33;
    }
    if(1.33 < one_bar_area < 1.54){
        one_bar_area = 1.54;
    }
    if(1.54 < one_bar_area < 2.01){
        one_bar_area = 2.01;
    }
    if(2.01 < one_bar_area < 2.54){
        one_bar_area = 2.54;
    }
    if(2.54 < one_bar_area < 2.83){
        one_bar_area = 2.83;
    }
    if(2.83 < one_bar_area < 3.14){
        one_bar_area = 3.14;
    }
    if(3.14 < one_bar_area < 3.8){
        one_bar_area = 3.8;
    }
    if(3.8 < one_bar_area < 4.52){
        one_bar_area = 4.52;
    }
    if(4.52 < one_bar_area < 4.91){
        one_bar_area = 4.91;
    }
    if(4.91 < one_bar_area < 5.31){
        one_bar_area = 5.31;
    }
    if(5.31 < one_bar_area < 6.61){
        one_bar_area = 6.61;
    }
    if(6.61 < one_bar_area < 7.07){
        one_bar_area = 7.07;
    }
    console.log(one_bar_area)
    return one_bar_area;
}
function Dim_bar_steel() {
    let Dim_bar_area = Area_steel()/10;

    if(0.78 < Dim_bar_area < 1.13){
        Dim_bar_area = 12;
    }
    if(1.13 < Dim_bar_area < 1.33){
        Dim_bar_area = 13;
    }
    if(1.33 < Dim_bar_area < 1.54){
        Dim_bar_area = 14;
    }
    if(1.54 < Dim_bar_area < 2.01){
        Dim_bar_area = 16;
    }
    if(2.01 < Dim_bar_area < 2.54){
        Dim_bar_area = 18;
    }
    if(2.54 < Dim_bar_area < 2.83){
        Dim_bar_area = 19;
    }
    if(2.83 < Dim_bar_area < 3.14){
        Dim_bar_area = 20;
    }
    if(3.14 < Dim_bar_area < 3.8){
        Dim_bar_area = 22;
    }
    if(3.8 < Dim_bar_area < 4.52){
        Dim_bar_area = 24;
    }
    if(4.52 < Dim_bar_area < 4.91){
        Dim_bar_area = 25;
    }
    if(4.91 < Dim_bar_area < 5.31){
        Dim_bar_area = 26;
    }
    if(5.31 < Dim_bar_area < 6.61){
        Dim_bar_area = 28;
    }
    if(6.61 < Dim_bar_area < 7.07){
        Dim_bar_area = 30;
    }
    console.log(Dim_bar_area)
    return Dim_bar_area;
}

function Num_steel() {
    let Num_st = Area_steel() / one_bar_steel() ;
    let area_sstt = Math.ceil(Num_st)
    console.log(Num_st)
    console.log(area_sstt)
    return area_sstt;

}

function Bond() {
    let Qb = Wn * raft();
    let G_b = Qb * 1000/(0.87 * pi * Shear() * Num_steel() * (Dim_bar_steel()/10))
    console.log(Qb)
    console.log(G_b)
    return G_b;
}

function wring(){
  
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

function draw() {
    for (let index = 0; index < Num_steel(); index++) {
        let Bar = document.createElement('p');
        document.querySelector('#rrcc').appendChild(Bar);    
    }
    
    
}

document.querySelector('#btn-trz').addEventListener('click',()=>{
  wring()

  if(document.querySelector('#anywr').style.display == 'none' ){

    wring()
    document.querySelector('#result').style.display = 'flex';
    name();
    contact_prusser();
    raft();
    Moment();
    Shear();
    Area_steel();
    one_bar_steel();
    Dim_bar_steel();
    Num_steel();
    Bond();
    document.querySelector('#C').textContent = raft() ;
    document.querySelector('#X').textContent = 0.4 ;
    document.querySelector('#B').textContent = B ;
    document.querySelector('#L').textContent = 1 ;
    document.querySelector('#t').textContent = 0.4 ;
    document.querySelector('#B1').textContent = B1 ;
    document.querySelector('#ddd').textContent = Shear()/100 ;
    document.querySelector('#t1').textContent = (Shear()/100) + 0.05 ;
    document.querySelector('#Mo').textContent = Mmax ;
    document.querySelector('#Shear_s').textContent = G ;
    document.querySelector('#Bond_p').textContent = Bond() ;
    document.querySelector('#asasas').textContent = Area_steel() ;
    document.querySelector('#steel').innerHTML = `${Num_steel()} '&#981;' ${Dim_bar_steel()}`;
    draw();

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

