import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  Chip,
  Paper,
  Avatar,
} from '@mui/material';
import { motion } from 'framer-motion';
import {
  RocketLaunch,
  Shield,
  Diversity3,
} from '@mui/icons-material';

const About = () => {
  // Team members data
  const teamMembers = [
    {
      name: 'Nezar Gazer',
      role: 'CEO & Founder',
      expertise: 'Software engineering',
      years: '3+ years',
      avatar: '/api/placeholder/100/100',
    },
    {
      name: 'Neveen Saeed',
      role: 'Co-Founder',
      expertise: 'Market Analysis',
      years: '2+ years',
      avatar: '/api/placeholder/100/100',
    },
    {
      name: 'Nasser Gazer',
      role: 'Finance manager',
      expertise: 'Financial analysis',
      years: '8+ years',
      avatar: '/api/placeholder/100/100',
    },
  ];

  // Values data
  const values = [
    {
      icon: <RocketLaunch sx={{ fontSize: 40 }} />,
      title: 'Innovation',
      description: 'We constantly push boundaries and explore new technologies to deliver cutting-edge solutions.',
    },
    {
      icon: <Diversity3 sx={{ fontSize: 40 }} />,
      title: 'Collaboration',
      description: 'We believe in the power of teamwork and open communication to achieve extraordinary results.',
    },
    {
      icon: <Shield sx={{ fontSize: 40 }} />,
      title: 'Integrity',
      description: 'We maintain the highest ethical standards and build relationships based on trust and transparency.',
    },
  ];

  // Stats data
  const stats = [
    { number: '200+', label: 'Happy Clients' },
    { number: '500+', label: 'Projects Completed' },
    { number: '98%', label: 'Client Satisfaction' },
    { number: '40+', label: 'Team Members' },
  ];

  return (
    <Box sx={{ pt: { xs: 8, md: 12 }, pb: 8, minHeight: '100vh' }}>
      <Container maxWidth="lg">
        {/* Hero Section with Logo */}
        <Grid container spacing={6} alignItems="center" sx={{ mb: 12 }}>
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Chip
                label="About Kamashka"
                color="primary"
                sx={{
                  mb: 3,
                  px: 2,
                  py: 1,
                  fontSize: '1rem',
                  fontWeight: 600,
                }}
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
                Building the Future, bit by byte!
              </Typography>
              
              <Typography
                variant="h6"
                sx={{
                  mb: 4,
                  color: 'text.secondary',
                  lineHeight: 1.6,
                  fontWeight: 400,
                }}
              >
                At Kamashka, we're passionate about creating digital experiences that 
                not only look stunning but also drive real business results. Our team 
                of experts combines technical excellence with creative vision to 
                transform your ideas into reality.
              </Typography>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Logo Display Area */}
              <Paper
                elevation={0}
                sx={{
                  p: 6,
                  textAlign: 'center',
                  background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                  borderRadius: 4,
                  border: '2px dashed',
                  borderColor: 'primary.light',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Actual Logo from public directory */}
                <Box
                  component="img"
                  src="/logo.png" // Path to your logo in public directory
                  alt="Kamashka Logo"
                  sx={{
                    width: 200,
                    height: 200,
                    mx: 'auto',
                    mb: 3,
                    borderRadius: '50%',
                    boxShadow: '0 20px 40px rgba(37, 99, 235, 0.2)',
                    objectFit: 'contain',
                  }}
                />
                
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  Kamashka
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Where technology flows Kamashka goes
                </Typography>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>

        {/* Stats Section */}
        <Box sx={{ mb: 12 }}>
          <Grid container spacing={3}>
            {stats.map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card
                    sx={{
                      textAlign: 'center',
                      p: 3,
                      background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
                      border: '1px solid',
                      borderColor: 'divider',
                    }}
                  >
                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: 700,
                        color: 'primary.main',
                        mb: 1,
                      }}
                    >
                      {stat.number}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {stat.label}
                    </Typography>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Our Story Section */}
        <Box sx={{ mb: 12 }}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <Typography variant="h3" sx={{ fontWeight: 700, mb: 3 }}>
                  Our Story
                </Typography>
                <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8, color: 'text.secondary' }}>
                  Founded in 2015, Kamashka started as a small team of passionate developers 
                  and designers who believed in the power of technology to transform businesses. 
                  Today, we've grown into a full-service digital agency serving clients worldwide.
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.8, color: 'text.secondary' }}>
                  Our journey has been guided by a simple philosophy: deliver exceptional 
                  quality, build lasting relationships, and always stay ahead of the curve. 
                  Every project is an opportunity to innovate and exceed expectations.
                </Typography>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Box
                  sx={{
                    height: 400,
                    background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
                    borderRadius: 4,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '1.5rem',
                    fontWeight: 600,
                  }}
                >
                  Company Timeline Visualization
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Box>

        {/* Our Values Section */}
        <Box sx={{ mb: 12 }}>
          <Typography variant="h3" align="center" sx={{ fontWeight: 700, mb: 2 }}>
            Our Values
          </Typography>
          <Typography variant="h6" align="center" sx={{ mb: 8, color: 'text.secondary', maxWidth: 600, mx: 'auto' }}>
            The principles that guide everything we do
          </Typography>

          <Grid container spacing={4} justifyContent="center">
            {values.map((value, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card
                    sx={{
                      p: 4,
                      height: 300, // Fixed height for ALL cards
                      width: '100%', // Full width of grid cell
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
                      border: '1px solid',
                      borderColor: 'divider',
                    }}
                  >
                    <Box sx={{ color: 'primary.main', mb: 3, flexShrink: 0 }}>
                      {value.icon}
                    </Box>
                    <Typography 
                      variant="h5" 
                      sx={{ 
                        fontWeight: 600, 
                        mb: 2, 
                        flexShrink: 0 
                      }}
                    >
                      {value.title}
                    </Typography>
                    <Typography 
                      variant="body1" 
                      color="text.secondary"
                      sx={{
                        flex: 1, // Takes remaining space
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        lineHeight: 1.6,
                      }}
                    >
                      {value.description}
                    </Typography>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Team Section - Centered and Equal Size */}
        <Box>
          <Typography variant="h3" align="center" sx={{ fontWeight: 700, mb: 2 }}>
            Meet Our Team
          </Typography>
          <Typography variant="h6" align="center" sx={{ mb: 8, color: 'text.secondary', maxWidth: 600, mx: 'auto' }}>
            The brilliant minds behind our success
          </Typography>

          <Grid container spacing={4} justifyContent="center">
            {teamMembers.map((member, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card
                    sx={{
                      p: 3,
                      height: 350, // Fixed height for ALL team cards
                      width: '100%', // Full width of grid cell
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
                      border: '1px solid',
                      borderColor: 'divider',
                    }}
                  >
                    <Avatar
                      src={member.avatar}
                      sx={{
                        width: 100,
                        height: 100,
                        mb: 3,
                        border: '3px solid',
                        borderColor: 'primary.main',
                        flexShrink: 0,
                      }}
                    />
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 600, 
                        mb: 1, 
                        flexShrink: 0 
                      }}
                    >
                      {member.name}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="primary" 
                      sx={{ 
                        mb: 1, 
                        fontWeight: 500, 
                        flexShrink: 0 
                      }}
                    >
                      {member.role}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary" 
                      sx={{ 
                        mb: 2, 
                        flex: 1, // Takes remaining space
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        lineHeight: 1.5,
                      }}
                    >
                      {member.expertise}
                    </Typography>
                    <Chip
                      label={member.years}
                      size="small"
                      color="primary"
                      variant="outlined"
                      sx={{ flexShrink: 0 }}
                    />
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default About;