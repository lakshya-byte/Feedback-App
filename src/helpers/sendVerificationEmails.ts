// Importing the 'resend' library, which is used to send emails
import { resend } from "@/lib/resend";

// Importing the React component that generates the verification email's content
import VerificationEmail from "../../emails/VerificationEmail";

// Importing the ApiResponse type to structure the response
import { ApiResponse } from "@/types/ApiResponse";

// This function sends a verification email using the 'resend' service.
// It accepts the user's email, username, and verification code as parameters and returns an ApiResponse object.
export async function sendVerificationEmail(
  email: string,      // The email address where the verification email will be sent
  username: string,   // The username of the user to personalize the email
  verifyCode: string, // The verification code to be included in the email
): Promise<ApiResponse> {
  try {
    // Calling the resend library's 'emails.send' method to send an email.
    await resend.emails.send({
      from: "onboarding@resend.dev", // Sender email address (a default or business email)
      to: email,                     // The recipient's email address (user's email)
      subject: "mystry message | verification code", // Subject of the email
      // The 'react' property uses the 'VerificationEmail' React component to create the email content.
      // The component is passed the username and the OTP (verification code) for a personalized message.
      react: VerificationEmail({ username, otp: verifyCode }),
    });

    // If the email was successfully sent, return a success ApiResponse
    return { success: true, message: "verification email successfully sent" };
  } catch (emailError) {
    // If there was an error while sending the email, log the error to the console
    console.error("Error sending verification email", emailError);

    // Return a failure ApiResponse with a corresponding error message
    return { success: false, message: "failed to send verification email" };
  }
}
