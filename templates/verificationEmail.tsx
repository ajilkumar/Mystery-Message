import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Heading,
  Text,
  Section,
  Hr,
  Tailwind,
} from "@react-email/components";

interface VerificationEmailProps {
  userName?: string;
  otp: string;
}

export default function VerificationEmail({
  userName,
  otp,
}: VerificationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your verification code for account sign-in</Preview>
      <Tailwind>
        <Body className="bg-gray-50 font-sans">
          <Container className="bg-white max-w-md mx-auto my-10 rounded-lg p-8 shadow-sm border border-gray-200">
            <Heading className="text-2xl font-semibold text-center text-gray-900 mb-6">
              Verify Your Email Address
            </Heading>

            <Text className="text-gray-700 text-base mb-4">
              {userName ? `Hi ${userName},` : "Hi,"}
            </Text>

            <Text className="text-gray-700 text-base mb-6">
              Thank you for signing up! Please use the following verification
              code to complete your email verification. This code will expire in
              10 minutes.
            </Text>

            <Section className="bg-blue-50 text-center py-4 rounded-md mb-6">
              <Text className="text-3xl font-bold tracking-widest text-blue-600">
                {otp}
              </Text>
            </Section>

            <Text className="text-gray-600 text-sm">
              If you didn’t request this email, you can safely ignore it.
            </Text>

            <Hr className="my-8 border-gray-200" />

            <Text className="text-xs text-center text-gray-400">
              © {new Date().getFullYear()} Your Company. All rights reserved.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
