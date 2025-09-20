import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  TextField,
  Button,
  Chip,
  Alert,
  CircularProgress,
} from '@mui/material';
import { motion } from 'framer-motion';
import {
  LocationOn,
  Phone,
  Email,
  Schedule,
  Send,
} from '@mui/icons-material';
// JobApplication.js
const API_BASE = 
  process.env.REACT_APP_API_BASE || "http://127.0.0.1:8000";


const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [submitError, setSubmitError] = useState('');
  const [errors, setErrors] = useState({});
  const [csrfToken, setCsrfToken] = useState('');

  // 🔑 Fetch CSRF token
  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await fetch(`${API_BASE}/csrf-token/`, {
          credentials: "include",
          headers: { "Accept": "application/json" }
        });

        if (!response.ok) throw new Error(`Failed: ${response.status}`);

        const data = await response.json();
        setCsrfToken(data.csrfToken);
      } catch (error) {
        console.error("CSRF fetch failed:", error);
        setCsrfToken("no-csrf-found");
      }
    };

    fetchCsrfToken();
  }, []);

  // 🔑 Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // 🔑 Validate
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 🔑 Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (!csrfToken || csrfToken === "no-csrf-found") {
      setSubmitStatus("error");
      setSubmitError("Security issue: Please refresh the page and try again.");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    setSubmitError('');

    try {
      const response = await fetch(`${API_BASE}/contact/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || `Server error: ${response.status}`);

      if (data.success) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setSubmitStatus("error");
        setSubmitError(data.error || "There was a problem sending your message.");
      }
    } catch (error) {
      setSubmitStatus("error");
      setSubmitError(error.message || "There was a problem sending your message. Please try again later.");
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ✅ Keep your design 100% the same from here
  const contactInfo = [
    {
      icon: <LocationOn sx={{ fontSize: 40 }} />,
      title: 'Address',
      details: '123 Tech Street, 6th October City, Egypt',
    },
    {
      icon: <Phone sx={{ fontSize: 40 }} />,
      title: 'Phone',
      details: '+20 100 774 5941',
    },
    {
      icon: <Email sx={{ fontSize: 40 }} />,
      title: 'Email',
      details: 'info@kamshka.com',
    },
    {
      icon: <Schedule sx={{ fontSize: 40 }} />,
      title: 'Business Hours',
      details: 'Sunday - Thursday: 9AM - 5PM\nFriday - Saturday: Closed',
    },
  ];

  const isButtonDisabled = isSubmitting || !csrfToken || csrfToken === 'no-csrf-found';

  return (
    <Box sx={{ pt: { xs: 8, md: 12 }, pb: 8, minHeight: '100vh' }}>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Grid container spacing={6} alignItems="center" sx={{ mb: 8 }}>
          <Grid item xs={12}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Chip
                label="Contact Us"
                color="primary"
                sx={{ mb: 3, px: 2, py: 1, fontSize: '1rem', fontWeight: 600 }}
              />
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 700,
                  mb: 3,
                  background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Get In Touch With Us
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  mb: 4,
                  color: 'text.secondary',
                  lineHeight: 1.6,
                  fontWeight: 400,
                  maxWidth: '800px',
                }}
              >
                Have a question or want to discuss a project? We'd love to hear from you. 
                Send us a message and we'll respond as soon as possible.
              </Typography>
            </motion.div>
          </Grid>
        </Grid>

        {/* Contact Form */}
        <Box sx={{ mb: 12 }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card sx={{ p: 5, borderRadius: 3, mb: 6, border: '1px solid', borderColor: 'divider' }}>
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 1, textAlign: 'center' }}>
                Send Us a Message
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4, textAlign: 'center' }}>
                Fill out the form below and we'll get back to you as soon as possible
              </Typography>

              {submitStatus === 'success' && (
                <Alert severity="success" sx={{ mb: 3 }}>
                  Your message has been sent successfully! We will get back to you soon.
                </Alert>
              )}
              {submitStatus === 'error' && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {submitError || 'There was a problem sending your message. Please try again later.'}
                </Alert>
              )}

              <form onSubmit={handleSubmit}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <TextField label="Full Name" name="name" value={formData.name}
                    onChange={handleChange} error={!!errors.name} helperText={errors.name}
                    disabled={isSubmitting} fullWidth />
                  <TextField label="Email Address" name="email" type="email" value={formData.email}
                    onChange={handleChange} error={!!errors.email} helperText={errors.email}
                    disabled={isSubmitting} fullWidth />
                  <TextField label="Subject" name="subject" value={formData.subject}
                    onChange={handleChange} error={!!errors.subject} helperText={errors.subject}
                    disabled={isSubmitting} fullWidth />
                  <TextField label="Message" name="message" value={formData.message}
                    onChange={handleChange} error={!!errors.message} helperText={errors.message}
                    disabled={isSubmitting} fullWidth multiline rows={5} />

                  <Box sx={{ textAlign: 'center', mt: 2 }}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      disabled={isButtonDisabled}
                      startIcon={isSubmitting ? <CircularProgress size={20} /> : <Send />}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                    {csrfToken === 'no-csrf-found' && (
                      <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                        Security configuration issue. Please refresh the page.
                      </Typography>
                    )}
                  </Box>
                </Box>
              </form>
            </Card>
          </motion.div>
        </Box>

        {/* Contact Information & Map Section */}
        <Grid container spacing={6}>
          {/* Contact Information */}
          <Grid item xs={12} md={5}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 4 }}>
                Contact Information
              </Typography>
              
              <Box sx={{ mb: 4 }}>
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Box sx={{ display: 'flex', mb: 3 }}>
                      <Box sx={{ color: 'primary.main', mr: 2 }}>
                        {item.icon}
                      </Box>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                          {item.title}
                        </Typography>
                        <Typography 
                          variant="body1" 
                          color="text.secondary"
                          sx={{ whiteSpace: 'pre-line' }}
                        >
                          {item.details}
                        </Typography>
                      </Box>
                    </Box>
                  </motion.div>
                ))}
              </Box>
            </motion.div>
          </Grid>

          {/* Interactive Map */}
          <Grid item xs={12} md={7}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
                Our Location
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Visit us at our office in 6th October City, Egypt
              </Typography>
              
              <Card
                sx={{
                  height: 400,
                  borderRadius: 3,
                  overflow: 'hidden',
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7283941.742899037!2d29.56882434999999!3d26.858953600000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1436890d24a8261b%3A0x1f2b74b3f2b8f3b2!2s6th%20of%20October%20City%2C%20Giza%20Governorate%2C%20Egypt!5e0!3m2!1sen!2sus!4v1665677183863!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Kamashka Office Location in 6th October City, Egypt"
                ></iframe>
              </Card>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Contact;
