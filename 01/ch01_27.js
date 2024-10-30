const posts = {
    data: [
        {
            title: 'Test Title',
            content: 'Test Content',
            author: {
                name: 'lee',
                id: 1,
                age: 15
            }
        },
        {
            title: 'Test Title2',
            content: 'Test Content2',
            author: {
                name: 'hogn',
            }
        },
        {
            title: 'Test Title3',
            content: 'Test Content3'
        }
    ]
}

//console.log(posts['data']);
posts['data'].forEach((item=>{
    // if('author' in item){
    //     console.log(item['author']['name']);
    // }
    try{
        //file open

        //file work
        console.log(item['author']['name']);
    }catch(error){
        //err출력
        console.log(`error: ${error}`);          
    }finally{
        //file close, db close
        console.log('finally');
    }
    console.log('-------------');
}));

