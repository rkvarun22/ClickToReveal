const questions = [
  {
    question:
      "When demand exceeds capacity, customers are turned away as there is no backup inventory. Demand is wasted. Is this statement true or false?",
    options: ["A", "B", "C", "D"],
    answer: "B",
  },
  {
    question:
      "A price ceiling imposed above the market equilibrium price will result in a shortage of the product.",
    options: ["A1", "B1", "C1", "D1"],
    answer: "B1",
  },
  {
    question:
      "Historically the US government has employed various types of programs to subsidize US agricultural sector.",
    options: ["A2", "B2", "C2", "D2"],
    answer: "B2",
  },
  {
    question:
      "If both, the supply and the demand increase at the same time, the equilibrium price will definitely increase.",
    options: ["A3", "B3", "C3", "D3"],
    answer: "B3",
  },
];

let currentQuestionIndex = 1;
let ans = [];
let score = 0;

const mainContainerElement = document.getElementById("fluid-container");
const optionsElement = document.getElementById("options");
const questionElement = document.getElementById("question");
const questionNumbersElement = document.getElementById("question-numbers");
const submitBtn = document.getElementById("submit");

submitBtn.addEventListener("click", () => {
  getAnswer(currentQuestionIndex);
  questions.forEach((question, index) => {
    if (question.answer === ans[index]) {
      score++;
    }
  });
  showResultSummary();
});

const showResultSummary = () => {
  mainContainerElement.innerHTML = "";
  const btn1 = document.createElement("button");
  const btn2 = document.createElement("button");
  btn1.innerText = `Score is ${score}`;
  btn1.className = "score-btn";
  btn2.innerText = "Refresh the page to start new quiz";
  btn2.className = "refresh-btn";
  btn2.addEventListener("click", () => {
    window.location.reload();
  });
  mainContainerElement.appendChild(btn1);
  mainContainerElement.appendChild(btn2);
  mainContainerElement.className = "fluid";
};

const createOptionElement = (optionId, labelText) => {
  const divElement = document.createElement("div");
  const inputElement = document.createElement("input");
  const labelEement = document.createElement("label");
  divElement.classList.add("form-control");
  inputElement.type = "radio";
  inputElement.name = "option";
  inputElement.id = `option-${optionId}`;
  labelEement.htmlFor = `option-${optionId}`;
  labelEement.innerText = labelText;
  divElement.appendChild(inputElement);
  divElement.appendChild(labelEement);
  return divElement;
};

const showQuestion = (questionIndex) => {
  const index = questionIndex ? questionIndex : 1;
  const quest = questions[index - 1];
  questionElement.innerText = quest.question;
  currentQuestionIndex = questionIndex;
  quest.options.forEach((option, index) => {
    const divElement = createOptionElement(`option-${index + 1}`, option);
    optionsElement.appendChild(divElement);
  });
};

const getAnswer = (index) => {
  const quest = questions[index - 1];
  const inputs = document.getElementsByTagName("input");
  const labelCollections = document.getElementsByTagName("label");
  const labels = Array.from(labelCollections);
  Array.from(inputs).forEach((input, inputIndex) => {
    if (input.checked) {
      ans.splice(index - 1, 1, labels[inputIndex].innerText);
    }
  });
};

const showNextPrevQuestionNumberIndex = () => {
  questions.forEach((_, index) => {
    const element = document.createElement("div");
    element.className = `index`;
    element.innerText = `${index + 1}`;
    element.id = `question-${index + 1}`;
    element.addEventListener("click", () => {
      element.classList.add("active-question");
      getAnswer(index);
      optionsElement.innerHTML = "";
      showQuestion(index + 1);
    });
    questionNumbersElement.appendChild(element);
  });
};

showQuestion();
showNextPrevQuestionNumberIndex();
