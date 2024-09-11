import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({ email, subject, body }) {
  const { error } = await resend.emails.send({
    from: "Movie Ticket Booking WebApp<noreply@movie-ticket-booking-webapp.piyushgambhir.com>",
    to: email,
    subject,
    react: <>{body}</>,
  });

  if (error) {
    throw error;
  }
}
