const CALENDAR_ID = '你的calendar ID';  // 替換成你的calendar ID
const OPENAI_API_TOKEN = 'Bearer sk-你的openAI API';  // 替換成你的openAI API

function doGet(e) {
  handleRequest(e.parameter.action);
}

function doPost(e) {
  handleRequest(e.postData.contents);
}

function handleRequest(data) {
  var eventData = JSON.parse(openAIGPT35Turbo(data));
  Calendar.Events.insert(eventData, CALENDAR_ID);
}

function openAIGPT35Turbo(userPrompt) {
  var url = 'https://api.openai.com/v1/chat/completions';
  var headers = {
    'Authorization': OPENAI_API_TOKEN,
    'Content-Type': 'application/json'
  };
  
  var inputPrompt = '今天的日期是 ' + getFormattedDate() + '。請將使用者輸入的句子轉為 google calendar json 格式，目的是添加新的行程於 google calendar中。輸出只需要寫出 json 內容，其餘都不需要寫。';
  var data = {
    'model': 'gpt-3.5-turbo',
    'messages': [
      { 'role': 'system', 'content': inputPrompt },
      { 'role': 'user', 'content': userPrompt }
    ],
    'temperature': 0.1,
  };

  try {
    var response = UrlFetchApp.fetch(url, { 'method': 'post', 'headers': headers, 'payload': JSON.stringify(data) });
    return JSON.parse(response.getContentText())['choices'][0]['message']['content'];
  } catch (error) {
    Logger.log(error);
    return "Error: " + error;
  }
}

function getFormattedDate() {
  var today = new Date();
  var year = today.getFullYear();
  var month = String(today.getMonth() + 1).padStart(2, '0');
  var day = String(today.getDate()).padStart(2, '0');
  var daysInChinese = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  return year + '-' + month + '-' + day + '(' + daysInChinese[today.getDay()] + ')';
