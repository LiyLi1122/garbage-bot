
const timeTableModel = async content => {
  try {
    const model = {
      type: 'flex',
      altText: 'this is a flex message',
      contents: {
        type: 'bubble',
        size: 'giga',
        header: {
          type: 'box',
          layout: 'vertical',
          contents: [
            {
              type: 'text',
              text: '時間表',
              size: '28px',
              align: 'center',
              gravity: 'center',
              margin: '10px',
              weight: 'bold',
              adjustMode: 'shrink-to-fit'
            },
            {
              type: 'separator',
              margin: '15px'
            }
          ]
        },
        body: {
          type: 'box',
          layout: 'horizontal',
          contents: [
            {
              type: 'box',
              layout: 'vertical',
              contents: [
                {
                  type: 'box',
                  layout: 'vertical',
                  contents: [
                    {
                      type: 'text',
                      text: '星期',
                      size: '18px',
                      weight: 'bold'
                    }
                  ],
                  alignItems: 'center'
                },
                {
                  type: 'box',
                  layout: 'vertical',
                  contents: [
                    {
                      type: 'text',
                      text: '一',
                      weight: 'bold'
                    },
                    {
                      type: 'text',
                      text: '二',
                      weight: 'bold'
                    },
                    {
                      type: 'text',
                      text: '三',
                      weight: 'bold'
                    },
                    {
                      type: 'text',
                      text: '四',
                      weight: 'bold'
                    },
                    {
                      type: 'text',
                      text: '五',
                      weight: 'bold'
                    },
                    {
                      type: 'text',
                      text: '六',
                      weight: 'bold'
                    },
                    {
                      type: 'text',
                      text: '日',
                      weight: 'bold'
                    }
                  ],
                  margin: '10px',
                  spacing: '10px'
                }
              ],
              alignItems: 'center'
            },
            {
              type: 'box',
              layout: 'vertical',
              contents: [
                {
                  type: 'box',
                  layout: 'vertical',
                  contents: [
                    {
                      type: 'text',
                      text: '垃圾車',
                      size: '18px',
                      weight: 'bold',
                      align: 'center'
                    }
                  ]
                },
                {
                  type: 'box',
                  layout: 'vertical',
                  contents: [
                  ],
                  margin: '10px',
                  spacing: '10px'
                }
              ],
              alignItems: 'center'
            },
            {
              type: 'box',
              layout: 'vertical',
              contents: [
                {
                  type: 'box',
                  layout: 'vertical',
                  contents: [
                    {
                      type: 'text',
                      text: '回收車',
                      weight: 'bold',
                      size: '18px'
                    }
                  ]
                },
                {
                  type: 'box',
                  layout: 'vertical',
                  contents: [
                  ],
                  margin: '10px',
                  spacing: '10px'
                }
              ],
              alignItems: 'center'
            }
          ],
          offsetBottom: '10px',
          justifyContent: 'center',
          offsetEnd: '6px'
        }
      }
    }
    content = content[0].time
    for (const i in content) {
      model.contents.body.contents[1].contents[1].contents.push(
        {
          type: 'text',
          text: content[i][0],
          align: 'center'
        }
      )
      model.contents.body.contents[2].contents[1].contents.push(
        {
          type: 'text',
          text: content[i][1],
          align: 'center'
        }
      )
    }
    return model
  } catch (error) {
    console.log(error)
  }
}

module.exports = timeTableModel
