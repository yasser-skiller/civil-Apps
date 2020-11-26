
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
  