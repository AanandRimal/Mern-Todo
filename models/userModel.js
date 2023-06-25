const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
  firstname: {
    type:String,
    required:true
 },
 lastname:{
    type:String,
    required:true
 },
 username:{
  type:String,
  required:true
 },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})

// static signup method
userSchema.statics.signup = async function(firstname,lastname,username,email, password) {

  // validation
  if (!email || !password||!firstname||!lastname||!username) {
    throw Error('All fields must be filled')
  }
  if (!validator.isEmail(email)) {
    throw Error('Email not valid')
  }
  const exists = await this.findOne({ email })
  const usernameexits=await this.findOne({username})
  if(usernameexits){
    throw Error('Username already exists')
  }

  if (exists) {
    throw Error('Email already exists')
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const user = await this.create({firstname,lastname,username, email, password: hash })

  return user
}

// static login method
userSchema.statics.login = async function(email, password) {

  if (!email || !password) {
    throw Error('All fields must be filled')
  }

  const user = await this.findOne({ email })
  if (!user) {
    throw Error('Incorrect email')
  }

  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    throw Error('Incorrect password')
  }

  return user
}

module.exports = mongoose.model('User', userSchema)