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
