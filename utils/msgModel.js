require('dotenv').config()
const axios = require('axios')

const msgModel = async result => {
  try {
    let times = 1
    const model = {
      type: 'flex',
      altText: 'this is a flex message',
      contents:
    {
      type: 'carousel',
      contents: []
    }
    }
    // 取得 1.站點經緯度 2.站點地圖 url 3.站點資料放進模板
    for (const r of result) {
    // 設定 address & 編碼
      const address = encodeURI('台中市' + r.area + r.village + r.caption)
      // google geocode api
      const geocodeAPI = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.MAP_API_KEY}&language=zh-tw`
      const { data } = await axios.get(geocodeAPI)
      // 位置 Id
      const placeId = data.results[0].place_id
      // 緯度
      const lat = data.results[0].geometry.location.lat
      // 經度
      const lng = data.results[0].geometry.location.lng
      // 組裝資料
      model.contents.contents.push(
        {
          type: 'bubble',
          size: 'mega',
          header: {
            type: 'box',
            layout: 'vertical',
            contents: [
              {
                type: 'separator',
                color: '#0F0F0F',
                margin: '5px'
              },
              {
                type: 'text',
                text: `收運查詢結果 ${times}`,
                weight: 'bold',
                size: '24px',
                margin: '10px',
                align: 'center',
                color: '#0F0F0F'
              },
              {
                type: 'separator',
                color: '#0F0F0F',
                margin: '5px'
              }
            ],
            backgroundColor: '#FFFAF2',
            paddingAll: '50px'
          },
          body: {
            type: 'box',
            layout: 'vertical',
            contents: [
              {
                type: 'box',
                layout: 'vertical',
                contents: [
                  {
                    type: 'text',
                    text: '📌 地點 ',
                    color: '#969696',
                    weight: 'bold'
                  },
                  {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                      {
                        type: 'text',
                        text: `${r.village}${r.caption} (${r.task_type})`,
                        wrap: true,
                        weight: 'bold'
                      }
                    ],
                    paddingStart: '10px',
                    paddingEnd: '10px',
                    paddingTop: '10px',
                    paddingBottom: '15px'
                  }
                ],
                paddingAll: '10px'
              },
              {
                type: 'button',
                action: {
                  type: 'postback',
                  label: '垃圾車、回收車時間表',
                  data: `垃圾車、回收車時間表:${r.caption}`,
                  displayText: '垃圾車、回收車時間表'
                },
                style: 'secondary',
                adjustMode: 'shrink-to-fit',
                gravity: 'center'
              },
              {
                type: 'button',
                action: {
                  type: 'uri',
                  label: '收運點位置地圖',
                  uri: `https://www.google.com/maps/search/?api=1&query=${lat},${lng}&query_place_id=${placeId}`
                },
                margin: '5px',
                color: '#FFB630',
                style: 'secondary',
                height: 'md',
                gravity: 'center',
                adjustMode: 'shrink-to-fit'
              },
              {
                type: 'button',
                action: {
                  type: 'postback',
                  label: '查詢垃圾車目前位置',
                  data: `查詢垃圾車目前位置:${r.car_licence}, ${lat}, ${lng}`,
                  displayText: '查詢垃圾車目前位置'
                },
                margin: '5px',
                color: '#0367D3',
                style: 'primary',
                height: 'md',
                gravity: 'center',
                adjustMode: 'shrink-to-fit'
              }
            ]
          }
        }
      )
      times++
    }
    return model
  } catch (error) {
    console.log(error)
  }
}

module.exports = msgModel
