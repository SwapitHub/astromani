const nodemailer = require("nodemailer");
// const transactionAdminAstr = require("../models/TranstionAdminAstroModel");

const sendRegistrationSuccessEmail = async (
  email,
  astrologerName,
  astrologerMobile
) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 465,
      secure: true,
      auth: {
        user: "info@demoprojectwork.com",
        pass: "bQ|4TcE+Py1",
      },
    });

    const mailOptions = {
      from: `"Astro App" <info@demoprojectwork.com>`,
      to: email,
      subject: "Registration Successful 🎉",
      html: `
        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top; background-color: #ffffff; margin: 0 auto;" width="600" >
    <tbody>
        <tr>
                  <td>
        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top; background-color: #f2f2f2;" width="100%" >
    <tbody>
        <tr>
            <td style="padding: 20px 0px;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background-color: #ffffff; width:100%; max-width: 600px;">
                    <tbody>
                        <tr>
                            <td style="font-family: Arial, Helvetica, sans-serif; padding: 20px;">
                                <h2>Hello ${astrologerName},</h2>
                                <h3>You can now log in using the mobile number: ${astrologerMobile}</h3>
                                <p>Thank you for registering with <strong>Astro App</strong>.</p>
                                <p>Your account has been successfully created and is currently under review.</p>
                                <p>We will notify you once your account has been activated.</p>
                                <br />
                                <p>Best regards,<br />The Astro App Team</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
</table>
</td>
        </tr>
    </tbody>
</table>

      `,
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error };
  }
};

const sendAdminAmountAstroSuccessEmail = async (
  paymentDate,
  email,
  Amount,
  Payment_Method,
  Transaction_id,
  astrologerName
) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 465,
      secure: true,
      auth: {
        user: "info@demoprojectwork.com",
        pass: "bQ|4TcE+Py1",
      },
    });

    const mailOptions = {
      from: `"Astro App" <info@demoprojectwork.com>`,
      to: email,
      subject: "Payment Received – Your Astrology Services 🎉",
      html: `
         <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top; background-color: #ffffff; margin: 0 auto;" width="600" >
    <tbody>
        <tr>
                  <td>
        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top; background-color: #f2f2f2;" width="100%" >
    <tbody>
        <tr>
                  <td style="font-family: Arial, Helvetica, sans-serif; padding: 20px;">

                    <h2>Hello ${astrologerName},</h2>

                    <p>We are happy to inform you that your payment has been <strong>successfully processed.</strong></p>

                    <h3>Payment Details</h3>

                    <p><strong>Amount:</strong> ₹${Amount}</p>
                    <p><strong>Payment Date:</strong> ${paymentDate}</p>
                    <p><strong>Payment Method:</strong> ${Payment_Method}</p>

                    <p><strong>Transaction ID:</strong> ${Transaction_id}</p>

                    <br />

                    <p>This payment is for your astrology services provided on our platform.</p>

                    <p>If you have any questions or need help, feel free to reply to this email.</p>

                    <br />

                    <p>Best regards,<br />The Astro App Team</p>

                  </td>
                </tr>
    </tbody>
</table>
</td>
                </tr>
    </tbody>
</table>

      `,
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error };
  }
};

const setSendRegistration = async (req, res) => {
  try {
    const { email, name, mobile } = req.body;

    // Basic validation
    if (!email || !name || !mobile) {
      return res
        .status(400)
        .json({ message: "Email, mobile and name are required." });
    }

    const result = await sendRegistrationSuccessEmail(email, name, mobile);

    if (result.success) {
      console.log("✅ Email sent successfully");
      return res
        .status(200)
        .json({ message: "Registration email sent successfully." });
    } else {
      console.error("❌ Email sending failed:", result.error);
      return res
        .status(500)
        .json({ message: "Failed to send email.", error: result.error });
    }
  } catch (error) {
    console.error("⚠️ Unexpected error:", error);
    res.status(500).json({ message: "Internal server error.", error });
  }
};

const sendEmailAdminTansAmountAstro = async (req, res) => {
  try {
    const { Amount, Payment_Method, Transaction_id, email, astrologerName } =
      req.body;

    // Payment date generate
    const paymentDate = new Date().toISOString().slice(0, 10);

    // Validation
    if (!email || !astrologerName || !Amount || !Transaction_id) {
      return res.status(400).json({
        message:
          "Email, astrologer name, amount and transaction ID are required.",
      });
    }

    // Call Email Service
    const result = await sendAdminAmountAstroSuccessEmail(
      paymentDate,
      email,
      Amount,
      Payment_Method,
      Transaction_id,
      astrologerName
    );

       // Save Transaction in DB
    // const transactionData = new transactionAdminAstr({
    //   paymentDate,
    //   email,
    //   Amount,
    //   Payment_Method,
    //   Transaction_id,
    //   astrologerName
    // });

    // await transactionData.save();

    if (result.success) {
      console.log("✅ Email sent successfully");
      return res.status(200).json({
        message: "Payment confirmation email sent successfully.",
      });
    } else {
      console.error("❌ Email sending failed:", result.error);
      return res.status(500).json({
        message: "Failed to send email.",
        error: result.error,
      });
    }
  } catch (error) {
    console.error("⚠️ Unexpected error:", error);
    res.status(500).json({
      message: "Internal server error.",
      error,
    });
  }
};

module.exports = { setSendRegistration, sendEmailAdminTansAmountAstro };
