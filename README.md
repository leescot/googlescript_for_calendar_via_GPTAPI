最後一部份「捷徑」的設定，可連至 https://kunfengleemd.blogspot.com/2023/09/iOS-shortcut-openai-googlecalendar.html 觀看圖片版

📝 OpenAI 和 Google 日曆整合指南

此指南將教你如何使用 iOS 的「捷徑」與 Google Apps Script，使你能夠方便地將資訊增加到 Google 日曆中。


📌 需求
1️⃣ 口說增加 Google 日曆行程。
2️⃣ 複製文件或信件上的開會資訊，轉存為 Google 日曆行程。
3️⃣ 跳出文字輸入區，輸入後增加 Google 日曆行程。


🛠 所需工具
1️⃣ iOS 捷徑 App
2️⃣ Google Apps Script


📋 前置作業
1️⃣ OpenAI API Key
2️⃣ 你想要預設輸入的 Google 日曆群組 (Google 日曆 ID). 如何查找你的日曆ID? 參照 這裡.


🔧 Google Apps Script 步驟
1️⃣ 開啟編輯

訪問 Google Apps Script
選擇「新專案」，並在預設的「檔案：程式碼.gs」中複製並貼上上述的程式碼。
🚀 請記得替換 CALENDAR_ID 和 OPENAI_API_TOKEN 的值。

2️⃣ 增加必要的 API 服務
在左側欄選「服務」，點擊「＋」，增加「Google Calendar API」服務。

3️⃣ 授權
嘗試「執行」一次。這將會請求必要的權限。

4️⃣ 部署應用程式
點擊右上角的「部署」，接著選擇「新增部署作業」->「選取類型」->「網頁應用程式」，選取「所有人」，然後點擊「部署」。記錄下生成的網址，稍後將會用到。


📱 iOS 的捷徑步驟
📸 請參照附加的截圖進行操作，或根據個人需求進行調整。
1️⃣ 口說增加 Google 日曆行程
啟動語句：「嘿，Siri，增加行程」

2️⃣ 複製並轉存資訊
啟動步驟: 先選擇行程的文字 -> 複製 -> 說「嘿，Siri，貼上行程」

3️⃣ 手動輸入行程 (僅限 Mac)
啟動語句：「嘿，Siri，輸入行程」


🎉 現在，你應該可以順利地使用這些功能了! 享受你的高效生產力吧!
希望這個指南能夠幫助你更容易地整合 OpenAI 和 Google 日曆！🚀📅🤖
