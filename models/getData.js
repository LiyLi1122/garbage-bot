'use strict'

require('dotenv').config()

const Garbage = require('../models/garbage')
const timeTransTool = require('../utils/timeTransTool')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGODB_URL)
const db = mongoose.connection

const getData = function (content) {
  return new Promise((resolve, reject) => {
    let rawData
    content = content.split(' ')
    db.once('open', async () => {
      try {
        console.log('mongoDB is connected!')
        if (typeof content === 'object') {
          // ['福平里 台中路']
          const villageReg = new RegExp(content[0], 'i')
          const captionReg = new RegExp(content[1], 'i')
          rawData = await Garbage.find(
            {
              $and: [
                { village: villageReg },
                { caption: captionReg }
              ]
            }, 'village caption task_type car_licence'
          )
            .limit(5)
            .lean()
            .exec()
          resolve(rawData)
        } else {
          // '中華路一段'
          rawData = await Garbage.findOne(
            {
              caption: content
            }
          )
            .lean()
            .exec()
          resolve(timeTransTool([rawData])) // tool 的處理格式: array-objects
        }
      } catch (error) {
        console.log(error)
      }
    })
  })
    .catch(error => {
      console.log(error)
    })
}

module.exports = getData
