# @hafdon/sendmail

a wrapper around nodemailer which handles the transporter for you

## install

`npm i @hafdon/sendmail`

## use

```javascript
const {configure, sendmail} = require('@hafdon/sendmail')
const options = require('./optionsfile.js')

async function main() {

    configure(options)
    const mailresult = await sendmail({
        to : 'receiver@receiving.com',
        from: 'sender@sending.com',
        subject: 'a mail',
        text | html : 'text here'
    })
}
main()
```

## format of configuration file:

```javascript
// example
{
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user : '<username>',
        pass : '<password>',
    },
}
```
