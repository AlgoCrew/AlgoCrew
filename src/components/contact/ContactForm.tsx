"use client";

import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { social } from "@/resources";
import { Flex, Heading, Input, Text, Background, Column, Icon, Textarea, Button, IconButton, Select, SmartLink } from "@once-ui-system/core";
import styles from "./contact.module.scss"; // Using the same styles for consistency

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '', email: '', subject: '', message: '', phone: '', bidPrice: ''
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('');
  
  const brandColor = "#06c8e8";
  const SERVICE_ID = 'service_v75amug';
  const TEMPLATE_ID_ADMIN = 'template_unqc4m7';
  const TEMPLATE_ID_USER_CONFIRMATION = 'template_mp8tgwx';
  const PUBLIC_KEY = 'AcRk-xtMNtqCEbSNj';
  const ADMIN_EMAIL = 'muhammadarqam920@gmail.com';

  const handlePlanToggle = (plan: string) => {
    setSelectedPlan(plan);
    if (plan !== "Fixed-Price Project") {
      setFormData(prev => ({ ...prev, bidPrice: '' }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlan) {
      setErrorMessage("Please select a service type.");
      return;
    }
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    const adminTemplateParams = {
      from_name: formData.name,
      from_email: formData.email,
      time: new Date().toLocaleString(),
      to_email: ADMIN_EMAIL,
      subject: `General Inquiry: ${formData.subject} (${selectedPlan})`,
      message: `
        Service: ${selectedPlan}
        Bid: ${formData.bidPrice || 'N/A'}
        Message: ${formData.message}
      `,
      from_phone: formData.phone,
    };

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID_ADMIN, adminTemplateParams, PUBLIC_KEY);
      await emailjs.send(SERVICE_ID, TEMPLATE_ID_USER_CONFIRMATION, { name: formData.name, email: formData.email }, PUBLIC_KEY);
      
      setSuccessMessage('Message sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '', phone: '', bidPrice: '' });
      setSelectedPlan('');
    } catch (error) {
      setErrorMessage('Unexpected error. Please try again.');
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
      {/* LEFT PANEL: Contact Information */}
      <Column padding="48" flex={4} className={styles.infoSide} content="space-between">
        <Column gap="24">
          <Flex direction="column" gap="8">
            <Text variant="label-strong-s" style={{ color: brandColor, letterSpacing: '0.2em' }}>
              CONTACT US
            </Text>
            <Heading variant="display-strong-s">
              Got Your <span style={{ color: brandColor }}>Back</span>
            </Heading>
            <Text variant="body-default-m" onBackground="neutral-weak">
              Building, Launching, and Growing Together.
            </Text>
          </Flex>

          <Column gap="32" marginTop="40">
            {[
              { icon: 'location', label: 'Office', value: 'Brampton, Ontario L6V 2E7', link: '#' },
              { icon: 'phone', label: 'Call Us', value: '+1 (437) 450-9656', link: 'tel:+14374509656' },
              { icon: 'email', label: 'Email', value: 'query@algocrew.io', link: 'mailto:query@algocrew.io' }
            ].map((item, idx) => (
              <Flex key={idx} gap="16" align="center">
                <Flex background="neutral-alpha-weak" padding="12" radius="m" className={styles.brandGlow}>
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
          {social.slice(0, 3).map((item) => (
            <IconButton key={item.name} href={item.link} icon={item.icon} size="m" variant="ghost" style={{ borderRadius: '50%', border: '1px solid rgba(var(--neutral-border-rgb), 0.1)' }} />
          ))}
        </Flex>
      </Column>

      {/* RIGHT PANEL: The Form */}
      <Column padding="48" flex={7} className={styles.formSide} position="relative">
        <Background dots={{ display: true, opacity: 10, size: '2', color: brandColor }} />
        
        <form onSubmit={handleSubmit} style={{ position: 'relative', zIndex: 10 }}>
          <Column gap="24">
            <Select
              id="service-type"
              label="Choose a service"
              value={selectedPlan}
              onSelect={handlePlanToggle}
              hasPrefix={<Icon name="rocket" size="xs" style={{color: brandColor}} />}
              options={[
                { label: "Staff Augmentation", value: "Staff Augmentation" },
                { label: "Dedicated Team", value: "Dedicated Team" },
                { label: "Fixed-Price Project", value: "Fixed-Price Project" },
                { label: "IT Consulting", value: "IT Consulting/Advisory" },
                { label: "General Inquiry", value: "General Inquiry" },
              ]}
            />

            {selectedPlan === "Fixed-Price Project" && (
              <Input
                id="bidPrice"
                name="bidPrice"
                label="Bid Price (USD)"
                value={formData.bidPrice}
                onChange={handleChange}
                required
                hasPrefix={<Icon name="dollar" size="xs" style={{color: brandColor}} />}
              />
            )}

            <Flex gap="20" mobileDirection="column">
              <Input id="name" name="name" label="Name" value={formData.name} onChange={handleChange} required />
              <Input id="email" name="email" label="Email" type="email" value={formData.email} onChange={handleChange} required />
            </Flex>

            <Flex gap="20" mobileDirection="column">
              <Input id="phone" name="phone" label="Phone" value={formData.phone} onChange={handleChange} required />
              <Input id="subject" name="subject" label="Subject" value={formData.subject} onChange={handleChange} required />
            </Flex>

            <Textarea
              id="message"
              name="message"
              label="How can we help?"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about your inquiry..."
            />

            {successMessage && (
              <Flex background="brand-alpha-weak" padding="16" radius="m" border="brand-alpha-medium">
                <Text variant="body-default-s" color="green-strong">✓ {successMessage}</Text>
              </Flex>
            )}

            {errorMessage && (
              <Flex background="neutral-alpha-weak" padding="16" radius="m" border="neutral-alpha-medium">
                <Text variant="body-default-s" color="red-strong">⚠ {errorMessage}</Text>
              </Flex>
            )}

            <Button
                fillWidth
                size="l"
                type="submit"
                loading={loading}
                style={{
                    background: "linear-gradient(135deg, #06c8e8 0%, #2563eb 100%)",
                    color: '#04121a',
                    WebkitTextFillColor: '#04121a',
                    fontWeight: 800,
                    boxShadow: "0 10px 28px -5px rgba(6, 200, 232, 0.35)",
                }}
            >
              Send Message
            </Button>
          </Column>
        </form>
      </Column>
    </Flex>
  );
}
