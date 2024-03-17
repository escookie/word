// 단어와 뜻을 저장하는 배열
const words = [
    { word: "ride", meaning: "타다" },
    { word: "railway", meaning: "철도" },
    { word: "hanging", meaning: "매달려 있는" },
    { word: "frozen", meaning: "얼어붙은" },
    { word: "country", meaning: "나라" },
    { word: "vehicle", meaning: "교통 수단" },
    { word: "get around", meaning: "돌아다니다, 이동하다" },
    { word: "take", meaning: "데려가다" },
    { word: "people", meaning: "사람들" },
    { word: "there are", meaning: "~들이 있다" },
    { word: "across", meaning: "~를 가로질러" },
    { word: "special", meaning: "특별한" }
];

// 현재 보여지는 단어의 인덱스
let currentIndex = 0;

// DOM 요소들을 가져옴
const wordElement = document.getElementById("word");
const meaningElement = document.getElementById("meaning");
const correctButton = document.getElementById("correct-btn");

// 초기 단어 설정
updateWord();

// "맞았다!" 버튼에 클릭 이벤트 추가
correctButton.addEventListener("click", () => {
    // 정답 처리
    
    // 다음 단어로 넘어감
    currentIndex++;
    // 마지막 단어일 경우 다시 처음으로 돌아감
    if (currentIndex === words.length) {
        currentIndex = 0;
    }
    // 단어 업데이트
    updateWord();
});

// 단어를 업데이트하는 함수
function updateWord() {
    const currentWord = words[currentIndex];
    wordElement.textContent = currentWord.word;
    meaningElement.textContent = currentWord.meaning;
    // 뜻 숨기기
    meaningElement.style.display = "none";
    // 단어 클릭 시 뜻 표시
    wordElement.addEventListener("click", showMeaning);
}

// 단어 클릭 시 뜻 표시하는 함수
function showMeaning() {
    meaningElement.style.display = "block";
    // 단어 클릭 이벤트 제거
    wordElement.removeEventListener("click", showMeaning);
}