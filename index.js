'use strict'

require('dotenv').config()

const line = require('@line/bot-sdk')
const msgModel = require('./utils/msgModel')
const distanceModel = require('./utils/distanceModel')
const timeTableModel = require('./utils/timeTableModel')
const getData = require('./utils/getData')

const config = {
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_TOKEN
}
const client = new line.Client(config)

module.exports.webhook = async (event, context) => {
  // 解析取得 webhook 傳送過來的客戶端資料(JSON 檔)
  const body = JSON.parse(event.body)
  // 取得傳過來的資料總體
  const response = body.events[0]
  // 傳過來的 event type
  const type = response.type
  // 發送訊息所需的 token
  const replyToken = response.replyToken

  // 設定要回傳的內容與類型(流程：分流 req -> 檢查規格 -> 取得資料 -> 檢查資料 -> 塞進模板 -> 丟回使用端)
  try {
    let model, result, isTrue, content
    switch (type) {
      case 'message':
        content = response.message.text
        // 檢查輸入規格(1.空白 2.空白的左右，各有至少 1 個非數字文字)
        isTrue = /[\D]+[\s]\D+/.test(content)
        if (!isTrue) {
          model = {
            type: 'text',
            text: '輸入了錯誤格式😖\n請輸入「里名」「地址」，中間記得用空白隔開呦~'
          }
          break
        }
        // 為 getData.js 資料分流做準備
        content = content.split(' ')
        result = await getData(content)
        if (result.length === 0) {
          model = {
            type: 'text',
            text: '查無此資料😖\n可能該地址尚未設置收運路線，建議改搜尋附近路段'
          }
          break
        }
        // 完整模板
        model = await msgModel(result)
        break
      case 'postback':
        content = response.postback.data.split(':')// [分流文字, 車牌] 或 [分流文字, 車牌+經緯度]
        // 分流模板
        if (content[0] === '查詢垃圾車目前位置') model = await distanceModel(content[1])
        if (content[0] === '垃圾車、回收車時間表') {
          result = await getData(content[1])
          model = await timeTableModel(result)
        }
        break
      default:
        console.log('錯誤，沒有符合的文字串')
    }
    // reply 回使用端
    await client.replyMessage(replyToken, model)
  } catch (err) {
    console.log(err)
  }
}
