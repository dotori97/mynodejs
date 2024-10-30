const {exec: exec} = require(`child_process`);

const cmd = 'dir'; 
exec(cmd, {encoding: `utf-8`}, (err, stdout, stderr) => {
    if(err){
        console.error(`error발생: ${err}`);
        return;
    }
    console.log(stdout);
})

// exec는 Node.js의 child_process 모듈에서 제공하는 메서드로, 
//시스템 명령어를 실행할 수 있도록 해주는 함수야. 
//이 함수를 사용하면 Node.js 환경에서 터미널이나 명령 프롬프트에서 
//수행할 수 있는 명령어를 실행하고, 그 결과를 받을 수 있어.

// exec의 주요 기능
// 명령어 실행
// exec는 터미널 명령어(예: ls, dir, git status, node -v 등)를 실행할 수 있어. 
// 예를 들어, exec("dir")을 실행하면 Windows에서 현재 디렉토리의 파일 목록을 
// 반환하고, Linux나 Mac에서 exec("ls")는 같은 결과를 보여줘.

// 비동기 처리
// exec는 비동기로 실행되어, 실행되는 동안 코드의 나머지 부분이 계속 실행돼. 
// 실행이 끝나면 콜백 함수가 호출되어 결과를 처리할 수 있어. 
// 덕분에 exec로 명령어를 실행해도 다른 코드의 실행을 막지 않아.

// 결과 캡처
// 명령어 실행 결과는 stdout과 stderr라는 두 가지 형식으로 
// 콜백 함수에 전달돼.

// stdout: 명령어 실행이 성공하면 그 결과가 담김.
// stderr: 명령어 실행 중 오류가 발생하면 그 오류 메시지가 담김.

// 옵션 설정
// 인코딩 방식이나 최대 버퍼 크기 등 명령어 실행과 관련된 
//여러 가지 옵션을 설정할 수 있어.