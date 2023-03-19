const form = document.querySelector('#question-form');
const input = document.querySelector('#question-input');
const answerContainer = document.querySelector('#answer-container');

form.addEventListener('submit', (e) => {
  e.preventDefault();  // 阻止表單預設提交行為
  const question = input.value.trim();  // 取得問題
  if (question) {
    // 發送 API 請求
    fetch('/api/chatgpt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ question })
    })
      .then(res => res.json())
      .then(data => {
        // 顯示回答
        const answer = data.answer;
        answerContainer.innerHTML = `
          <div>
            <div><strong>問題：</strong> ${question}</div>
            <div><strong>回答：</strong> ${answer}</div>
          </div>
        `;
      })
      .catch(err => console.error(err));
  }
  input.value = '';  // 清空輸入欄位
});