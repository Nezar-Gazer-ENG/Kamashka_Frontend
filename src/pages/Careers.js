import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Divider,
  Stack,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { motion } from 'framer-motion';
import {
  LocationOn,
  Business,
  Schedule,
  AttachMoney,
  ArrowForward,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import axios from 'axios';

// axios instance (same pattern as Blogs)
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:8000",
  timeout: 10000,
});

const Careers = () => {
  const [jobPostings, setJobPostings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const fetchJobPostings = async () => {
      setLoading(true);
      setError('');
      try {
        console.log('Fetching job postings...');
        const response = await axiosInstance.get('/job-postings/');
        console.log('Raw response for job postings:', response.data);

        // Handle paginated or non-paginated responses
        let jobs = [];
        if (Array.isArray(response.data)) {
          // direct array
          jobs = response.data;
        } else if (Array.isArray(response.data.results)) {
          // DRF pagination object
          jobs = response.data.results;
        } else {
          // unknown shape — attempt to be resilient
          console.warn('Unexpected job-postings response shape:', response.data);
          // Try extracting an array-like property, otherwise error
          if (response.data && typeof response.data === 'object') {
            // naive fallback: try to find first array property
            const firstArray = Object.values(response.data).find(v => Array.isArray(v));
            if (firstArray) jobs = firstArray;
          }
        }

        // Validate jobs is an array
        if (!Array.isArray(jobs)) {
          throw new Error('Invalid data format: Expected an array of job postings');
        }

        // Defensive defaults for fields
        const safeJobs = jobs.map((j) => ({
          id: j.id,
          title: j.title || 'Untitled',
          department: j.department || '',
          location: j.location || '',
          employment_type: j.employment_type || '',
          salary_range: j.salary_range || '',
          description: j.description || '',
          ...j,
        }));

        setJobPostings(safeJobs);
        console.log('Parsed job postings:', safeJobs);
      } catch (err) {
        console.error('Error fetching job postings:', err);
        // Prefer backend message if present
        const message =
          err.response?.data?.detail ||
          err.response?.data?.error ||
          err.message ||
          'Failed to fetch job postings';
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobPostings();
  }, []);

  const getEmploymentTypeColor = (type) => {
    switch (type) {
      case 'full_time': return 'success';
      case 'part_time': return 'info';
      case 'contract': return 'warning';
      case 'internship': return 'secondary';
      default: return 'default';
    }
  };

  const getEmploymentTypeText = (type) => {
    switch (type) {
      case 'full_time': return 'Full Time';
      case 'part_time': return 'Part Time';
      case 'contract': return 'Contract';
      case 'internship': return 'Internship';
      default: return type || '—';
    }
  };

  if (loading) {
    console.log('Loading job postings...');
    return (
      <Box sx={{ py: 8, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h6">Loading career opportunities...</Typography>
      </Box>
    );
  }

  if (error) {
    console.error('Error state:', error);
    return (
      <Box sx={{ py: 8, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h6" color="error">Error: {error}</Typography>
      </Box>
    );
  }

  // Ensure jobPostings is an array before mapping
  const validJobPostings = Array.isArray(jobPostings) ? jobPostings : [];
  console.log('Valid job postings:', validJobPostings);

  return (
    <Box sx={{ py: 8, minHeight: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}>
      <Container maxWidth="lg">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography
            variant="h2"
            align="center"
            sx={{
              fontWeight: 700,
              mb: 2,
              background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Join Our Team
          </Typography>
          <Typography
            variant="h6"
            align="center"
            sx={{
              mb: 8,
              color: 'text.secondary',
              maxWidth: 600,
              mx: 'auto',
              lineHeight: 1.6,
            }}
          >
            Be part of our innovative team and work on cutting-edge projects 
            that make a real impact in the digital world.
          </Typography>
        </motion.div>

        {/* Job Postings Grid */}
        <Grid container spacing={4}>
          {validJobPostings.map((job, index) => (
            <Grid item xs={12} key={job.id}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Card
                  sx={{
                    background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 3,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08)',
                    },
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Grid container spacing={3} alignItems="center">
                      <Grid item xs={12} md={8}>
                        {/* Job Title */}
                        <Typography
                          variant="h4"
                          component="h3"
                          sx={{
                            fontWeight: 600,
                            mb: 2,
                            color: 'text.primary',
                          }}
                        >
                          {job.title}
                        </Typography>

                        {/* Job Details */}
                        <Box sx={{ mb: 3 }}>
                          <Stack direction={isMobile ? 'column' : 'row'} spacing={2} sx={{ mb: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Business sx={{ fontSize: 20, mr: 1, color: 'text.secondary' }} />
                              <Typography variant="body1" color="text.secondary">
                                {job.department}
                              </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <LocationOn sx={{ fontSize: 20, mr: 1, color: 'text.secondary' }} />
                              <Typography variant="body1" color="text.secondary">
                                {job.location}
                              </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Schedule sx={{ fontSize: 20, mr: 1, color: 'text.secondary' }} />
                              <Typography variant="body1" color="text.secondary">
                                {getEmploymentTypeText(job.employment_type)}
                              </Typography>
                            </Box>
                          </Stack>

                          {job.salary_range && (
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <AttachMoney sx={{ fontSize: 20, mr: 1, color: 'text.secondary' }} />
                              <Typography variant="body1" color="text.secondary">
                                {job.salary_range}
                              </Typography>
                            </Box>
                          )}
                        </Box>

                        {/* Employment Type Chip */}
                        <Chip
                          label={getEmploymentTypeText(job.employment_type)}
                          color={getEmploymentTypeColor(job.employment_type)}
                          sx={{ mb: 3 }}
                        />

                        {/* Short Description */}
                        <Typography
                          variant="body1"
                          sx={{
                            mb: 3,
                            lineHeight: 1.6,
                            color: 'text.secondary',
                          }}
                        >
                          {job.description.length > 150 
                            ? `${job.description.substring(0, 150)}...`
                            : job.description
                          }
                        </Typography>
                      </Grid>

                      <Grid item xs={12} md={4}>
                        <Box sx={{ textAlign: { xs: 'left', md: 'right' } }}>
                          <Button
                            component={Link}
                            to={`/careers/${job.id}/apply`}
                            variant="contained"
                            size="large"
                            endIcon={<ArrowForward />}
                            sx={{
                              py: 1.5,
                              px: 4,
                              fontSize: '1.1rem',
                              background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
                              '&:hover': {
                                background: 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)',
                              },
                            }}
                          >
                            Apply Now
                          </Button>
                          
                          <Button
                            component={Link}
                            to={`/careers/${job.id}`}
                            variant="outlined"
                            size="large"
                            sx={{
                              py: 1.5,
                              px: 4,
                              fontSize: '1.1rem',
                              mt: 2,
                              ml: { xs: 0, md: 2 },
                            }}
                          >
                            View Details
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Empty State */}
        {validJobPostings.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Box
              sx={{
                textAlign: 'center',
                p: 8,
                background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 3,
                mt: 4,
              }}
            >
              <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 }}>
                No Current Openings
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
                We don't have any open positions at the moment, but check back soon!
                We're always looking for talented individuals to join our team.
              </Typography>
              <Button
                variant="outlined"
                size="large"
                onClick={() => window.location.reload()}
              >
                Check Again
              </Button>
            </Box>
          </motion.div>
        )}

        {/* Company Culture Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Box
            sx={{
              textAlign: 'center',
              p: 6,
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 3,
              mt: 8,
            }}
          >
            <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 }}>
              Why Join Kamashka?
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
              We offer competitive salaries, flexible working arrangements, and opportunities 
              for professional growth in a supportive and innovative environment.
            </Typography>
            
            <Grid container spacing={3} sx={{ mt: 2 }}>
              <Grid item xs={12} md={4}>
                <Typography variant="h6" color="primary" sx={{ mb: 1 }}>
                  🚀 Growth Opportunities
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Continuous learning and career advancement
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="h6" color="primary" sx={{ mb: 1 }}>
                  💡 Innovative Projects
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Work on cutting-edge technology solutions
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="h6" color="primary" sx={{ mb: 1 }}>
                  🤝 Collaborative Culture
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Supportive team environment
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Careers;
