const questions = [
  {
    text: "วันนี้คุณรู้สึกแสบร้อนบริเวณลิ้นปี่ใช่หรือไม่ ?",
    answers: ["No", "Yes"],
    children: {
      Yes: [
        {
          text: "คุณมีอาการอื่น ๆ ร่วมด้วยหรือไม่ ?",
          answers: ["No", "Yes"],
          children: {
            Yes: [
              {
                text: "อาการ A?",
                answers: ["No", "Yes"],
                score: 1,
              },
              {
                text: "อาการ B ?",
                answers: ["No", "Yes"],
                score: 1,
              },
              {
                text: "อาการ C ?",
                answers: ["No", "Yes"],
                score: 1,
              },
              {
                text: "อาการ D ?",
                answers: ["No", "Yes"],
                score: 1,
              },
              {
                text: "อาการ E ?",
                answers: ["No", "Yes"],
                score: 1,
              },
            ],
          },
        },
      ],
    },
  },
];

// Variables
let currentNode = questions[0];
const userInputField = document.querySelector("input[type='text']");
const sendButton = document.querySelector(".send-button");
const chatbotResponse = document.querySelector(".card4");

// Show initial question
showQuestion(currentNode);

// Send button click event listener
sendButton.addEventListener("click", function () {
  const userAnswer = userInputField.value.trim();

  // Check if user entered an answer
  if (userAnswer) {
    // Process user answer based on current question
    const validAnswer = currentNode.answers.includes(userAnswer);

    if (validAnswer) {
      // Update chatbot response based on answer
      updateChatbotResponse(userAnswer);

      // Check if last question
      if (!currentNode.children || !currentNode.children[userAnswer]) {
        // Handle end of conversation
        endConversation();
      } else {
        // Move to next question
        currentNode = currentNode.children[userAnswer][0];
        showQuestion(currentNode);
      }
    } else {
      // Inform user of invalid answer
      chatbotResponse.textContent = "คำตอบของคุณไม่ถูกต้อง กรุณาเลือกคำตอบจากตัวเลือกที่กำหนด";
    }

    // Clear user input field
    userInputField.value = "";
  } else {
    // Inform user to enter an answer
    chatbotResponse.textContent = "กรุณาพิมพ์คำตอบของคุณ";
  }
});

function showQuestion(node) {
  chatbotResponse.textContent = node.text;
  // Remove previously displayed buttons (if any)
  const buttons = document.querySelectorAll(".card4 button");
  buttons.forEach((button) => button.remove());

  // Add answer buttons based on current question options
  node.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer;
    button.classList.add("answer");
    button.addEventListener("click", function () {
      userInputField.value = answer; // Pre-fill user input with button text
      sendButton.click();
    });
    chatbotResponse.appendChild(button);
  });
}

function updateChatbotResponse(userAnswer) {
  // Update response based on user answer and question logic
  let riskScore = 0;

  if (userAnswer === "No") {
    // แสดงคำถามถัดไปสำหรับกรณี "ไม่"
  } else if (userAnswer === "Yes") {
    // แสดงคำถามถัดไปสำหรับกรณี "ใช่"
  }
  // Add logic for each question and update risk score
  switch (currentNode.text) {
    case "วันนี้คุณรู้สึกแสบร้อนบริเวณลิ้นปี่ใช่หรือไม่ ?":
  if (userAnswer === "Yes") {
    riskScore++;
  }
  break;
case "คุณมีอาการอื่น ๆ ร่วมด้วยหรือไม่ ?":
  if (userAnswer === "Yes") {
    // Iterate through subquestions and add scores
    for (const subquestion of currentNode.children.Yes[0].children.Yes) {
      if (subquestion.answers[userAnswer] === "Yes") {
        riskScore += subquestion.score;
      }
    }
  }
  break;
  // เพิ่ม logic สำหรับ questions เพิ่มเติม
}

// Display response with risk assessment and recommendation
chatbotResponse.textContent =
  `ผลการประเมิน: คุณมีความเสี่ยงเป็นกรดไหลย้อน ${getRiskLevel(riskScore)}`;

if (getRiskLevel(riskScore) === "สูง") {
  chatbotResponse.textContent +=
    "\n\nควรพบแพทย์";
}

function getRiskLevel(riskScore) {
  if (riskScore <= 2) {
    return "ต่ำ";
  } else if (riskScore <= 4) {
    return "ปานกลาง";
  } else {
    return "สูง";
  }
}

function endConversation() {
  // Show final message and recommendations based on risk score
  const riskLevel = getRiskLevel(riskScore);
  chatbotResponse.textContent = `
    ผลการประเมิน: คุณมีความเสี่ยงเป็นกรดไหลย้อน ${riskLevel}
  `;

  if (riskLevel === "สูง") {
    chatbotResponse.textContent +=
      "\n\nควรพบแพทย์เพื่อรับการวินิจฉัยและรักษา";
  } else {
    chatbotResponse.textContent +=
      "\n\nลองปรับเปลี่ยนพฤติกรรมการใช้ชีวิต";
  }

  // Disable user input and send button
  userInputField.disabled = true;
  sendButton.disabled = true;
}
}

