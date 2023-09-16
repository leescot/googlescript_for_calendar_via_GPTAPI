# googlescript_for_calendar_via_GPTAPI

https://kunfengleemd.blogspot.com/2023/09/iOS-shortcut-openai-googlecalendar.html

使用 iOS 的 捷徑，透過呼叫 OpenAI API 轉換格式後，增加 Google 日曆行程

需求:
(1) 口說增加 google 日曆行程
(2) 複製文件或信件上的開會資訊，轉存為 google 日曆行程
(3) 跳出文字輸入區，輸入後增加 google 日曆行程


所需操作 app 或介面:
(1) iOS 的捷徑
(2) Google apps script


需先自備:
(1) OpenAI API Key
(2) 你想要預設輸入的 google 日曆群組 (google 日曆 ID) (怎麼找日曆ID 可參照 https://support.google.com/a/answer/1626902?hl=zh-Hant )


Google apps script 步驟
(1) 網址: https://script.google.com/
(2) 開「新專案」，在預設的「檔案：程式碼.gs」內，複製以下程式碼貼上
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
}

(3) 在左側欄位的「服務」按「＋」，增加「Google Calendar API」服務
(4) 試著「執行」一次，會發生錯誤，目的是要開通 google 帳號的權限
(5) 右上角「部署」-「新增部署作業」-「選取類型」-「網頁應用程式」，誰可以存取這一欄位選取「所有人」，右下角「部署」。部署後會產出一長串的「網址」，在下一個步驟會用到。


iOS 的捷徑步驟:
請參照以下截圖模仿，也可依照自己需求調整。把三個需求取不同標題，之後只要喊「嘿，Siri，(標題名稱)」，就會自動執行指定需求

需求(1): 口說增加 google 日曆行程
網址貼上後，後面要加上"?action="的字串

啟動步驟: 「嘿，Siri，增加行程(這是我內定的捷徑名稱)」




需求(2) 複製文字或信件上的開會資訊，轉存為 google 日曆行程
啟動步驟: 先把行程的文字內容圈選 -> 複製 -> 「嘿，Siri，貼上行程(這是我內定的捷徑名稱)」



需求(3) 跳出文字輸入區，輸入後增加 google 日曆行程 (for mac only)
跳出文字輸入區的功能，只有在 mac 上才會啟動，在 iPhone 上只會出現 Siri 聽取的圖示。

啟動步驟: 「嘿，Siri，輸入行程(這是我內定的捷徑名稱)」

