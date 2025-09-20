import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Chip,
  Stack,
  Divider,
  Button,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { motion } from 'framer-motion';
import {
  CalendarToday,
  Person,
  Category,
  ArrowBack,
  Share,
} from '@mui/icons-material';
import axios from 'axios';

// Reuse axiosInstance like Blogs.js
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:8000",
  timeout: 10000,
});

const ViewBlog = () => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { slug } = useParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axiosInstance.get(`/blog-posts/${slug}/`);
        setBlog(response.data);
      } catch (err) {
        console.error('Error fetching blog:', err);
        setError(err.response?.data?.detail || 'Blog post not found');
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        text: blog.excerpt,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <Box sx={{ py: 8, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h6">Loading blog post...</Typography>
      </Box>
    );
  }

  if (error || !blog) {
    return (
      <Box sx={{ py: 8, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h4" color="error" sx={{ mb: 2 }}>
            {error || 'Blog post not found'}
          </Typography>
          <Button
            component={Link}
            to="/blog"
            variant="contained"
            startIcon={<ArrowBack />}
            sx={{
              background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
            }}
          >
            Back to Blogs
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 8, minHeight: '100vh' }}>
      <Container maxWidth="lg">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button
            component={Link}
            to="/blog"
            variant="outlined"
            startIcon={<ArrowBack />}
            sx={{ mb: 4 }}
          >
            Back to Blogs
          </Button>
        </motion.div>

        {/* Blog Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {blog.category && (
            <Chip
              icon={<Category sx={{ fontSize: 16 }} />}
              label={blog.category}
              size="small"
              sx={{
                mb: 3,
                background: 'linear-gradient(45deg, #3b82f6 0%, #2563eb 100%)',
                color: 'white',
                fontWeight: 500,
              }}
            />
          )}

          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              mb: 3,
              color: 'text.primary',
            }}
          >
            {blog.title}
          </Typography>

          <Stack direction={isMobile ? 'column' : 'row'} spacing={isMobile ? 1 : 4} sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CalendarToday sx={{ fontSize: 18, mr: 1, color: 'text.secondary' }} />
              <Typography variant="body1" color="text.secondary">
                {formatDate(blog.published_date || blog.created_at)}
              </Typography>
            </Box>
            {blog.author && (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Person sx={{ fontSize: 18, mr: 1, color: 'text.secondary' }} />
                <Typography variant="body1" color="text.secondary">
                  By {blog.author}
                </Typography>
              </Box>
            )}
            <Button
              variant="outlined"
              startIcon={<Share />}
              onClick={handleShare}
              size="small"
            >
              Share
            </Button>
          </Stack>

          {blog.featured_image && (
            <Box
              sx={{
                mb: 4,
                borderRadius: 3,
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
              }}
            >
              <img
                src={blog.featured_image}
                alt={blog.title}
                style={{
                  width: '100%',
                  height: '400px',
                  objectFit: 'cover',
                }}
              />
            </Box>
          )}
        </motion.div>

        {/* Blog Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <Box
            sx={{
              '& h2': {
                fontSize: '2rem',
                fontWeight: 600,
                mb: 2,
                mt: 4,
                color: 'text.primary',
              },
              '& h3': {
                fontSize: '1.5rem',
                fontWeight: 600,
                mb: 2,
                mt: 3,
                color: 'text.primary',
              },
              '& p': {
                fontSize: '1.1rem',
                lineHeight: 1.8,
                mb: 3,
                color: 'text.secondary',
              },
              '& ul, & ol': {
                mb: 3,
                pl: 3,
              },
              '& li': {
                mb: 1,
                fontSize: '1.1rem',
                lineHeight: 1.6,
                color: 'text.secondary',
              },
              '& blockquote': {
                borderLeft: '4px solid',
                borderColor: 'primary.main',
                pl: 3,
                py: 1,
                mb: 3,
                fontStyle: 'italic',
                backgroundColor: 'grey.50',
                borderRadius: 1,
              },
            }}
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </motion.div>

        <Divider sx={{ my: 6 }} />

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Box
            sx={{
              textAlign: 'center',
              p: 4,
              background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
              borderRadius: 3,
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              Enjoyed this article?
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
              Share it with others or explore more insights from our blog.
            </Typography>
            <Stack direction={isMobile ? 'column' : 'row'} spacing={2} justifyContent="center">
              <Button
                variant="contained"
                startIcon={<Share />}
                onClick={handleShare}
                sx={{
                  background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
                }}
              >
                Share Article
              </Button>
              <Button
                component={Link}
                to="/blog"
                variant="outlined"
              >
                View All Blogs
              </Button>
            </Stack>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default ViewBlog;
