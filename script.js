var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");

        function resizeCanvas() {
            canvas.width = window.innerWidth * 0.8; //canvas 크기조정
            canvas.height = window.innerHeight * 0.5;
        }

        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();

        var getPosition = function(e) {
            var x, y;
            if(e.type.indexOf("mouse") > -1) {
                x = e.offsetX;
                y = e.offsetY;
            } else { 
                var rect = e.target.getBoundingClientRect();
                x = e.changedTouches[0].clientX - rect.x;
                y = e.changedTouches[0].clientY - rect.y;
            }
            return {x:x, y:y};
        };
        var toggleDrawing = function(e) {
            this.drawing = e.type === "mousedown" || e.type === "touchstart";
            if(this.drawing) {
                var pos = getPosition(e);
                var ctx = this.getContext("2d");
                ctx.beginPath();
                ctx.moveTo(pos.x, pos.y);
            }
        }
        var draw = function(e) {
            if(this.drawing) {
                e.preventDefault();
                var pos = getPosition(e);
                var ctx = this.getContext("2d");
                ctx.lineTo(pos.x, pos.y);
                ctx.stroke();
            }
        };
        canvas.addEventListener("mousemove", draw);
        canvas.addEventListener("mousedown", toggleDrawing);
        canvas.addEventListener("mouseup", toggleDrawing);
        canvas.addEventListener("touchmove", draw); 
        canvas.addEventListener("touchstart", toggleDrawing);
        canvas.addEventListener("touchend", toggleDrawing);

        // 함수를 만들어 canvas를 지우는 역할을 수행
        function clearCanvas() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }

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

        let currentIndex = 0;

        const wordElement = document.getElementById("word");
        const meaningElement = document.getElementById("meaning");
        const correctButton = document.getElementById("correct-btn");
        const unknownButton = document.getElementById("unknown-btn");
        const unknownWordsContainer = document.getElementById("unknown-words");

        updateWord();

        correctButton.addEventListener("click", () => {
            currentIndex++;
            if (currentIndex === words.length) {
                currentIndex = 0;
            }
            updateWord();
            // 다음 버튼 클릭 시 canvas를 지우는 함수 호출
            clearCanvas();
        });

        unknownButton.addEventListener("click", () => {
            showUnknownWord();
            currentIndex++;
            if (currentIndex === words.length) {
                currentIndex = 0;
            }
            updateWord();
            // 모르겠다 버튼 클릭 시 canvas를 지우는 함수 호출
            clearCanvas();
        });

        function updateWord() {
            const currentWord = words[currentIndex];
            wordElement.textContent = currentWord.word;
            meaningElement.textContent = currentWord.meaning;
            meaningElement.style.display = "none";
            wordElement.addEventListener("click", showMeaning);
        }

        function showMeaning() {
            if (meaningElement.style.display === "none") {
                meaningElement.style.display = "block";
            } else {
                meaningElement.style.display = "none";
            }
        }

        function showUnknownWord() {
            const currentWord = words[currentIndex];
            const unknownWordElement = document.createElement("div");
            unknownWordElement.textContent = `${currentWord.word}: ${currentWord.meaning}`;
            unknownWordsContainer.appendChild(unknownWordElement);
        }