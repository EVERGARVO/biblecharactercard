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
setInterval(() => {
    nextSlide('myCarousel'); // id가 myCarousel인 캐러셀에 적용
}, 5000); // 5초마다 슬라이드 전환
