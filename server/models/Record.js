// เก็บรวบรวมข้อมูลที่เพิ่มและแก้ไข

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const RecordSchema = new Schema({
  day: {
    type: String,
    required: true
  },
  month: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  details: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('Record', RecordSchema);