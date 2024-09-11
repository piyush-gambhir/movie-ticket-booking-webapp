import * as React from "react";
import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

export default function BookingConfirmationEmail({
  movieTitle,
  showTime,
  cinemaName,
  seats,
  bookingReference,
  customerName,
}) {
  return (
    <Html>
      <Head />
      <Preview>{`Your booking for ${movieTitle} is confirmed!`}</Preview>
      <Tailwind>
        <React.Fragment>
          <Body className="mx-auto my-auto bg-gray-100 font-sans">
            <Container className="mx-auto my-[40px] w-[465px] rounded-lg bg-white p-[20px] shadow-lg">
              <Section className="mb-[32px] mt-[32px] text-center">
                <Img
                  src="https://example.com/logo.png" // Replace with your logo URL
                  alt="Cinema Logo"
                  className="mx-auto mb-4 w-[100px]"
                />
                <Text className="text-[18px] font-bold leading-[24px] text-gray-800">
                  Booking Confirmation
                </Text>
              </Section>
              <Text className="mb-4 text-[16px] leading-[24px] text-gray-700">
                Hi {customerName},
              </Text>
              <Text className="mb-6 text-[16px] leading-[24px] text-gray-700">
                Your booking for <strong>{movieTitle}</strong> has been
                confirmed! Get ready to enjoy your movie experience.
              </Text>
              <Hr className="mx-0 my-[20px] w-full border border-solid border-gray-300" />
              <Section>
                <Text className="mb-2 text-[14px] font-medium text-gray-800">
                  Booking Details:
                </Text>
                <Text className="mb-1 text-[14px] text-gray-700">
                  <strong>Movie:</strong> {movieTitle}
                </Text>
                <Text className="mb-1 text-[14px] text-gray-700">
                  <strong>Cinema:</strong> {cinemaName}
                </Text>
                <Text className="mb-1 text-[14px] text-gray-700">
                  <strong>Show Time:</strong> {showTime}
                </Text>
                <Text className="mb-1 text-[14px] text-gray-700">
                  <strong>Seats:</strong> {seats.join(", ")}
                </Text>
                <Text className="mb-1 text-[14px] text-gray-700">
                  <strong>Booking Reference:</strong> {bookingReference}
                </Text>
              </Section>
              <Hr className="mx-0 my-[20px] w-full border border-solid border-gray-300" />
              <Text className="mt-4 text-center text-[12px] leading-[24px] text-gray-400">
                Thank you for booking with us! Enjoy the movie.
              </Text>
              <Text className="mt-4 text-center text-[12px] leading-[24px] text-gray-400">
                If you have any questions, feel free to{" "}
                <Link
                  href="https://example.com/support"
                  className="text-blue-600 underline"
                >
                  contact us
                </Link>
                .
              </Text>
              <Hr className="mx-0 my-[20px] w-full border border-solid border-gray-300" />
              <Text className="mt-2 text-center text-[12px] leading-[24px] text-gray-400">
                MovieBooking.com
              </Text>
            </Container>
          </Body>
        </React.Fragment>
      </Tailwind>
    </Html>
  );
}
