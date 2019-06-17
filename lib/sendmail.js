/* jshint -W097 */
/* jshint -W117 */
'use strict';
const { createTransport } = require('nodemailer');

const log = require('debug')('@hafdon/sendmail');

// create reusable transporter object using the default SMTP transport
let transporter = null;

module.exports.configure = function(configOpts) {
    transporter = createTransport(configOpts);
};

const configured = function() {
    return transporter !== null;
};

module.exports.sendmail = async function({
    from,
    to,
    subject = '',
    text = '',
    html = '',
}) {
    if (!configured()) {
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
