import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Divider,
  Chip,
  Stack,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { motion } from 'framer-motion';
import {
  Code,
  DesignServices,
  Language,
  Storage,
  Devices,
} from '@mui/icons-material';

// Sample portfolio data - replace with your actual projects
const portfolioData = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce solution with real-time inventory management, payment processing, and customer analytics. Built with React, Node.js, and MongoDB.',
    image: '/api/placeholder/600/400', // Replace with your actual image path
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    category: 'Web Development',
  },
  {
    id: 2,
    title: 'Mobile Banking App',
    description: 'A secure mobile banking application with biometric authentication, transaction history, and budget tracking features. Developed for both iOS and Android platforms.',
    image: '/api/placeholder/600/400', // Replace with your actual image path
    technologies: ['React Native', 'Firebase', 'Redux', 'TypeScript'],
    category: 'Mobile Development',
  },
  {
    id: 3,
    title: 'Corporate Website Redesign',
    description: 'Complete redesign of a corporate website with improved UX/UI, performance optimization, and SEO enhancements. Increased conversion rates by 45%.',
    image: '/api/placeholder/600/400', // Replace with your actual image path
    technologies: ['Next.js', 'Material-UI', 'GraphQL', 'Framer Motion'],
    category: 'Web Design',
  },
  {
    id: 4,
    title: 'AI-Powered Analytics Dashboard',
    description: 'Real-time analytics dashboard with machine learning predictions, customizable reports, and data visualization tools for business intelligence.',
    image: '/api/placeholder/600/400', // Replace with your actual image path
    technologies: ['Vue.js', 'Python', 'TensorFlow', 'D3.js'],
    category: 'Data Analytics',
  },
];

const Portfolio = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Web Development':
        return <Code />;
      case 'Mobile Development':
        return <Devices />;
      case 'Web Design':
        return <DesignServices />;
      case 'Data Analytics':
        return <Storage />;
      default:
        return <Language />;
    }
  };

  return (
    <Box sx={{ py: 8, minHeight: '100vh' }}>
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
              color: 'primary.main',
            }}
          >
            Our Portfolio
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
            Explore our successful projects and see how we've helped businesses 
            transform their ideas into exceptional digital solutions.
          </Typography>
        </motion.div>

        {/* Portfolio Projects */}
        <Box sx={{ mb: 8 }}>
          {portfolioData.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 3, md: 4 },
                  mb: 6,
                  background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 3,
                  '&:hover': {
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08)',
                  },
                }}
              >
                <Grid container spacing={4} alignItems="center">
                  {/* Image on the left for desktop, top for mobile */}
                  <Grid item xs={12} md={6} order={isMobile ? 1 : 1}>
                    <Box
                      sx={{
                        height: 300,
                        background: `linear-gradient(135deg, ${theme.palette.primary.light}20 0%, ${theme.palette.secondary.light}20 100%)`,
                        borderRadius: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                        position: 'relative',
                      }}
                    >
                      {/* Placeholder for actual image - replace with your image */}
                      <Box
                        component="img"
                        src={project.image}
                        alt={project.title}
                        sx={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.3s ease',
                          '&:hover': {
                            transform: 'scale(1.05)',
                          },
                        }}
                      />
                    </Box>
                  </Grid>

                  {/* Content on the right for desktop, bottom for mobile */}
                  <Grid item xs={12} md={6} order={isMobile ? 2 : 2}>
                    <Box>
                      {/* Category Chip */}
                      <Chip
                        icon={getCategoryIcon(project.category)}
                        label={project.category}
                        size="small"
                        sx={{
                          mb: 2,
                          background: 'linear-gradient(45deg, #3b82f6 0%, #2563eb 100%)',
                          color: 'white',
                          fontWeight: 500,
                        }}
                      />

                      {/* Project Title */}
                      <Typography
                        variant="h4"
                        component="h3"
                        sx={{
                          fontWeight: 600,
                          mb: 2,
                          color: 'text.primary',
                        }}
                      >
                        {project.title}
                      </Typography>

                      {/* Project Description */}
                      <Typography
                        variant="body1"
                        sx={{
                          mb: 3,
                          lineHeight: 1.7,
                          color: 'text.secondary',
                        }}
                      >
                        {project.description}
                      </Typography>

                      {/* Technologies Stack */}
                      <Stack direction="row" spacing={1} sx={{ mb: 3, flexWrap: 'wrap' }}>
                        {project.technologies.map((tech, techIndex) => (
                          <Chip
                            key={techIndex}
                            label={tech}
                            size="small"
                            variant="outlined"
                            sx={{
                              mb: 1,
                              borderColor: 'primary.main',
                              color: 'primary.main',
                            }}
                          />
                        ))}
                      </Stack>
                    </Box>
                  </Grid>
                </Grid>

                {/* Custom Divider - doesn't take full width */}
                {index < portfolioData.length - 1 && (
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      mt: 4,
                    }}
                  >
                    <Divider
                      sx={{
                        width: '60%',
                        height: 2,
                        background: 'linear-gradient(90deg, transparent, #e2e8f0, transparent)',
                        border: 'none',
                      }}
                    />
                  </Box>
                )}
              </Paper>
            </motion.div>
          ))}
        </Box>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <Box
            sx={{
              textAlign: 'center',
              p: 6,
              background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
              borderRadius: 3,
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              Ready to Start Your Project?
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
              Let's discuss how we can bring your ideas to life with our expertise.
            </Typography>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Portfolio;