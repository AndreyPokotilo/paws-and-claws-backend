const nodemailer = require("nodemailer");
const { META_PASSWORD, BASE_URL, SENDGRID_API_KEY } = process.env;
const { nodemailerConfig } = require("../config");

const sgMail = require("@sendgrid/mail");

class EmailServise {
  constructor() {
    this.transporter = nodemailer.createTransport(nodemailerConfig);
    this.sendGrid = sgMail.setApiKey(SENDGRID_API_KEY);
  }

  async sendEmail(data) {
    try {
      if (data) {
        const resetPass = {
          from: "kardmitriy@gmail.com",
          to: data.email,
          subject: " Pawlaws",
          html: `<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@200;300;600&family=Manrope:wght@400;500;600&family=Raleway:wght@700&family=Roboto:wght@400;500&display=swap"
        rel="stylesheet">

    <style>
        body {
            width: 100% !important;
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
            margin: 0;
            padding: 0;
            line-height: 100%;
        }

        table td {
            border-collapse: collapse;


        }

        table {
            border-collapse: collapse;

        }


        p {
            margin: 0;
            padding: 0;
            font-family: 'Inter', sans-serif;
            font-weight: 300;
            font-size: 16px;

        }



        img {
            outline: none;
            text-decoration: none;
            border: none;
            -ms-interpolation-mode: bicubic;
            max-width: 100% !important;
            margin: 0;
            padding: 0;
            display: block;
        }

        .icon-foot-td {
            padding-right: 10px;

        }

        .main-table {
            max-width: 600px;
            width: 100%;
        }





        .main-td {
            padding-left: 20px;
            padding-top: 20px;
            padding-bottom: 20px;
        }

        .main-info-td {
            padding-bottom: 20px;
        }

        .user-info-td {
            padding-bottom: 10px;
        }

        .simple-text {
            color: #000000;

        }

        .foot-logo {

            min-width: 25px !important
        }
    </style>
</head>

<body>
    <table style="width: 100%;" bgcolor="#F3ECDC" cellpadding="0" cellspacing="0">
        <tr>
            <td class="main-td">
                <table class="main-table" border="0" cellpadding="0" cellspacing="0" style="margin:0; padding:0">
                    <tr>
                        <td class="main-info-td">
                            <p class="simple-text">Привіт, <span style="color: orange;">${data.name}</span>!</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p class="simple-text">Ми отримали запит на відновлення пароля для вашого облікового запису
                                в </p>
                        </td>
                    </tr>
                    <tr>
                        <td class="main-info-td">
                            <p style="color: #B2AB73;">Paws & Claws</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p class="simple-text">
                                Щоб створити новий пароль, перейдіть за цим посиланням:
                            </p>

                        </td>
                    </tr>
                    <tr>
                        <td class="main-info-td">
                            <a class="simple-text"
                                style="color: #000000; font-size: 16px;    font-family: 'Inter', sans-serif;"
                                target="_blank"
                                href="https://paws-and-claws-store.github.io/frontend/newpass?token=${data.resetPasswordToken}">
                                посилання на відновлення пароля</a>
                        </td>
                    </tr>
                    <tr>
                        <td class="main-info-td">
                            <table border="0" cellpadding="0" cellspacing="0" style="margin:0; padding:0">
                                <tr>
                                    <td style="padding-right: 8px;">
                                        <img class="foot-logo"
                                            src="https://res.cloudinary.com/dtwrxerft/image/upload/v1705160188/Property_1_finish_wiouv8.png"
                                            alt="icon-foot-1" width="25">
                                    </td>
                                    <td>
                                        <p class="simple-text">Звертаємо вашу увагу на те, що це посилання дійсне
                                            протягом <b>1 години.</b></p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td class="main-info-td">
                            <p class="simple-text">Повертайтеся до нас якнайшвидше!
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p class="simple-text">З найкращими побажаннями</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <table border="0" cellpadding="0" cellspacing="0" style="margin:0; padding:0">
                                <tr>
                                    <td>
                                        <table border="0" cellpadding="0" cellspacing="0" style="margin:0; padding:0">
                                            <tr>
                                                <td style="padding-right:  1em; ">
                                                    <p class="simple-text">Команда</p>
                                                </td>
                                                <td><img src="https://res.cloudinary.com/dtwrxerft/image/upload/v1704464171/Collar_ptvg34.png"
                                                        width="33" style="display: block; margin: 0 auto;" alt="Logo">
                                                </td>
                                                <td>
                                                    <p class="simple-text" style="margin: 0;">Paws & Claws</p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>

    </td>
    </tr>
    </table>





</body>

</html>
    `,
        };

        await this.sendGrid.send(resetPass);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async sendActivateEmail(data) {
    const email = {
      from: "kardmitriy@gmail.com",
      to: data.email,
      subject: "Підтвердження реєстрації в Paws & Claws",
      html: `<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        body {
            width: 100% !important;
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
            margin: 0;
            padding: 0;
            line-height: 100%;
        }

        table td {
            border-collapse: collapse;


        }

        table {
            border-collapse: collapse;

        }


        p {
            margin: 0;
            padding: 0;
            font-family: 'Inter', sans-serif;

        }



        img {
            outline: none;
            text-decoration: none;
            border: none;
            -ms-interpolation-mode: bicubic;
            max-width: 100% !important;
            margin: 0;
            padding: 0;
            display: block;
        }

        .icon-foot-td {
            padding-right: 10px;

        }

        .main-table {
            max-width: 600px;
            width: 100%;
        }





        .main-td {
            padding-left: 20px;
            padding-top: 20px;
            padding-bottom: 20px;
        }

        .main-info-td {
            padding-bottom: 20px;
        }

        .user-info-td {
            padding-bottom: 10px;
        }

        .simple-text {
            color: #000000;
            font-size: 16px;
        }
    </style>
</head>

<body>
    <table style="width: 100%;" bgcolor="#F3ECDC" cellpadding="0" cellspacing="0">
        <tr>
            <td>
                <table class="main-table">
                    <tr>
                        <td style="padding-left: 20px; padding-top: 20px; padding-bottom: 20px;">
                            <table>
                                <tr>
                                    <td class="main-info-td">
                                        <p class="simple-text">Привіт, <span style="color: orange;">${data.name}</span>!
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="main-info-td">
                                        <p class="simple-text">Дякуємо за те що, обрали наш магазин для свого улюбленця.
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p class="simple-text">Щоб завершити процес реєстрації в <span
                                                style="color: #B2AB73;">Paws &
                                                Claws</span>,
                                            перейдіть за
                                        </p>
                                        <p class="simple-text">
                                            цим посиланням:
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="main-info-td">
                                        <a class="simple-text" style="color: #0e1111; font-size: 18px;" target="_blank"
                                            href="${BASE_URL}/api/auth/verify/${data.verificationCode}">
                                            підтвердити реєстрацію</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>

                                        <p class="simple-text">Ваші реєстраційні дані</p>

                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <table border="0" cellpadding="0" cellspacing="0" style="margin:0; padding:0">
                                            <tr>

                                                <td class="icon-foot-td">
                                                    <img src="https://res.cloudinary.com/dtwrxerft/image/upload/v1705160188/Property_1_finish_wiouv8.png"
                                                        alt="icon-foot-1" width="20">
                                                </td>
                                                <td>
                                                    <p class="simple-text">Ім' я: <span>${data.name}</span></p>
                                                </td>

                                            </tr>
                                        </table>

                                    </td>
                                </tr>
                                <tr>
                                    <td class="main-info-td">
                                        <table border="0" cellpadding="0" cellspacing="0" style="margin:0; padding:0">
                                            <tr>
                                                <td class="icon-foot-td">
                                                    <img src="https://res.cloudinary.com/dtwrxerft/image/upload/v1705160188/Property_1_finish_wiouv8.png"
                                                        alt="icon-foot-2" width="20">
                                                </td>
                                                <td>
                                                    <p class="simple-text">Email: ${data.email}</p>
                                                </td>
                                            </tr>
                                        </table>

                                    </td>
                                </tr>
                                <tr>
                                    <td class="main-info-td">
                                        <p class="simple-text">Приємних покупок!</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p class="simple-text">З найкращими побажаннями</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <table border="0" cellpadding="0" cellspacing="0" style="margin:0; padding:0">
                                            <tr>
                                                <td>
                                                    <table border="0" cellpadding="0" cellspacing="0"
                                                        style="margin:0; padding:0">
                                                        <tr>
                                                            <td style="padding-right: 8px;">
                                                                <p class="simple-text">Команда</p>
                                                            </td>
                                                            <td style="padding-right: 4px;"><img
                                                                    src="https://res.cloudinary.com/dtwrxerft/image/upload/v1704464171/Collar_ptvg34.png"
                                                                    width="35" style="display: block; margin: 0 auto;"
                                                                    alt="Logo">
                                                            </td>
                                                            <td>
                                                                <p class="simple-text" style="margin: 0;">Paws & Claws
                                                                </p>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>

            </td>
        </tr>
    </table>





</body>

</html>
`,
    };
    await this.sendGrid.send(email);
  }
}

module.exports = new EmailServise();
