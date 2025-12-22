"use client"

import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { social } from "@/resources";
import { Flex, Heading, Input, Text, Background, Column, Icon, Textarea, Button, IconButton, Select, SmartLink } from "@once-ui-system/core";
import { DeveloperRoleSelector } from "./DeveloperRoleSelector";
import styles from "./contact.module.scss";

export default function HireDeveloperForm() {
  const [formData, setFormData] = useState({
    name: '', email: '', subject: '', message: '', phone: '', desiredBudget: '', timezone: 'GMT (UTC +0:00)',
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [budgetError, setBudgetError] = useState<string | null>(null);
  const SERVICE_ID = 'service_v75amug';
  const TEMPLATE_ID_ADMIN = 'template_unqc4m7';
  const TEMPLATE_ID_USER_CONFIRMATION = 'template_mp8tgwx';
  const PUBLIC_KEY = 'AcRk-xtMNtqCEbSNj';
  const brandColor = "#00ccccf0";
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
      message: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Timezone: ${formData.timezone}
        Desired Roles: ${selectedRoles.join(', ')}
        Budget: ${formData.desiredBudget}
        Message: ${message || 'N/A'}
      `,
      from_phone: phone,
      selected_roles: selectedRoles.join(', '),
      desired_budget: `${formData.desiredBudget}`,
      timezone: formData.timezone, // Added field
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
        setFormData({ 
          name: '', email: '', subject: '', message: '', phone: '', 
          desiredBudget: '', timezone: 'GMT (UTC +0:00)' 
        });        setSelectedRoles([]); // Clear selected roles
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
    <Flex
      fillWidth
      radius="xl"
      className={styles.contactContainer}
      mobileDirection="column"
      minHeight="104"
    >
      {/* LEFT SIDE: Brand & Info */}
      <Column 
        padding="48" 
        flex={4} 
        className={styles.infoSide}
        content="space-between"
      >
        <Column gap="24">
          <Flex direction="column" gap="8">
            <Text variant="label-strong-s" style={{ color: brandColor, letterSpacing: '0.2em' }}>
              GET STARTED
            </Text>
            <Heading variant="display-strong-s">
              Hire Your <span style={{ color: brandColor }}>Dream Team</span>
            </Heading>
            <Text variant="body-default-m" onBackground="neutral-weak">
              Propel your project forward with specialized talent.
            </Text>
          </Flex>

          <Column gap="32" marginTop="40">
            {[
              { icon: 'location', label: 'Office', value: '35 Herkley Dr, Brampton, ON', link: 'https://maps.google.com' },
              { icon: 'phone', label: 'Call Us', value: '+1 (437) 450‑9656', link: 'tel:+14374509656' },
              { icon: 'email', label: 'Email', value: 'query@algocrew.io', link: 'mailto:query@algocrew.io' }
            ].map((item, idx) => (
              <Flex key={idx} gap="16" align="center">
                <Flex 
                  background="neutral-alpha-weak" 
                  padding="12" 
                  radius="m" 
                  className={styles.brandGlow}
                >
                  <Icon name={item.icon} size="s" />
                </Flex>
                <Column>
                  <Text variant="label-strong-xs" onBackground="neutral-medium" align='start'>{item.label}</Text>
                  <SmartLink href={item.link}>
                    <Text variant="body-default-s" weight="strong" align='start'>{item.value}</Text>
                  </SmartLink>
                </Column>
              </Flex>
            ))}
          </Column>
        </Column>

        <Flex gap="12" marginTop="48">
          {social.map((item) => (
            <IconButton
              key={item.name}
              href={item.link}
              icon={item.icon}
              size="m"
              variant="ghost"
              style={{ borderRadius: '50%', border: '1px solid rgba(var(--neutral-border-rgb), 0.1)' }}
            />
          ))}
        </Flex>
      </Column>

      {/* RIGHT SIDE: Interactive Form */}
      <Column 
        padding="48" 
        flex={7} 
        className={styles.formSide}
        position="relative"
      >
        {/* Modern Background Texture */}
        <Background dots={{ display: true, opacity: 10, size: '2', color: brandColor }} />

        <form onSubmit={handleSubmit} style={{ position: 'relative', zIndex: 10 }}>
          <Column gap="24">
            <DeveloperRoleSelector
              selectedRoles={selectedRoles}
              onRolesChange={setSelectedRoles}
              errorMessage={errorMessage}
            />

            <Flex gap="20" mobileDirection="column">
                <Flex flex={1}>
                    <Input
                        id="desiredBudget"
                        type="number"
                        name="desiredBudget"
                        label="Monthly Budget (USD)"
                        value={formData.desiredBudget}
                        onChange={handleChange}
                        required
                        hasPrefix={<Icon name="dollar" size="xs" style={{color: brandColor}} />}
                    />
                </Flex>
                <Flex flex={1}>
                    <Select
                        id="timezone"
                        label="Your Timezone"
                        value={formData.timezone}
                        onSelect={(v) => setFormData({ ...formData, timezone: v })}
                        options={[
                            { label: "GMT (UTC +0:00)", value: "GMT" },
                            { label: "EST (UTC -5:00)", value: "EST" },
                            { label: "PST (UTC -8:00)", value: "PST" },
                            { label: "GST (UTC +4:00)", value: "GST" },
                        ]}
                    />
                </Flex>
            </Flex>

            <Flex gap="20" mobileDirection="column">
                <Input
                    className={styles.inputGroup}
                    id="name"
                    name="name"
                    label="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <Input
                    className={styles.inputGroup}
                    id="email"
                    name="email"
                    label="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </Flex>

            <Input
                id="phone"
                name="phone"
                label="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
            />

            <Textarea
                id="message"
                name="message"
                label="Project Brief"
                placeholder="Briefly describe your goals..."
                value={formData.message}
                onChange={handleChange}
            />

            {successMessage && (
               <Flex background="brand-alpha-weak" padding="16" radius="m" border="brand-alpha-medium">
                  <Text variant="body-default-s" color="green-strong">✓ {successMessage}</Text>
               </Flex>
            )}

            <Button 
                fillWidth 
                size="l" 
                type="submit" 
                loading={loading}
                style={{ 
                    background: brandColor, 
                    color: 'white', 
                    fontWeight: 'bold',
                    boxShadow: `0 10px 20px -5px rgba(0, 204, 204, 0.3)`
                }}
            >
              Submit Project Inquiry
            </Button>
          </Column>
        </form>
      </Column>
    </Flex>
  )
}