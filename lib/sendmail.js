/* jshint -W097 */
/* jshint -W117 */
'use strict';
const { createTransport } = require('nodemailer');

const log = require('debug')('@hafdon/sendmail');
const elog = log.extend('error')

// create reusable transporter object using the default SMTP transport
let transporter = null;
let configured = false;

module.exports.configure = function(configOpts) {
    try {
        transporter = createTransport(configOpts);
        configured = true
    } catch (e) {
        elog(e)
        throw new Error(`Error configuring transporter : ${e}`)
    }
};

module.exports.sendmail = async function({
    from,
    to,
    subject = '',
    text = '',
    html = '',
}) {
    if (!configured) {
        throw new Error(
            'Your transporter is not configured. Please use configure() method first.'
        );
    } else {
        let info = null;
        try {
            // send mail with defined transport object
            info = await transporter.sendMail({
                from,
                to,
                subject,
                text,
                html,
            });

            log(`Message sent: ${info.messageId}`);
            return info;
        } catch (error) {
            log(error);
            return Promise.reject({ error, info });
        }
    }
};
