module.exports = {
  url: 'http: //localhost',
  port: process.env.PORT || 3030,
  originUrl: 'http://localhost:3030',
  mongoUrl: 'mongodb://localhost:27017/chat-app',
  ISDEV: process.env.NODE_ENV !== 'production',
  emailer: {
    from: "Chat App <no-reply@chatapp.com>",
    transport: {
      service: 'gmail',
      auth: {
        user: 'roniecosmi@gmail.com',
        pass: 'cosmi2017'
      }
    }
  }
}