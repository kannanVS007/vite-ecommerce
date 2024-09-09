import React, { useState } from 'react';
import { Dialog, AppBar, Toolbar, IconButton, Typography, Box, Button, TextField, useMediaQuery } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material/styles';

const Chatbot = ({ onClose }) => {
    const [conversation, setConversation] = useState([
        { sender: 'bot', text: 'Welcome to ClassyShop! How can I assist you today?', options: ['Check Order Status', 'Find a Product', 'What Are Your Return Policies?', 'Contact Support', 'Apply Coupon Code'] },
    ]);
    const [userInput, setUserInput] = useState('');

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check if the screen is small (mobile)

    const handleUserClick = (option) => {
        setConversation((prev) => [...prev, { sender: 'user', text: option }]);
        handleBotResponse(option);
    };

    const handleBotResponse = (userMessage) => {
        let botResponse;
        switch (userMessage) {
            case 'Check Order Status':
                botResponse = { text: 'Please provide your order number.', showInput: true, placeholder: 'Order Number' };
                break;
            case 'Find a Product':
                botResponse = { text: 'Please enter the product name you are looking for.', showInput: true, placeholder: 'Product Name' };
                break;
            case 'What Are Your Return Policies?':
                botResponse = { text: 'You can return any product within 30 days of purchase. For more details, visit our return policy page.' };
                break;
            case 'Contact Support':
                botResponse = { text: 'You can reach our support team via chat, email, or phone. How would you like to proceed?', options: ['Chat', 'Email', 'Phone'] };
                break;
            case 'Apply Coupon Code':
                botResponse = { text: 'Please enter your coupon code.', showInput: true, placeholder: 'Coupon Code' };
                break;
            default:
                botResponse = { text: 'I am not sure how to help with that.' };
        }

        setConversation((prev) => [...prev, { sender: 'bot', ...botResponse }]);
    };

    const handleInputChange = (event) => {
        setUserInput(event.target.value);
    };

    const handleUserInputSubmit = () => {
        setConversation((prev) => [...prev, { sender: 'user', text: userInput }, { sender: 'bot', text: 'Thank you! We are processing your request.' }]);
        setUserInput(''); // Clear the input field after submission
    };

    return (
        <Dialog
            open
            onClose={onClose}
            fullWidth
            maxWidth="sm"
            PaperProps={{
                style: {
                    borderRadius: 10,
                    width: isMobile ? "90%" : "30%",  // Adjust width for mobile view
                    margin: isMobile ? "0 auto" : "60%",
                    height: isMobile ? "90vh" : "70vh",  // Adjust height for mobile view
                },
            }}
        >
            <AppBar position="relative" style={{ backgroundColor: '#672b2b' }}>
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 1, fontSize: isMobile ? '1.2rem' : '1.5rem' }}>
                        𒆜𝔽𝕆ℝ𝔼𝕍𝔼ℝ𒆜
                    </Typography>
                    <IconButton edge="end" color="inherit" onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Box
                display="flex"
                flexDirection="column"
                height={isMobile ? "70vh" : "400px"} 
                padding={isMobile ? 1 : 2}
                style={{ backgroundColor: '#f5f5f5', overflowY: 'auto' }}
            >
                {conversation.map((msg, index) => (
                    <Box key={index} display="flex" flexDirection="column" mb={2}>
                        <Box display="flex" justifyContent={msg.sender === 'user' ? 'flex-end' : 'flex-start'}>
                            <Box
                                bgcolor={msg.sender === 'user' ? '#672b2b' : '#e0e0e0'}
                                color={msg.sender === 'user' ? 'white' : 'black'}
                                p={1}
                                borderRadius={4}
                                maxWidth="80%"
                                fontSize={isMobile ? '0.9rem' : '1rem'}
                            >
                                {msg.text}
                            </Box>
                        </Box>
                        {msg.options && (
                            <Box display="flex" flexDirection="column" mt={1}>
                                {msg.options.map((option, idx) => (
                                    <Button
                                        key={idx}
                                        variant="outlined"
                                        style={{
                                            textTransform: 'none',
                                            margin: '5px 0',
                                            borderColor: '#672b2b',
                                            color: '#672b2b',
                                            fontSize: isMobile ? '0.8rem' : '1rem',
                                        }}
                                        onClick={() => handleUserClick(option)}
                                    >
                                        {option}
                                    </Button>
                                ))}
                            </Box>
                        )}
                        {msg.showInput && (
                            <Box display="flex" flexDirection="column" mt={2}>
                                <TextField
                                    label={msg.placeholder}
                                    value={userInput}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    size="small"
                                    style={{ marginBottom: '10px' }}
                                    InputProps={{
                                        style: { fontSize: isMobile ? '0.8rem' : '1rem' },
                                    }}
                                />
                                <Button
                                    variant="contained"
                                    style={{ backgroundColor: '#672b2b', color: 'white', fontSize: isMobile ? '0.8rem' : '1rem' }}
                                    onClick={handleUserInputSubmit}
                                >
                                    Submit
                                </Button>
                            </Box>
                        )}
                    </Box>
                ))}
            </Box>
        </Dialog>
    );
};

export default Chatbot;
