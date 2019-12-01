navigator.serviceWorker
    .register('../../serviceWorker.js')
    .then(function(){
        console.log('registered')
    })
    .catch(function(err){
        console.log(err)
    })


