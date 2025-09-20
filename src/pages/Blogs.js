import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Button,
  Stack,
  TextField,
  InputAdornment,
  MenuItem,
  Pagination,
  useTheme,
  useMediaQuery,
  Grid, // use Grid v2 from @mui/material
} from '@mui/material';
import { motion } from 'framer-motion';
import {
  CalendarToday,
  Person,
  ArrowForward,
  Category,
  Search,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import Axios

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:8000",
  timeout: 10000,
});


const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  // Filters
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [author, setAuthor] = useState('');
  const [categories, setCategories] = useState([]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const params = {
        page,
        ...(search && { search }),
        ...(category && { category }),
        ...(author && { author }),
      };

      console.log(`Fetching blogs with params:`, params); // Log the request
      const response = await axiosInstance.get('/blog-posts/', { params }); // Use Axios

      console.log('Fetched blogs:', response.data); // Log the response data
      setBlogs(response.data.results || []);
      setCount(Math.ceil((response.data.count || 0) / 10)); // assuming page size = 10
    } catch (err) {
      console.error('Error fetching blogs:', err); // Log the error
      setError(err.response?.data?.detail || 'Failed to fetch blogs');
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories separately if needed
  const fetchCategories = async () => {
    try {
      console.log('Fetching blog categories...'); // Log the request
      const response = await axiosInstance.get('/blog-categories/'); // Use Axios

      console.log('Fetched categories:', response.data); // Log the response data
      if (Array.isArray(response.data)) {
        setCategories(response.data.filter((category) => category)); // Filter out empty/null categories
      } else {
        throw new Error('Invalid data format: Expected an array of categories');
      }
    } catch (err) {
      console.error('Error fetching categories:', err); // Log the error
      setError(err.response?.data?.detail || 'Failed to fetch categories');
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [page, search, category, author]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  const truncateText = (text, maxLength) =>
    text.length <= maxLength ? text : text.substr(0, maxLength) + '...';

  if (loading) {
    return (
      <Box
        sx={{
          py: 8,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h6">Loading blogs...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          py: 8,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h6" color="error">
          Error: {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 8, minHeight: '100vh' }}>
      <Container maxWidth="lg">
        {/* Header */}
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
            Our Blogs
          </Typography>
          <Typography
            variant="h6"
            align="center"
            sx={{
              mb: 6,
              color: 'text.secondary',
              maxWidth: 600,
              mx: 'auto',
              lineHeight: 1.6,
            }}
          >
            Insights, tips, and news from the world of technology and digital
            innovation.
          </Typography>
        </motion.div>

        {/* Filters */}
        <Stack
          spacing={2}
          direction={isMobile ? 'column' : 'row'}
          sx={{ mb: 6 }}
        >
          <TextField
            placeholder="Search blogs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            select
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            fullWidth
          >
            <MenuItem value="">All Categories</MenuItem>
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            fullWidth
          />
        </Stack>

        {/* Blog Grid */}
        <Grid container spacing={4}>
          {blogs.map((blog, index) => (
            <Grid item xs={12} md={6} key={blog.id}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
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
                  <CardMedia
                    component="img"
                    height="240"
                    image={blog.featured_image || 'https://via.placeholder.com/600x400'}
                    alt={blog.title}
                    sx={{
                      objectFit: 'cover',
                      borderTopLeftRadius: 3,
                      borderTopRightRadius: 3,
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    {blog.category && (
                      <Chip
                        icon={<Category sx={{ fontSize: 16 }} />}
                        label={blog.category}
                        size="small"
                        sx={{
                          mb: 2,
                          background:
                            'linear-gradient(45deg, #3b82f6 0%, #2563eb 100%)',
                          color: 'white',
                          fontWeight: 500,
                        }}
                      />
                    )}
                    <Typography
                      variant="h5"
                      component="h3"
                      sx={{
                        fontWeight: 600,
                        mb: 2,
                        color: 'text.primary',
                        minHeight: '64px',
                      }}
                    >
                      {blog.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        mb: 3,
                        lineHeight: 1.6,
                        color: 'text.secondary',
                        minHeight: '72px',
                      }}
                    >
                      {truncateText(blog.excerpt || blog.content, 120)}
                    </Typography>
                    <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <CalendarToday
                          sx={{
                            fontSize: 16,
                            mr: 0.5,
                            color: 'text.secondary',
                          }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          {formatDate(blog.published_date || blog.created_at)}
                        </Typography>
                      </Box>
                      {blog.author && (
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Person
                            sx={{
                              fontSize: 16,
                              mr: 0.5,
                              color: 'text.secondary',
                            }}
                          />
                          <Typography variant="body2" color="text.secondary">
                            {blog.author_name || blog.author}
                          </Typography>
                        </Box>
                      )}
                    </Stack>
                    <Button
                      component={Link}
                      to={`/blog/${blog.slug || blog.id}`}
                      variant="contained"
                      endIcon={<ArrowForward />}
                      sx={{
                        background:
                          'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
                        '&:hover': {
                          background:
                            'linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)',
                        },
                      }}
                    >
                      Read More
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Empty State */}
        {blogs.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              No blog posts found.
            </Typography>
          </Box>
        )}

        {/* Pagination */}
        {count > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
            <Pagination
              count={count}
              page={page}
              onChange={(e, value) => setPage(value)}
              color="primary"
              size={isMobile ? 'small' : 'medium'}
            />
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Blogs;
