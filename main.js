const { body } = document; 
    const $table = document.createElement('table'); 
    const $result = document.createElement('div');
    const rows = []; // 2차원 배열 데이터
    let turn = 'O';

    const callback = (event) => {
        if (event.target.textContent !== '') { // 칸이 이미 채워져 있는가?
            console.log('빈칸이 아닙니다.');
            return; // if문 중첩되는 것보다 빠르게 return하는 것이 좋음
        }
        // 빈칸이면
        console.log('빈칸입니다.');
        event.target.textContent = turn; 

        // 승부 확인
        if (turn === 'O') {  // 삼항연산자로도 바꿀 수 있음 turn = (turn === 'O' ? 'X' : 'O');
            turn = 'X';
        } else if (turn === 'X') {
            turn = 'O';
        }
    };

    for (let i = 0; i < 3; i++) {
        const $tr = document.createElement('tr');
        const cells = [];
        for (let j = 0; j < 3; j++) { // 위에서 변수 i를 썼다면 여기서는 변수 j로 쓰기
            const $td = document.createElement('td');
            cells.push($td);
            $tr.append($td);
        }
        rows.push(cells);
        $table.append($tr);
    }
    $table.addEventListener('click', callback);
    document.body.append($table);
    document.body.append($result);




    /* const { body } = document; 
    const $table = document.createElement('table'); 
    const $result = document.createElement('div');
    let turn = 'O';
    const data = [];
    for (let i = 0; i < 3; i++) {
        data.push([]);
    }
    for (let i = 0; i < 3; i++) {
        const $tr = document.createElement('tr');
        for (let i = 0; i < 3; i++) {
            const $td = document.createElement('td');
            $td.addEventListener('click', (event) => {
                // 칸에 글자가 있나?
                if (event.target.textContent) return; // 칸에 글자가 있으면 바로 return해서 밑에 코드 실행 안됨 사실상 종료되는 것(클릭을 하면 안되는 상황에서는 removeEventlister보다 조건을 줘서 조건에 해당 안되면 바로 종료되는 식으로 작성하는 것이 편함 )
                event.target.textContent = turn; 
                // 승부 확인
                if (turn === 'O') {
                    turn = 'X';
                } else if (turn === 'X') {
                    turn = 'O';
                }
            });
            $tr.append($td);
        }
        $table.append($tr);
    }
    document.body.append($table);
    document.body.append($result); */