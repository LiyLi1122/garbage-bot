<h1 align="center">台中垃圾車小精靈 Garbage-Bot 🧚‍♀️</h1>

<div align="center"><img src="https://user-images.githubusercontent.com/92621470/209444056-f03d9b47-4d3f-4f63-862a-974a700be9af.png"></div>

<h2>介紹</h2>  
Serverless Framework 使用 @line/bot-sdk 套件建立專案，並使用 MongoDB、Mongoose ORM 建立操作資料庫，
Axios 套件串接 Google Maps API ( Geocoding、Distance Matrix)、政府 Open data API，雲端部署在 AWS Lambda，
提供收運位置查詢、到點時間以及距離資訊、時間表查詢。

<h2>功能說明</h2>  

* 使用者可以根據住所輸入里名、地址找尋附近垃圾車收運位置  

* 根據搜查結果，點選「垃圾車、回收車時間表」得到每週垃圾車、回收車收運的預定時間表   

* 點選「收運位置地圖」會打開 Google Map，使用者可以查看實際地點     

* 「查詢垃圾車目前位置」可以知道車輛離站點還有多少距離、時間      

<h2>操作說明</h2>
政府 Open Data API 目前正維修中，Bot 暫不開放使用  

1. 打開 Line 的加入好友服務  

2. 輸入 @700uupcw

3. 加入好友  

4. 依循操作提示輸入文字 ( 測試用：和平里 復興路 )

5. 送出文字得到搜查結果  


<h2>使用工具</h2>

【 主要環境 】  
* Windows 10    
* Node 14.16.0  
* Mongoose 6.8.0  
* Serverless Framwork 3.25.1   

【部署】  
* AWS Lambda  

【API】  
* 政府開放資料 API  
* Google Map API  

【 其他 】  
* @line/bot-sdk 7.5.2  
* axios 0.27.2  
* dotenv16.0.3  

<h2>作者</h2>
Lily Wang

