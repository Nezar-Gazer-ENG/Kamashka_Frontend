import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Card,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
  FormLabel,
  Chip,
} from '@mui/material';
import { motion } from 'framer-motion';
import {
  ArrowBack,
  Description,
  Send,
  LocationOn,
  Business,
  Schedule,
} from '@mui/icons-material';

// JobApplication.js
const API_BASE = 
  process.env.REACT_APP_API_BASE || "http://127.0.0.1:8000";


const JobApplication = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [error, setError] = useState('');
  const [activeStep, setActiveStep] = useState(0);

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    cover_letter: '',
    resume: null,
    nationality: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [csrfToken, setCsrfToken] = useState('');

  // ✅ Fetch CSRF token
  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const res = await fetch(`${API_BASE}/csrf-token/`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error('Failed to fetch CSRF token');

        const data = await res.json();
        setCsrfToken(data.csrfToken);
      } catch (err) {
        console.error('Error fetching CSRF token:', err);
        setError('Failed to load application form. Please refresh the page.');
      }
    };
    fetchCsrfToken();
  }, []);

  // ✅ Fetch job details
  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const res = await fetch(`${API_BASE}/job-postings/${jobId}/`, {
          credentials: "include",
        });
        if (!res.ok) {
          if (res.status === 404) throw new Error('Job not found.');
          throw new Error('Failed to fetch job details');
        }
        const data = await res.json();
        setJob(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchJobDetails();
  }, [jobId]);

  // Input handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, resume: e.target.files[0] }));
  };

  // Validation
  const validateStep = (step) => {
    const newErrors = {};
    if (step === 0) {
      if (!formData.full_name.trim()) newErrors.full_name = 'Full name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
      if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
      if (!formData.nationality.trim()) newErrors.nationality = 'Nationality is required';
    }
    if (step === 1 && !formData.resume) {
      newErrors.resume = 'Resume is required';
    }
    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Stepper navigation
  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prev) => prev + 1);
    }
  };
  const handleBack = () => setActiveStep((prev) => prev - 1);

  // ✅ Submit application
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(activeStep)) return;
    if (!csrfToken) {
      setError('CSRF token is missing. Please refresh the page.');
      return;
    }

    setSubmitting(true);
    setSubmitStatus(null);
    setError('');

    try {
      const formToSend = new FormData();
      formToSend.append('job_posting', jobId);
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null) {
          formToSend.append(key, formData[key]);
        }
      });

      const response = await fetch(`${API_BASE}/job-applications/`, {
        method: 'POST',
        headers: { 'X-CSRFToken': csrfToken },
        body: formToSend,
        credentials: 'include',
      });

      if (!response.ok) {
        const errData = await response.json();
        const errorMessage = Object.values(errData).flat().join(' ');
        throw new Error(errorMessage || 'Failed to submit application');
      }

      setSubmitStatus('success');
      setTimeout(() => navigate('/careers'), 3000);
    } catch (err) {
      setSubmitStatus('error');
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // UI
  if (loading) {
    return <Box sx={{ py: 8, display: 'flex', justifyContent: 'center' }}><CircularProgress /></Box>;
  }
  if (error || !job) {
    return (
      <Box sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h5" color="error" gutterBottom>{error || 'Job not found'}</Typography>
        <Button component={Link} to="/careers" variant="contained" startIcon={<ArrowBack />}>
          Back to Careers
        </Button>
      </Box>
    );
  }

  const steps = ['Personal Information', 'Resume Upload', 'Review & Submit'];

  return (
    <Box sx={{ py: 8, background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}>
      <Container maxWidth="md">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Button component={Link} to="/careers" startIcon={<ArrowBack />} sx={{ mb: 3 }}>
            Back to Careers
          </Button>

          <Card sx={{ p: 4, mb: 4 }}>
            <Typography variant="h3" gutterBottom>{job.title}</Typography>
            <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}><Business sx={{ mr: 1 }} /> {job.department}</Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}><LocationOn sx={{ mr: 1 }} /> {job.location}</Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}><Schedule sx={{ mr: 1 }} /> {job.employment_type}</Box>
            </Box>
            {job.salary_range && <Chip label={`Salary: ${job.salary_range}`} color="primary" variant="outlined" />}
          </Card>

          <Card sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom>Application Form</Typography>

            <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
              {steps.map((label) => <Step key={label}><StepLabel>{label}</StepLabel></Step>)}
            </Stepper>

            {submitStatus === 'success' && <Alert severity="success">Application submitted! Redirecting...</Alert>}
            {submitStatus === 'error' && <Alert severity="error">{error || 'Submission failed'}</Alert>}

            <form onSubmit={handleSubmit}>
              {activeStep === 0 && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <TextField label="Full Name" name="full_name" value={formData.full_name}
                    onChange={handleInputChange} error={!!formErrors.full_name} helperText={formErrors.full_name} required />
                  <TextField label="Email" name="email" type="email" value={formData.email}
                    onChange={handleInputChange} error={!!formErrors.email} helperText={formErrors.email} required />
                  <TextField label="Phone" name="phone" value={formData.phone}
                    onChange={handleInputChange} error={!!formErrors.phone} helperText={formErrors.phone} required />
                  <TextField label="Nationality" name="nationality" value={formData.nationality}
                    onChange={handleInputChange} error={!!formErrors.nationality} helperText={formErrors.nationality} required />
                  <TextField label="Cover Letter" name="cover_letter" multiline rows={4}
                    value={formData.cover_letter} onChange={handleInputChange} />
                </Box>
              )}

              {activeStep === 1 && (
                <Box>
                  <FormLabel>Upload Resume *</FormLabel>
                  <Button variant="outlined" component="label" startIcon={<Description />}>
                    Choose File
                    <input type="file" hidden accept=".pdf,.doc,.docx" onChange={handleFileChange} />
                  </Button>
                  {formData.resume && <Typography sx={{ mt: 2 }}>Selected: {formData.resume.name}</Typography>}
                  {formErrors.resume && <Typography color="error">{formErrors.resume}</Typography>}
                </Box>
              )}

              {activeStep === 2 && (
                <Box>
                  <Typography variant="h6" gutterBottom>Review & Submit</Typography>
                  <Typography>Please review your information before submitting.</Typography>
                </Box>
              )}

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                <Button onClick={handleBack} disabled={activeStep === 0}>Back</Button>
                {activeStep < steps.length - 1 ? (
                  <Button onClick={handleNext} variant="contained">Next</Button>
                ) : (
                  <Button type="submit" variant="contained" disabled={submitting}
                    startIcon={submitting ? <CircularProgress size={20} /> : <Send />}>
                    {submitting ? 'Submitting...' : 'Submit'}
                  </Button>
                )}
              </Box>
            </form>
          </Card>
        </motion.div>
      </Container>
    </Box>
  );
};

export default JobApplication;
