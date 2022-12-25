const timeTransTool = function (rawData) {
  rawData = rawData.map(raw => {
    // 時間字串拆開
    let tmp = raw.time.split(',')
    const gs = []
    const ge = []
    const rs = []
    const re = []
    // 以 1.垃圾車抵達 2.回收車抵達 3.垃圾車離開 4.回收車離開時間分成 4 個 array
    for (const i in tmp.slice(0, -1)) {
      if (tmp[i].indexOf('g') !== -1 && tmp[i].indexOf('s') !== -1) {
        gs.push(tmp[i])
      }
      if (tmp[i].indexOf('g') !== -1 && tmp[i].indexOf('e') !== -1) {
        ge.push(tmp[i])
      }
      if (tmp[i].indexOf('r') !== -1 && tmp[i].indexOf('s') !== -1) {
        rs.push(tmp[i])
      }
      if (tmp[i].indexOf('r') !== -1 && tmp[i].indexOf('e') !== -1) {
        re.push(tmp[i])
      }
    }
    // 將垃圾車、回收車同一天(星期)合併在一起 e.g. [['16:04-16:05', '休息-休息']]
    tmp = []
    for (const i in gs) {
      tmp.push([gs[i].split('-')[1] + '-' + ge[i].split('-')[1], rs[i].split('-')[1] + '-' + re[i].split('-')[1]])
    }
    // 休息-休息 -> 休息
    for (const i in tmp) {
      if (tmp[i][0] === '休息-休息') tmp[i][0] = '休息'
      if (tmp[i][1] === '休息-休息') tmp[i][1] = '休息'
    }
    raw.time = tmp
    return raw
  })
  return rawData
}
module.exports = timeTransTool
