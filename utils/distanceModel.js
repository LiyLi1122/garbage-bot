const axios = require('axios')

const distanceModel = async content => {
  try {
  // 車牌、緯度、經度
    content = content.split(', ')
    // 根據車牌前往政府 API 搜尋垃圾車目前位置
    const { data } = await axios.get(`https://datacenter.taichung.gov.tw/swagger/OpenData/215be7a0-a5a1-48b8-9489-2633fed19de3?filter=${content[0]}`) // 模糊搜尋// [{}, {}...]
    // 根據車牌對查詢結果篩選得到動態資料(car、緯度 X、經度 Y)
    const { X, Y } = data.find(d => d.car === content[0])
    // 計算站點到目前位置的時間、距離
    const distanceData = await axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${Y},${X}&destinations=${content[1]},${content[2]}&key=${process.env.MAP_API_KEY}&language=zh-tw`)
    const { destination_addresses, origin_addresses, rows } = distanceData.data

    const model =
      {
        type: 'flex',
        altText: 'this is a flex message',
        contents:
        {
          type: 'bubble',
          size: 'mega',
          header: {
            type: 'box',
            layout: 'vertical',
            contents: [
              {
                type: 'box',
                layout: 'vertical',
                contents: [
                  {
                    type: 'text',
                    text: `車號 ${content[0]}`,
                    weight: 'bold',
                    color: '#ffffff',
                    size: '30px',
                    align: 'center'
                  }
                ],
                margin: '10px'
              },
              {
                type: 'box',
                layout: 'vertical',
                contents: [
                  {
                    type: 'text',
                    text: '目前位置',
                    color: '#ffffff66',
                    size: 'sm',
                    weight: 'bold'
                  },
                  {
                    type: 'text',
                    color: '#ffffff',
                    flex: 4,
                    weight: 'bold',
                    text: `${origin_addresses[0]}`,
                    wrap: true
                  }
                ],
                margin: '10px'
              },
              {
                type: 'box',
                layout: 'vertical',
                contents: [
                  {
                    type: 'text',
                    text: '站點位置',
                    color: '#ffffff66',
                    size: 'sm',
                    wrap: true,
                    weight: 'bold'
                  },
                  {
                    type: 'text',
                    text: `${destination_addresses[0]}`,
                    color: '#ffffff',
                    flex: 4,
                    weight: 'bold',
                    wrap: true
                  }
                ],
                margin: '20px'
              }
            ],
            paddingAll: '20px',
            backgroundColor: '#0367D3',
            spacing: 'md',
            paddingTop: '22px'
          },
          body: {
            type: 'box',
            layout: 'vertical',
            contents: [
              {
                type: 'box',
                layout: 'horizontal',
                contents: [
                  {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                      {
                        type: 'filler'
                      },
                      {
                        type: 'box',
                        layout: 'vertical',
                        contents: [],
                        cornerRadius: '30px',
                        height: '12px',
                        width: '12px',
                        borderColor: '#EF454D',
                        borderWidth: '2px'
                      },
                      {
                        type: 'filler'
                      }
                    ],
                    flex: 0
                  },
                  {
                    type: 'text',
                    gravity: 'center',
                    flex: 4,
                    size: '20px',
                    text: '🚍'
                  }
                ],
                spacing: 'lg',
                cornerRadius: '30px',
                margin: 'xl'
              },
              {
                type: 'box',
                layout: 'horizontal',
                contents: [
                  {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                      {
                        type: 'box',
                        layout: 'horizontal',
                        contents: [
                          {
                            type: 'filler'
                          },
                          {
                            type: 'box',
                            layout: 'vertical',
                            contents: [],
                            width: '2px',
                            backgroundColor: '#B7B7B7'
                          },
                          {
                            type: 'filler'
                          }
                        ],
                        flex: 1
                      }
                    ],
                    width: '12px'
                  },
                  {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                      {
                        type: 'text',
                        text: `距離約 ${rows[0].elements[0].distance.text}`,
                        weight: 'bold'
                      },
                      {
                        type: 'text',
                        text: `預估 ${rows[0].elements[0].duration.text}抵達`,
                        wrap: true,
                        weight: 'bold'
                      }
                    ],
                    justifyContent: 'center'
                  }
                ],
                height: '64px',
                spacing: '15px',
                margin: '10px'
              },
              {
                type: 'box',
                layout: 'horizontal',
                contents: [
                  {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                      {
                        type: 'filler'
                      },
                      {
                        type: 'box',
                        layout: 'vertical',
                        contents: [],
                        cornerRadius: '30px',
                        width: '12px',
                        height: '12px',
                        borderWidth: '2px',
                        borderColor: '#6486E3'
                      },
                      {
                        type: 'filler'
                      }
                    ],
                    flex: 0
                  },
                  {
                    type: 'text',
                    text: '🏡 ',
                    gravity: 'center',
                    flex: 4,
                    size: '20px'
                  }
                ],
                spacing: 'lg',
                cornerRadius: '30px'
              }
            ]
          }
        }
      }
    return model
  } catch (error) {
    console.log(error)
  }
}
module.exports = distanceModel