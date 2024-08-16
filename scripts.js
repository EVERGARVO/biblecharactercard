document.addEventListener('DOMContentLoaded', () => {
    // 헤더와 푸터를 동적으로 로드합니다.
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;

            // 현재 문서의 title 태그에서 제목을 읽어옵니다.
            const pageTitle = document.title;
            document.getElementById('header-title').textContent = pageTitle;
        });

    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        });

    document.body.classList.add('fade-in');
});

// txt box scripts.js

document.addEventListener('DOMContentLoaded', (event) => {
    const textBoxes = document.querySelectorAll('.text-box');

    // 페이지 로드 시 각 텍스트 박스의 내용 불러오기
    textBoxes.forEach((textBox) => {
        textBox.value = localStorage.getItem(textBox.id) || '';
        adjustHeight(textBox);
    });

    // 텍스트 박스 내용이 변경될 때 로컬 스토리지에 저장하고 높이 조정
    textBoxes.forEach((textBox) => {
        textBox.addEventListener('input', () => {
            localStorage.setItem(textBox.id, textBox.value);
            adjustHeight(textBox);
        });
    });

    // 자동으로 텍스트 박스 높이 조정
    function adjustHeight(textBox) {
        textBox.style.height = 'auto'; // 높이를 초기화
        textBox.style.height = `${textBox.scrollHeight}px`; // 내용에 맞게 높이 조정
    }

    // 다른 곳을 클릭했을 때 텍스트 박스 비활성화
    document.addEventListener('click', (event) => {
        textBoxes.forEach((textBox) => {
            if (!textBox.contains(event.target)) {
                textBox.blur(); // 텍스트 박스의 포커스를 잃게 함
            }
        });
    });
});
