"use client"

import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { mailchimp } from "@/resources";
import { Flex, Heading, Input, Text, Background, Column, Icon, Textarea, Button, Media, RadioButton } from "@once-ui-system/core";
import { opacity, SpacingToken } from "@once-ui-system/core";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    phone: '',
    bidPrice: '' // Added bidPrice to form data
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedPlan, setSelectedPlan] = useState(''); // State for radio buttons
  const [bidPriceError, setBidPriceError] = useState<string | null | boolean>(null); // State for bid price validation error

  const SERVICE_ID = 'service_v75amug'; // Your provided EmailJS Service ID
  const TEMPLATE_ID_ADMIN = 'template_unqc4m7'; // e.g., 'template_admin_contact'
  const TEMPLATE_ID_USER_CONFIRMATION = 'template_mp8tgwx'; // e.g., 'template_user_confirm'
  const PUBLIC_KEY = 'AcRk-xtMNtqCEbSNj'; // e.g., 'user_xxxxxxxxx' - Get this from EmailJS dashboard

  const ADMIN_EMAIL = 'muhammadarqam920@gmail.com';

  const validateEmail = (email: any) => {
    if (!email || email.trim() === '') {
      return "Email address cannot be empty.";
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      return "Please enter a valid email address (e.g., user@example.com).";
    }

    return null;
  };

  const validatePhoneNumber = (phoneNumber: any) => {
    if (!phoneNumber || phoneNumber.trim() === '') {
      return "Phone number cannot be empty.";
    }

    const phoneRegex = /^\+?[0-9\s\-()]{7,20}$/;
    if (!phoneRegex.test(phoneNumber)) {
      return "Please enter a valid phone number (e.g., +1 555-123-4567).";
    }
    return null;
  };

  // New validation for bid price
  const validateBidPrice = (price: any) => {
    if (selectedPlan === "Fixed Gig") { // Only validate if Fixed Gig is selected
      if (!price || price.trim() === '') {
        return "Bid Price cannot be empty for Fixed Gig.";
      }
      // Regex to allow only numbers, optional decimal point, and up to two decimal places
      const priceRegex = /^\d+(\.\d{1,2})?$/;
      if (!priceRegex.test(price)) {
        return "Please enter a valid price (e.g., 100 or 100.00).";
      }
    }
    return null;
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear specific errors when input changes
    if (name === 'bidPrice') {
      setBidPriceError(false);
    }
  };

  // Handler for radio button toggle
  const handlePlanToggle = (plan: string) => {
    setSelectedPlan(plan);
    // Clear bid price and its error if switching from Fixed Gig
    if (plan !== "Fixed Gig") {
      setFormData(prevData => ({ ...prevData, bidPrice: '' }));
      setBidPriceError(false);
    }
  };

  const sendEmailWithEmailJS = async (templateId: any, templateParams: any) => {
    try {
      const response = await emailjs.send(SERVICE_ID, templateId, templateParams, PUBLIC_KEY);
      console.log('EmailJS Success:', response.status, response.text);
      return true;
    } catch (error: any) { // Type 'any' for error for broader compatibility
      console.error('EmailJS Failed:', error);
      return false;
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');
    setBidPriceError(false); // Clear previous bid price error

    const { name, email, subject, message, phone, bidPrice } = formData;

    // Basic validation check for radio button selection
    if (!selectedPlan) {
      setErrorMessage("Please select a service type.");
      setLoading(false);
      return;
    }

    // Validate bid price if Fixed Gig is selected
    const bidPriceValidationError = validateBidPrice(bidPrice);
    if (bidPriceValidationError) {
      setBidPriceError(bidPriceValidationError);
      setLoading(false);
      return;
    }

    let adminMessage = `
      You have received a new contact form submission:

      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      Service Type: ${selectedPlan}
      Subject: ${subject}
      Message: ${message}
    `;

    if (selectedPlan === "Fixed Gig") {
      adminMessage += `\nBid Price: $${bidPrice}`;
    }

    const adminTemplateParams = {
      from_name: name,
      from_email: email,
      time: new Date().toLocaleString(), // Format date for readability
      to_email: ADMIN_EMAIL,
      subject: `New Query by "${name}" for "${subject}" (${selectedPlan})`, // Updated subject
      message: adminMessage,
      from_phone: phone,
      service_type: selectedPlan, // Include the selected service type
      bid_price: selectedPlan === "Fixed Gig" ? bidPrice : 'N/A' // Include bid price conditionally
    };

    const userConfirmationTemplateParams = {
      name: name,
      email: email,
      // Ensure your user confirmation template on EmailJS is set up to receive these variables
      // For example, if your template has {{name}} and {{email}}
    };

    try {
      const adminEmailSent = await sendEmailWithEmailJS(TEMPLATE_ID_ADMIN, adminTemplateParams);

      const userEmailSent = await sendEmailWithEmailJS(TEMPLATE_ID_USER_CONFIRMATION, userConfirmationTemplateParams);

      if (adminEmailSent && userEmailSent) {
        setSuccessMessage('Your message has been sent successfully! A confirmation has been sent to your email.');
        setFormData({ name: '', email: '', subject: '', message: '', phone: '', bidPrice: '' }); // Clear form including bidPrice
        setSelectedPlan(''); // Clear selected radio button
      } else {
        setErrorMessage('Failed to send your message. Please try again.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setErrorMessage('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Flex
        overflow="hidden"
        fillWidth
        padding="l"
        paddingY="xl"
        radius="l"
        marginY="l"
        horizontal="center"
        align="center"
        background="surface"
        border="neutral-alpha-weak"
        gap='l'
        mobileDirection='column'
      >
        <Column align="start" className='w-100 basis-full'>
          <Heading style={{ position: "relative" }} marginBottom="0" variant="display-strong-xs">
            Got Your Back
          </Heading>

          <Text
            style={{
              position: "relative",
              maxWidth: "var(--responsive-width-xs)",
            }}
            wrap="balance"
            marginBottom="l"
            onBackground="neutral-medium"
          >
            Building, Launching, and Growing Together
          </Text>

          <Media
            src='/images/contact.png' // Ensure this path exists in your data
            alt='Contact Us'
            // aspectRatio="16/9"
            style={{ height: '400px', borderRadius: '8px' }}
            objectFit='scale-down'
          />
        </Column>

        <Column className='h-fit'>
          <Column className='w-100 basis-full' radius="l">
            <Background
              top="0"
              radius="l"
              position="absolute"
              mask={{
                x: mailchimp.effects.mask.x,
                y: mailchimp.effects.mask.y,
                radius: mailchimp.effects.mask.radius,
                cursor: mailchimp.effects.mask.cursor
              }}
              gradient={{
                display: mailchimp.effects.gradient.display,
                opacity: mailchimp.effects.gradient.opacity as opacity,
                x: mailchimp.effects.gradient.x,
                y: mailchimp.effects.gradient.y,
                width: mailchimp.effects.gradient.width,
                height: mailchimp.effects.gradient.height,
                tilt: mailchimp.effects.gradient.tilt,
                colorStart: mailchimp.effects.gradient.colorStart,
                colorEnd: mailchimp.effects.gradient.colorEnd,
              }}
              dots={{
                display: mailchimp.effects.dots.display,
                opacity: mailchimp.effects.dots.opacity as opacity,
                size: mailchimp.effects.dots.size as SpacingToken,
                color: mailchimp.effects.dots.color,
              }}
              grid={{
                display: mailchimp.effects.grid.display,
                opacity: mailchimp.effects.grid.opacity as opacity,
                color: mailchimp.effects.grid.color,
                width: mailchimp.effects.grid.width,
                height: mailchimp.effects.grid.height,
              }}
              lines={{
                display: mailchimp.effects.lines.display,
                opacity: mailchimp.effects.lines.opacity as opacity,
                size: mailchimp.effects.lines.size as SpacingToken,
                thickness: mailchimp.effects.lines.thickness,
                angle: mailchimp.effects.lines.angle,
                color: mailchimp.effects.lines.color,
              }}
            />
          
            <form onSubmit={handleSubmit} style={{zIndex: '9'}} className='flex flex-col gap-y-4 p-20'>
              {/* Radio Button Group for Service Type */}
              <Column gap="s" marginBottom="m">
                <RadioButton
                  name="serviceType"
                  value="Staff Augmentation"
                  label="Staff Augmentation"
                  isChecked={selectedPlan === "Staff Augmentation"}
                  onToggle={() => handlePlanToggle("Staff Augmentation")}
                />
                <RadioButton
                  name="serviceType"
                  value="Fixed Gig"
                  label="Fixed Gig"
                  isChecked={selectedPlan === "Fixed Gig"}
                  onToggle={() => handlePlanToggle("Fixed Gig")}
                />
              </Column>

              {/* Conditional Bid Price Input */}
              {selectedPlan === "Fixed Gig" && (
                <Input
                  id="bidPrice"
                  type="text" // Use text type for price input to handle decimal points
                  name="bidPrice"
                  label="Bid Price (USD)"
                  value={formData.bidPrice}
                  onChange={(e) => handleChange(e)}
                  required
                  validate={validateBidPrice}
                  hasPrefix={
                    <Icon marginLeft="4" onBackground="neutral-weak" name="currencyDollar" size="xs" />
                  }
                />
              )}

              <Input
                id="name"
                type="text"
                name="name"
                label="Name"
                value={formData.name}
                onChange={(e) => handleChange(e)}
                required
                hasPrefix={
                  <Icon marginLeft="4" onBackground="neutral-weak" name="person" size="xs" />
                }
              />

              <Input
                id="email"
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) => handleChange(e)}
                required
                validate={validateEmail}
                hasPrefix={
                  <Icon marginLeft="4" onBackground="neutral-weak" name="email" size="xs" />
                }
              />

              <Input
                id="phone"
                label="Phone"
                type="text" // Changed to text as type="phone" is not standard HTML and once-ui might not support it directly
                name="phone"
                value={formData.phone}
                onChange={(e) => handleChange(e)}
                required
                validate={validatePhoneNumber}
                hasPrefix={
                  <Icon marginLeft="4" onBackground="neutral-weak" name="phone" size="xs" />
                }
              />

              <Input
                id="subject"
                type="text"
                name="subject"
                label="Subject"
                value={formData.subject}
                onChange={(e) => handleChange(e)}
                required
                hasPrefix={
                  <Icon marginLeft="4" onBackground="neutral-weak" name="mailBox" size="xs" />
                }
              />

              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={(e) => handleChange(e)}
                placeholder="Your message..."
              />

              {successMessage && (
                <Text
                  style={{
                    position: "relative",
                    color: "green",
                    maxWidth: "var(--responsive-width-xs)",
                  }}
                  wrap="balance"
                  marginBottom="l"
                  onBackground="neutral-medium"
                >
                  <strong className="">Success!</strong>
                  <span className=""> {successMessage}</span>
                </Text>
              )}

              {errorMessage && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                  <strong className="font-bold">Error!</strong>
                  <span className="block sm:inline"> {errorMessage}</span>
                </div>
              )}

              {loading ?
                <Button fillWidth type="submit" loading disabled={loading}>
                  Sending...
                </Button> :
                <Button fillWidth data-border="rounded" size="s" type="submit">Submit</Button>
              }
            </form>
          </Column>
        </Column>
      </Flex>
    </>
  )
}
