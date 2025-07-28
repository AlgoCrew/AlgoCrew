// pages/Home.tsx or wherever HireDeveloperForm is located
"use client"

import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { mailchimp, social } from "@/resources";
import { Flex, Heading, Input, Text, Background, Column, Icon, Textarea, Button, IconButton, Select, SmartLink } from "@once-ui-system/core";
import { opacity, SpacingToken } from "@once-ui-system/core";

// Import the new component
import { DeveloperRoleSelector } from "./DeveloperRoleSelector"; // Adjust path as needed

export default function HireDeveloperForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    phone: '',
    desiredBudget: '',
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]); // This state remains in the parent
  const [budgetError, setBudgetError] = useState<string | null>(null);

  const SERVICE_ID = 'service_v75amug';
  const TEMPLATE_ID_ADMIN = 'template_unqc4m7';
  const TEMPLATE_ID_USER_CONFIRMATION = 'template_mp8tgwx';
  const PUBLIC_KEY = 'AcRk-xtMNtqCEbSNj';

  const ADMIN_EMAIL = 'muhammadarqam920@gmail.com';

  const MIN_BUDGET_PER_DEV = 2500;

  // Effect to clear general error message when roles are selected/deselected
  useEffect(() => {
    if (selectedRoles.length > 0 && errorMessage.includes("Please select at least one developer role.")) {
      setErrorMessage('');
    }
  }, [selectedRoles, errorMessage]);

  const validateEmail = (email: string) => {
    if (!email || email.trim() === '') {
      return "Email address cannot be empty.";
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address (e.g., user@example.com).";
    }
    return null;
  };

  const validatePhoneNumber = (phoneNumber: string) => {
    if (!phoneNumber || phoneNumber.trim() === '') {
      return "Phone number cannot be empty.";
    }
    const phoneRegex = /^\+?[0-9\s\-()]{7,20}$/;
    if (!phoneRegex.test(phoneNumber)) {
      return "Please enter a valid phone number (e.g., +1 555-123-4567).";
    }
    return null;
  };

  const validateDesiredBudget = (budget: string, numberOfDevelopers: number) => {
    if (!budget || budget.trim() === '') {
      return "Desired Budget cannot be empty.";
    }
    const parsedBudget = parseFloat(budget);
    if (isNaN(parsedBudget) || parsedBudget <= 0) {
      return "Please enter a valid positive number for the budget.";
    }

    // const requiredMinBudget = numberOfDevelopers * MIN_BUDGET_PER_DEV;
    // if (numberOfDevelopers > 0 && parsedBudget < requiredMinBudget) {
    //   return `Minimum budget required is $${requiredMinBudget} for ${numberOfDevelopers} developer(s).`;
    // }
    return null;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (name === 'desiredBudget') {
      setBudgetError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');
    setBudgetError(null);

    const { name, email, subject, message, phone, desiredBudget } = formData;

    if (selectedRoles.length === 0) {
      setErrorMessage("Please select at least one developer role.");
      setLoading(false);
      return;
    }

    const numberOfDevelopers = selectedRoles.length;
    const budgetValidationError = validateDesiredBudget(desiredBudget, numberOfDevelopers);
    if (budgetValidationError) {
      setBudgetError(budgetValidationError);
      setLoading(false);
      return;
    }

    let adminMessage = `
      You have received a new "Hire a Developer" request:

      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      Desired Roles: ${selectedRoles.join(', ')}
      Desired Budget: $${desiredBudget}
      Message/Description: ${message || 'N/A'}
    `;
    if (subject) {
      adminMessage += `\nSubject: ${subject}`;
    }

    const adminTemplateParams = {
      from_name: name,
      from_email: email,
      time: new Date().toLocaleString(),
      to_email: ADMIN_EMAIL,
      subject: `New Developer Hire Inquiry by "${name}"`,
      message: adminMessage,
      from_phone: phone,
      selected_roles: selectedRoles.join(', '),
      desired_budget: `$${desiredBudget}`,
    };

    const userConfirmationTemplateParams = {
      name: name,
      email: email,
      selected_roles: selectedRoles.join(', '),
      desired_budget: `$${desiredBudget}`,
    };

    try {
      const adminEmailSent = await emailjs.send(SERVICE_ID, TEMPLATE_ID_ADMIN, adminTemplateParams, PUBLIC_KEY);
      const userEmailSent = await emailjs.send(SERVICE_ID, TEMPLATE_ID_USER_CONFIRMATION, userConfirmationTemplateParams, PUBLIC_KEY);

      if (adminEmailSent && userEmailSent) {
        setSuccessMessage('Your request has been sent successfully! A confirmation has been sent to your email.');
        setFormData({ name: '', email: '', subject: '', message: '', phone: '', desiredBudget: '' });
        setSelectedRoles([]); // Clear selected roles
      } else {
        setErrorMessage('Failed to send your request. Please try again.');
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
        <Column align="start" className='md:w-100 basis-full' marginBottom="l">
          <Heading style={{ position: "relative" }} marginBottom="0" variant="display-strong-xs">
            Hire Your Dream Team
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
            Tell us about your project needs, and we will help you find the perfect developers.
          </Text>

          <Heading style={{ position: "relative" }} marginBottom="0" variant="body-strong-xl">
            <Icon name="location" size='xs' className='pe-1'></Icon>
            Location
          </Heading>

          <Text
            style={{
              position: "relative",
              maxWidth: "var(--responsive-width-xs)",
            }}
            wrap="balance"
            marginBottom="m"
            marginLeft="20"
            onBackground="neutral-medium"
            variant="body-default-s"
          >
            <SmartLink href={'https://www.google.com/maps/search/?api=1&query=35+Herkley+Dr,+Brampton,+Ontario+L6V+2E7,+Canada'}>
              <Text onBackground="neutral-medium">
                35 Herkley Dr, Brampton, Ontario L6V 2E7, Canada
              </Text>
            </SmartLink>
          </Text>

          <Heading style={{ position: "relative" }} marginBottom="0" variant="body-strong-xl">
            <Icon name="phone" size='xs' className='pe-1'></Icon>
            Phone
          </Heading>

          <Text
            style={{
              position: "relative",
              maxWidth: "var(--responsive-width-xs)",
            }}
            wrap="balance"
            marginBottom="m"
            marginLeft="20"
            onBackground="neutral-medium"
            variant="body-default-s"
          >
            <SmartLink href={'tel:+1 (437) 383‑6794'}>
              <Text onBackground="neutral-medium">
                +1 (437) 383‑6794
              </Text>
            </SmartLink>
          </Text>

          <Heading style={{ position: "relative" }} marginBottom="0" variant="body-strong-xl">
            <Icon name="email" size='xs' className='pe-1'></Icon>
            Email
          </Heading>

          <Text
            style={{
              position: "relative",
              maxWidth: "var(--responsive-width-xs)",
            }}
            wrap="balance"
            marginLeft="20"
            onBackground="neutral-medium"
            variant="body-default-s"
          >
            <SmartLink href={'mailto:info@algocrew.io'}>
              <Text onBackground="neutral-medium">
                info@algocrew.io
              </Text>
            </SmartLink>
          </Text>

          <Heading style={{ position: "relative" }} marginTop="m" variant="body-strong-xl">
            <Icon name="social" size='xs' className='pe-1'></Icon>
            Follow Us
          </Heading>

          <Flex gap="16" marginLeft="20" marginTop="4">
            {social.slice(0, 2).map(
              (item) =>
                item.link && (
                  <IconButton
                    key={item.name}
                    href={item.link}
                    icon={item.icon}
                    tooltip={item.name}
                    size="s"
                    variant="ghost"
                  ></IconButton>
                ),
            )}
          </Flex>

          {/* <Media
            src='/images/contact.png' // Ensure this path exists in your data
            alt='Contact Us'
            style={{ height: '400px', borderRadius: '8px' }}
            objectFit='scale-down'
          /> */}
        </Column>

        <Column className='h-fit md:w-100 basis-full'>
          <Column className='' radius="l">
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

            <form onSubmit={handleSubmit} style={{ zIndex: '9' }} className='flex flex-col gap-y-4 p-20'>
              {/* Using the new component */}
              {/* <Heading variant="heading-strong-xs" marginBottom="s">
                Select Developer Roles
              </Heading> */}
              <DeveloperRoleSelector
                selectedRoles={selectedRoles}
                onRolesChange={setSelectedRoles} // Pass the state setter directly
                errorMessage={errorMessage} // Pass down the error message
              />

              <Input
                id="desiredBudget"
                type="number"
                name="desiredBudget"
                label="Desired Monthly Budget (USD)"
                value={formData.desiredBudget}
                onChange={handleChange}
                required
                validate={() => validateDesiredBudget(formData.desiredBudget, selectedRoles.length)}
                hasPrefix={
                  <Icon marginLeft="4" onBackground="neutral-weak" name="dollar" size="xs" />
                }
              />
              {budgetError && (
                <Text color="red-500" marginTop="s">{budgetError}</Text>
              )}

              <Input
                id="name"
                type="text"
                name="name"
                label="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                hasPrefix={
                  <Icon marginLeft="4" onBackground="neutral-weak" name="person" size="xs" />
                }
              />

              <Input
                id="email"
                label="Your Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                hasPrefix={
                  <Icon marginLeft="4" onBackground="neutral-weak" name="email" size="xs" />
                }
              />

              <Input
                id="phone"
                label="Your Phone Number"
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                hasPrefix={
                  <Icon marginLeft="4" onBackground="neutral-weak" name="phone" size="xs" />
                }
              />

              <Input
                id="subject"
                type="text"
                name="subject"
                label="Project Subject/Title (Optional)"
                value={formData.subject}
                onChange={handleChange}
                hasPrefix={
                  <Icon marginLeft="4" onBackground="neutral-weak" name="mailBox" size="xs" />
                }
              />

              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us more about your project and specific requirements..."
                label="Project Description"
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

              {errorMessage && !errorMessage.includes("Please select at least one developer role.") && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                  <strong className="font-bold">Error!</strong>
                  <span className="block sm:inline"> {errorMessage}</span>
                </div>
              )}

              {loading ?
                <Button fillWidth type="submit" loading disabled={loading}>
                  Sending Your Request...
                </Button> :
                <Button fillWidth data-border="rounded" size="s" type="submit">Submit Request</Button>
              }
            </form>
          </Column>
        </Column>
      </Flex>
    </>
  )
}
