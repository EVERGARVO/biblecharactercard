// 스크립트 파일 (scripts.js)

// 페이지 로드 시 저장된 메시지 불러오기
document.addEventListener('DOMContentLoaded', function() {
    fetch('load_messages.php')
        .then(response => response.json())
        .then(messages => {
            const messageContainers = document.querySelectorAll('.custom-messages-container');
            messageContainers.forEach(container => {
                messages.forEach(message => {
                    const newMessage = document.createElement('div');
                    newMessage.classList.add('custom-message');
                    newMessage.innerHTML = `
                        ${message.content}
                        <button class="delete-button" onclick="confirmDelete(this)">&#10006;</button>
                    `;
                    container.appendChild(newMessage);
                });
            });
        })
        .catch(error => console.error('Error:', error));
});


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
document.addEventListener('DOMContentLoaded', () => {
    const textBoxes = document.querySelectorAll('.text-box');

    textBoxes.forEach((textBox) => {
        // 페이지 로드 시 각 텍스트 박스의 내용 불러오기
        textBox.value = localStorage.getItem(textBox.id) || '';
        adjustHeight(textBox);

        // 텍스트 박스 내용이 변경될 때 로컬 스토리지에 저장하고 높이 조정
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

//비디오 기능
document.addEventListener('keydown', function(event) {
    if (event.code === 'KeyS') {  // 'S' 키로 자막 토글
        const track = document.getElementById('myTrack');
        if (track.mode === 'showing') {
            track.mode = 'disabled';
        } else {
            track.mode = 'showing';
        }
    }
});

//새로운 텍스트 박스
document.querySelectorAll('.custom-submit-button').forEach(button => {
    button.addEventListener('click', function() {
        const textBoxId = this.getAttribute('data-textbox-id');
        const messagesContainerId = this.getAttribute('data-messages-container-id');

        const userText = document.getElementById(textBoxId).value;

        if (userText.trim() !== '') {
            // 서버에 데이터 전송 (예: Ajax 사용)
            fetch('save_message.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `message=${encodeURIComponent(userText)}`
            })
            .then(response => response.text())
            .then(data => {
                // 새로운 메시지를 화면에 추가
                const messageContainer = document.getElementById(messagesContainerId);
                const newMessage = document.createElement('div');
                newMessage.classList.add('custom-message');
                newMessage.innerHTML = `
                    ${userText}
                    <button class="delete-button" onclick="confirmDelete(this)">&#10006;</button>
                `;
                messageContainer.prepend(newMessage); // 새 메시지를 맨 위에 추가

                // 텍스트 박스 비우기
                document.getElementById(textBoxId).value = '';
            })
            .catch(error => console.error('Error:', error));
        } else {
            alert('내용을 입력해주세요.');
        }
    });
});

function confirmDelete(button) {
    const confirmation = confirm('정말로 이 메시지를 삭제하시겠습니까?');
    if (confirmation) {
        deleteMessage(button);
    }
}

function deleteMessage(button) {
    // 삭제할 메시지를 찾아서 제거
    const messageContainer = button.parentElement.parentElement;
    messageContainer.removeChild(button.parentElement);

    // 서버에서 삭제 처리 (예: Ajax 사용)
    // const messageId = button.parentElement.dataset.messageId;
    // fetch('delete_message.php', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/x-www-form-urlencoded'
    //     },
    //     body: `messageId=${messageId}`
    // });
}
