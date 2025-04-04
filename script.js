document.addEventListener('DOMContentLoaded', () => {
    const details = [
        {
            question: "What is the default value of an int variable in Java?",
            options: ['0.0', 'null', '0', 'Garbage value'],
            answer: '0'
        },
        {
            question: "Which of the following is not a Java keyword?",
            options: ['static', 'String', 'extends', 'final'],
            answer: 'String'
        },
        {
            question: "Which method is used to get the length of a string in Java?",
            options: ['length()', 'size()', 'getLength()', 'count()'],
            answer: 'length()'
        },
        {
            question: "What is the default value of a boolean variable in Java?",
            options: ['true', 'false', '0', 'null'],
            answer: 'false'
        },
        {
            question: "What is the size of a char variable in Java?",
            options: ["1 byte", "2 bytes", "4 bytes", "8 bytes"],
            answer: "2 bytes"
        }
    ];

    let score = 0;
    let idx = 0;
    let option_start = 'a';
    let selectedAnswers = new Array(details.length).fill(null);
    let answerContainer = document.querySelector('.answer-container');
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');    
    const submitBtn = document.getElementById('submit-btn');  
    const resultContainer = document.querySelector('.result-container');
    const scoreText = document.getElementById('score-result')
    let question = document.querySelector('#question');

    submitBtn.addEventListener('click', () => {
        console.log("Final Score:", score);
        // alert(`Your final score is: ${score}/${details.length}`);
        resultContainer.style.display = 'flex'
        scoreText.innerText = `Your Scored ${score}/${details.length}`;
        question.style.display = "none";
        answerContainer.style.display = "none";
        document.querySelector('.btn-container').style.display = "none";
    });

    function displayQuestion() {
        prevBtn.disabled = (idx === 0);
        nextBtn.disabled = (idx === details.length - 1);
        submitBtn.disabled = (idx !== details.length - 1); 

        answerContainer.innerHTML = "";
        question.innerText = `${idx + 1}. ${details[idx]["question"]}`;

        details[idx]['options'].forEach((option, index) => {
            const eachOptionDiv = document.createElement('div');
            eachOptionDiv.classList.add('answer');
            eachOptionDiv.innerHTML = `<p>${String.fromCharCode(option_start.charCodeAt(0) + index)}) ${option}</p>`;
            answerContainer.appendChild(eachOptionDiv);

            if (selectedAnswers[idx] === option) {
                eachOptionDiv.style.backgroundColor = "#1C84FF";
            }

            eachOptionDiv.addEventListener('click', () => {
                if (selectedAnswers[idx] === null && option === details[idx]['answer']) {
                    score++;
                } else if (selectedAnswers[idx] !== null && selectedAnswers[idx] === details[idx]['answer'] && option !== details[idx]['answer']) {
                    score--;
                }
                selectedAnswers[idx] = option; 
                

                document.querySelectorAll('.answer').forEach(el => el.style.backgroundColor = "");
                eachOptionDiv.style.backgroundColor = "#1C84FF";
            });
        });
    }

    displayQuestion();

    nextBtn.addEventListener('click', () => {
        idx++;
        displayQuestion();
    });

    prevBtn.addEventListener('click', () => {
        idx--;
        displayQuestion();
    });
});
