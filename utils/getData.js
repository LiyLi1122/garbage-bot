'use strict'

require('dotenv').config()

let rawData
const Garbage = require('../models/garbage')
const timeTransTool = require('../utils/timeTransTool')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGODB_URL)
mongoose.connection
  .once('open', () => console.log('mongoDB is connected!'))
  .on('error', error => console.log(`error: ${error}`))

const getData = async function (content) {
  try {
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
      return rawData
    } else {
      // '中華路一段'
      rawData = await Garbage.findOne(
        {
          caption: content
        }
      )
        .lean()
        .exec()
      return timeTransTool([rawData]) // tool 的處理格式: array-objects
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports = getData
