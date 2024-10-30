function tentimes(cb){
    for(let i = 0; i <10; i++){
        cb(i);
    }
}
tentimes(function(a){
    console.log(`call this function[${a}]`);
});


