import React from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
  Chip,
  Stack,
} from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  RocketLaunch, 
  TrendingUp,
  Shield,
  DesignServices,
  ArrowRight,
  CheckCircle,
  Star,
  Groups,
  Speed 
} from '@mui/icons-material';

const Home = () => {
  const features = [
    {
      icon: <RocketLaunch sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Innovation Driven',
      description: 'Cutting-edge solutions that push boundaries and deliver exceptional results.',
    },
    {
      icon: <TrendingUp sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Growth Focused',
      description: 'Strategies and solutions designed to drive your business growth.',
    },
    {
      icon: <Shield sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Enterprise Grade',
      description: 'Robust, secure, and scalable solutions for businesses of all sizes.',
    },
    {
      icon: <DesignServices sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Friendly Design',
      description: 'Quality and easy to navigate design and enhance experiences.',
    },
  ];

  const stats = [
    { icon: <Groups />, label: 'Happy Clients', value: '200+' },
    { icon: <CheckCircle />, label: 'Projects Completed', value: '500+' },
    { icon: <Star />, label: '5-Star Reviews', value: '98%' },
    { icon: <Speed />, label: 'Faster Delivery', value: '40%' },
  ];

  return (
    <Box>
      {/* Hero Section - Enhanced with more content */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Animated background elements */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `
              radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)
            `,
          }}
        />
        
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {/* Trust Badge */}
                <Chip
                  icon={<Star sx={{ color: '#FFD700' }} />}
                  label="Trusted by 200+ Companies Worldwide"
                  sx={{
                    mb: 3,
                    background: 'rgba(255, 255, 255, 0.15)',
                    color: 'white',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                  }}
                />

                <Typography
                  variant="h1"
                  component="h1"
                  sx={{
                    fontWeight: 700,
                    mb: 3,
                    background: 'linear-gradient(45deg, #fff 30%, #f0f0f0 90%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    pt: 8,
                  }}
                >
                  Transforming Ideas Into Digital Excellence
                </Typography>
                
                <Typography
                  variant="h5"
                  sx={{
                    mb: 4,
                    opacity: 0.9,
                    fontWeight: 300,
                    lineHeight: 1.6,
                  }}
                >
                  We create stunning digital experiences that drive results and 
                  elevate your brand to new heights. Let us help you transform your 
                  vision into reality with our expert team and cutting-edge technology.
                </Typography>

                {/* Key Benefits List */}
                <Stack spacing={1} sx={{ mb: 4 }}>
                  {[
                    'Custom tailored solutions for your business',
                    '24/7 expert support and maintenance',
                    'Proven track record of success',
                    'Cutting-edge technology stack'
                  ].map((item, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                      <CheckCircle sx={{ mr: 1, color: '#4ADE80', fontSize: 20 }} />
                      <Typography variant="body1" sx={{ opacity: 0.9 }}>
                        {item}
                      </Typography>
                    </Box>
                  ))}
                </Stack>

                {/* CTA Buttons */}
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      component={Link}
                      to="/contact"
                      variant="contained"
                      size="large"
                      endIcon={<ArrowRight />}
                      sx={{
                        px: 4,
                        py: 1.5,
                        fontSize: '1.1rem',
                        background: 'linear-gradient(45deg, #ff6b6b 0%, #ee5a52 100%)',
                        '&:hover': {
                          background: 'linear-gradient(45deg, #ee5a52 0%, #ff6b6b 100%)',
                        },
                      }}
                    >
                      Start Your Journey
                    </Button>
                  </motion.div>
                  
                  <Button
                    component={Link}
                    to="/about"
                    variant="outlined"
                    size="large"
                    sx={{
                      px: 4,
                      py: 1.5,
                      fontSize: '1.1rem',
                      borderColor: 'rgba(255, 255, 255, 0.3)',
                      color: 'white',
                      '&:hover': {
                        borderColor: 'white',
                        background: 'rgba(255, 255, 255, 0.1)',
                      },
                    }}
                  >
                    Learn More
                  </Button>
                </Box>
              </motion.div>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Box
                  sx={{
                    height: 400,
                    background: 'linear-gradient(135deg, rgba(102,126,234,0.1) 0%, rgba(118,75,162,0.1) 100%)',
                    borderRadius: 4,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    border: '1px solid rgba(255,255,255,0.15)',
                  }}
                >
                  {/* Circuit board lines */}
                  {[...Array(5)].map((_, i) => (
                    <Box
                      key={i}
                      sx={{
                        position: 'absolute',
                        width: '80%',
                        height: 2,
                        background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)`,
                        top: `${20 + i * 15}%`,
                        left: '10%',
                      }}
                    />
                  ))}
                  
                  {/* Floating nodes */}
                  {[...Array(8)].map((_, i) => (
                    <Box
                      key={i}
                      sx={{
                        position: 'absolute',
                        width: 12,
                        height: 12,
                        background: 'rgba(255,255,255,0.6)',
                        borderRadius: '50%',
                        top: `${15 + (i * 10) % 70}%`,
                        left: `${10 + (i * 12) % 80}%`,
                        animation: 'pulse 2s infinite',
                        animationDelay: `${i * 0.3}s`,
                        '@keyframes pulse': {
                          '0%, 100%': { transform: 'scale(1)', opacity: 0.6 },
                          '50%': { transform: 'scale(1.2)', opacity: 1 },
                        }
                      }}
                    />
                  ))}
                  
                  <Box sx={{ textAlign: 'center', zIndex: 1 }}>
                    <Typography variant="h4" sx={{ opacity: 0.9, fontWeight: 600, mb: 1 }}>
                      Tech Excellence
                    </Typography>
                    <Typography variant="body1" sx={{ opacity: 0.8 }}>
                      Top of the line digital solutions
                    </Typography>
                  </Box>
                </Box>

                {/* Stats Row */}
                <Grid container spacing={2} sx={{ mt: 3 }}>
                  {stats.map((stat, index) => (
                    <Grid item xs={6} key={index}>
                      <Box sx={{ 
                        textAlign: 'center', 
                        p: 2, 
                        background: 'rgba(255, 255, 255, 0.05)', 
                        borderRadius: 2,
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                      }}>
                        <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
                          {stat.value}
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.8 }}>
                          {stat.label}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section - Fixed Card Heights */}
      <Container maxWidth="lg" sx={{ py: 15 }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Typography
            variant="h2"
            align="center"
            sx={{ mb: 2, fontWeight: 700 }}
          >
            Why Choose Kamashka
          </Typography>
          <Typography
            variant="h6"
            align="center"
            sx={{ mb: 8, color: 'text.secondary', maxWidth: 600, mx: 'auto' }}
          >
            We combine cutting-edge technology with innovative design to deliver 
            exceptional digital experiences.
          </Typography>

          {/* Fixed: Equal height cards using CSS Grid */}
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { 
              xs: '1fr', 
              sm: 'repeat(2, 1fr)', 
              md: 'repeat(4, 1fr)' 
            },
            gap: 3,
            alignItems: 'stretch', // This makes all items stretch to same height
          }}>
            {features.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
                style={{ height: '100%' }} // Ensure motion div takes full height
              >
                <Card
                  sx={{
                    height: '100%', // Card takes full height of grid cell
                    display: 'flex',
                    flexDirection: 'column',
                    background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
                    border: 'none',
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.12)',
                      transform: 'translateY(-5px)',
                    },
                  }}
                >
                  <CardContent 
                    sx={{ 
                      p: 4, 
                      textAlign: 'center', 
                      flex: '1 0 auto',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>
                      {feature.icon}
                    </Box>
                    <Typography 
                      variant="h6" 
                      component="h3" 
                      sx={{ 
                        mb: 2, 
                        fontWeight: 600,
                        minHeight: '64px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary" 
                      sx={{ 
                        lineHeight: 1.6,
                        flex: '1 0 auto',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Home;