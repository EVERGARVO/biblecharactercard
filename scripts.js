// 스크립트 파일 (scripts.js)

// 헤더와 푸터를 동적으로 로드합니다.
document.addEventListener('DOMContentLoaded', () => {
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;

            // 현재 문서의 title 태그에서 제목을 읽어옵니다.
            const pageTitle = document.title;
            document.getElementById('header-title').textContent = pageTitle;

            // 페이지 로드 시 목차 생성
            generateTOC();
        });

        

    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        });

    document.body.classList.add('fade-in');
});

// 텍스트 박스 동작
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

// 팝업 동작
// scripts.js

document.addEventListener('DOMContentLoaded', () => {
    const modals = document.querySelectorAll('.modal');
    const triggers = document.querySelectorAll('.popup-link');
    const closeButtons = document.querySelectorAll('.close');

    // 링크 클릭 시 해당 모달 열기
    triggers.forEach(trigger => {
        trigger.addEventListener('click', (event) => {
            event.preventDefault();
            const popupId = trigger.getAttribute('data-popup');
            const modal = document.getElementById(popupId);
            if (modal) {
                modal.style.display = 'block';
            }
        });
    });

    // 닫기 버튼 클릭 시 모달 닫기
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
            }
        });
    });

    // 모달 외부 클릭 시 닫기
    window.addEventListener('click', (event) => {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    });
});




// 캐러셀 동작
function showSlide(carouselId, index) {
    const carousel = document.getElementById(carouselId);
    const slides = carousel.querySelectorAll('.carousel-item');
    const totalSlides = slides.length;

    if (index >= totalSlides) {
        index = 0;
    } else if (index < 0) {
        index = totalSlides - 1;
    }

    carousel.querySelector('.carousel-inner').style.transform = `translateX(${-index * 100}%)`;

    // 현재 활성 슬라이드 업데이트
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
}

// 다음 슬라이드
function nextSlide(carouselId) {
    const carousel = document.getElementById(carouselId);
    const currentSlide = Array.from(carousel.querySelectorAll('.carousel-item')).findIndex(slide => slide.classList.contains('active'));
    showSlide(carouselId, currentSlide + 1);
}

// 이전 슬라이드
function prevSlide(carouselId) {
    const carousel = document.getElementById(carouselId);
    const currentSlide = Array.from(carousel.querySelectorAll('.carousel-item')).findIndex(slide => slide.classList.contains('active'));
    showSlide(carouselId, currentSlide - 1);
}

// 캐러셀 자동 전환
//setInterval(() => {
    //nextSlide('myCarousel'); // id가 myCarousel인 캐러셀에 적용
//}, 5000); // 5초마다 슬라이드 전환


// Toggle the Table of Contents
function toggleToc() {
    const toc = document.getElementById('toc');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');

    if (toc.classList.contains('show')) {
        toc.classList.remove('show');
        menuIcon.style.display = 'block';
        closeIcon.style.display = 'none';
    } else {
        toc.classList.add('show');
        menuIcon.style.display = 'none';
        closeIcon.style.display = 'block';
    }
}

// Close the Table of Contents if the user clicks outside of it
document.addEventListener('click', (event) => {
    const toc = document.getElementById('toc');
    const menuToggle = document.querySelector('.menu-toggle');

    if (toc.classList.contains('show') && !toc.contains(event.target) && !menuToggle.contains(event.target)) {
        toc.classList.remove('show');
        document.getElementById('menu-icon').style.display = 'block';
        document.getElementById('close-icon').style.display = 'none';
    }
});

// 자동으로 목차 생성하기
// 목차 생성 함수
function generateTOC() {
    const tocList = document.getElementById('tocList');
    if (!tocList) {
        console.error('TOC List element not found!');
        return;
    }

    const headers = document.querySelectorAll('main h1, main h2, main h3, main h4, main h5, main h6');
    const tocItems = [];

    headers.forEach(header => {
        // ID 설정
        const id = header.id || header.textContent.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');
        if (!header.id) {
            header.id = id;
        }

        // 항목 생성
        const level = parseInt(header.tagName.substring(1));
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = `#${id}`;
        link.textContent = header.textContent;
        link.style.marginLeft = `${(level - 1) * 20}px`; // 계층에 따라 들여쓰기

        listItem.appendChild(link);
        tocItems.push({ level, listItem });
    });

    // 목차 항목 추가
    let lastLevel = 1;
    const stack = [];
    tocItems.forEach(item => {
        while (stack.length && stack[stack.length - 1].level >= item.level) {
            stack.pop();
        }
        if (stack.length) {
            const parent = stack[stack.length - 1].listItem;
            const ul = parent.querySelector('ul') || document.createElement('ul');
            if (!parent.querySelector('ul')) {
                parent.appendChild(ul);
            }
            ul.appendChild(item.listItem);
        } else {
            tocList.appendChild(item.listItem);
        }
        stack.push(item);
    });
}