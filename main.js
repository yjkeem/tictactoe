const { body } = document; 
    const $table = document.createElement('table'); 
    const $result = document.createElement('div');
    const rows = []; // 2차원 배열 데이터
    let turn = 'O';

    // [
    // [td, td, td],
    // [td, td, td],
    // [td, td, td],
    // ]

    const checkWinner = (target) => {  // 여기서 target은 td로 몇 번쨰 줄 몇 번째 칸인지 찾아내기 위해 사용
    let rowIndex; // tr태그로 몇 번쨰 줄인지 알 수 있음 target.parentNode.rowIndex
    let cellIndex; // td는 셀이라서 자체적으로 cellIndex를 가지고 있어 알아서 몇번째 칸인지 알 수 있음(target.cellIndex)
    rows.forEach((row, ri) => {  // 첫번째 배열 돌면서 index 위치 찾아냄
        row.forEach((cell, ci) => {  // 배열안의 배열돌면서 index 위치 찾아냄
        if (cell === target) {
            rowIndex = ri;  // 몇 번째 줄인지
            cellIndex = ci;  // 몇 번쨰 칸인지
        }
        });
    });
    // 세 칸 다 채워졌나?
    let hasWinner = false;  // 검사할 때 처음에는 false로 두기

    // 가로줄 검사
    if (
        rows[rowIndex][0].textContent === turn &&
        rows[rowIndex][1].textContent === turn &&
        rows[rowIndex][2].textContent === turn
    ) {
        hasWinner = true;
    }
    // 세로줄 검사
    if (
        rows[0][cellIndex].textContent   === turn &&
        rows[1][cellIndex].textContent === turn &&
        rows[2][cellIndex].textContent === turn
    ) {
        hasWinner = true;
    }
    // 대각선 검사
    if (
        rows[0][0].textContent === turn &&
        rows[1][1].textContent === turn &&
        rows[2][2].textContent === turn
    ) {
        hasWinner = true;
    }
    if (
        rows[0][2].textContent === turn &&
        rows[1][1].textContent === turn &&
        rows[2][0].textContent === turn
    ) {
        hasWinner = true;
    }
    return hasWinner;
    };


    const checkWinnerAndDraw = (target) => {
        const hasWinner = checkWinner(target);
        /// 승자가 있으면
        if (hasWinner) {  
            $result.textContent = `${turn}님의 승리!`;
            $table.removeEventListener('click', callback);
            return;
        }
        // 무승부 검사
        let draw = true;  // 기본적으로 무승부라고 생각. 한 칸이라도 비어있으면 무승부가 아님(꼭 9칸이 다 차야만 승부가 결정되는 것은 아니므로!)
        rows.forEach((row) => {
            row.forEach((cell) => {
            if (!cell.textContent) {
                draw = false;
            }
            });
        });
        /* 위 무승부 검사는 every를 사용하여 간결하게 나타낼 수 있다
        const draw = rows.flat().every((cell) => cell.textContent)
         */
        if (draw) {
            $result.textContent = `무승부`;
            return;
        } 

        if (turn === 'O') {  // 삼항연산자로도 바꿀 수 있음 turn = (turn === 'O' ? 'X' : 'O');
            turn = 'X';
        } else if (turn === 'X') {
            turn = 'O';
        }
    };
    
    let clickable = true; // 기본적으로 '내'가 클릭할 때는 클릭 가능
    const callback = (event) => {
        if (!clickable) return;
        if (event.target.textContent !== '') { // 칸이 이미 채워져 있는가?
            console.log('빈칸이 아닙니다.');
            return; // if문 중첩되는 것보다 빠르게 return하는 것이 좋음
        }
        // 빈칸이면
        console.log('빈칸입니다.');
        event.target.textContent = turn; 
        // 승부 판단하기
        checkWinnerAndDraw(event.target);    
        if (turn === 'X') {
            clickable = false; // 컴퓨터가 클릭할 때는 클릭 불가
            setTimeout(() => {
                const emptyCells = rows.flat().filter((v) => !v.textContent); // v.textConent가 '빈칸이 아니면' 이기 때문에 !를 붙여서 '빈칸이면'으로 만들어준다.
                const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
                randomCell.textContent = 'X';
                checkWinnerAndDraw(event.target);  
                clickable = true; // 컴퓨터의 턴이 끝나면 다시 누를 수 있게 만들어줌
            }, 1000);
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